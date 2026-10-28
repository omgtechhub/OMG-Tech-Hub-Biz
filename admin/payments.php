<?php
// ─────────────────────────────────────────────────────────────────────────────
//  Admin → Payments
//  Read-only view of every checkout attempt recorded in data/orders.json.
//  Money itself is settled by Paystack; this is the operational record.
// ─────────────────────────────────────────────────────────────────────────────

if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_once dirname(__DIR__) . '/includes/paystack.php';

$orders = orders_all();

// ── Filter ───────────────────────────────────────────────────────────────────
$allowedFilters = ['all', 'paid', 'pending', 'failed', 'review'];
$filter = (string) ($_GET['status'] ?? 'all');
if (!in_array($filter, $allowedFilters, true)) $filter = 'all';

$visible = $filter === 'all'
    ? $orders
    : array_values(array_filter($orders, function ($o) use ($filter) {
        $s = $o['status'] ?? '';
        if ($filter === 'failed')  return in_array($s, ['failed', 'init_failed'], true);
        if ($filter === 'pending') return $s === 'pending';
        return $s === $filter;
    }));

// ── Totals ───────────────────────────────────────────────────────────────────
$paid        = array_values(array_filter($orders, fn($o) => ($o['status'] ?? '') === 'paid'));
$pending     = array_values(array_filter($orders, fn($o) => ($o['status'] ?? '') === 'pending'));
$needsReview = array_values(array_filter($orders, fn($o) => ($o['status'] ?? '') === 'review'));

$collected = array_sum(array_map(fn($o) => (int) ($o['amount_paid'] ?? $o['amount']), $paid));

// Outstanding balance across paid deposits — what is still to be invoiced.
$outstanding = array_sum(array_map(function ($o) {
    if (($o['mode'] ?? '') !== 'deposit') return 0;
    return max(0, (int) ($o['full_price'] ?? 0) - (int) ($o['amount_paid'] ?? $o['amount']));
}, $paid));

$thisMonth = array_sum(array_map(
    fn($o) => (int) ($o['amount_paid'] ?? $o['amount']),
    array_filter($paid, fn($o) => !empty($o['paid_at']) && date('Y-m', strtotime($o['paid_at'])) === date('Y-m'))
));

$statusLabels = [
    'paid'        => 'Paid',
    'pending'     => 'Pending',
    'failed'      => 'Failed',
    'init_failed' => 'Not started',
    'review'      => 'Needs review',
];

layout_head('Payments');
layout_sidebar('payments');
?>
<div class="admin-topbar">
  <div class="topbar-title">Payments</div>
  <div class="topbar-actions">
    <a href="https://dashboard.paystack.com/#/transactions" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Paystack Dashboard
    </a>
  </div>
</div>

<div class="admin-content">

  <?php if (!paystack_configured()): ?>
  <div class="pay-banner pay-banner-warn">
    <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <div>
      <strong>Paystack is not configured.</strong> Online payment is switched off until a secret key
      is added to <code>includes/paystack_config.php</code>. The checkout tells customers to use the
      contact form instead, so nothing is broken on the live site.
    </div>
  </div>
  <?php elseif (paystack_mode() === 'test'): ?>
  <div class="pay-banner pay-banner-warn">
    <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <div>
      <strong>Test mode.</strong> These are test-key transactions — no real money has moved. Swap in
      your live keys in <code>includes/paystack_config.php</code> when you are ready to take real payments.
    </div>
  </div>
  <?php endif; ?>

  <?php if ($needsReview): ?>
  <div class="pay-banner pay-banner-warn">
    <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <div>
      <strong><?php echo count($needsReview); ?> payment<?php echo count($needsReview) === 1 ? ' needs' : 's need'; ?> checking.</strong>
      The amount or currency did not match what we expected. Open the transaction in your Paystack
      dashboard and compare it against the reference before delivering any work.
    </div>
  </div>
  <?php endif; ?>

  <!-- Stats -->
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
      </div>
      <div class="stat-card-num" style="color:#16a34a;font-size:1.5rem;"><?php echo omg_naira($collected); ?></div>
      <div class="stat-card-label">Collected (all time)</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <div class="stat-card-num" style="font-size:1.5rem;"><?php echo omg_naira($thisMonth); ?></div>
      <div class="stat-card-label"><?php echo date('F Y'); ?></div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="stat-card-num" style="color:#d97706;font-size:1.5rem;"><?php echo omg_naira($outstanding); ?></div>
      <div class="stat-card-label">Balances still to invoice</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="stat-card-num"><?php echo count($paid); ?></div>
      <div class="stat-card-label">Successful payments</div>
    </div>
  </div>

  <!-- Orders -->
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:12px;">
      <div class="admin-card-title" style="margin:0;border:none;padding:0;">
        Transactions
        <?php if (paystack_configured()): ?>
          <span class="badge badge-<?php echo paystack_mode(); ?>" style="margin-left:8px;vertical-align:middle;"><?php echo paystack_mode(); ?></span>
        <?php endif; ?>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <?php foreach ([
          'all'     => 'All (' . count($orders) . ')',
          'paid'    => 'Paid (' . count($paid) . ')',
          'pending' => 'Pending (' . count($pending) . ')',
          'failed'  => 'Failed',
          'review'  => 'Review',
        ] as $key => $label): ?>
        <a href="?status=<?php echo $key; ?>"
           class="btn btn-sm <?php echo $filter === $key ? 'btn-primary' : 'btn-ghost'; ?>">
          <?php echo htmlspecialchars($label); ?>
        </a>
        <?php endforeach; ?>
      </div>
    </div>

    <?php if (empty($visible)): ?>
    <div style="padding:60px 24px;text-align:center;">
      <svg width="40" height="40" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 14px;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      <p style="color:var(--text-3);font-size:.9rem;">
        <?php echo $filter === 'all' ? 'No payments yet. Transactions appear here as soon as a customer checks out.' : 'Nothing matches this filter.'; ?>
      </p>
    </div>
    <?php else: ?>
    <div style="overflow-x:auto;">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Service</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Reference</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($visible as $o):
        $status  = $o['status'] ?? 'pending';
        $amount  = (int) ($o['amount_paid'] ?? $o['amount']);
        $full    = (int) ($o['full_price'] ?? 0);
        $balance = ($o['mode'] ?? '') === 'deposit' ? max(0, $full - $amount) : 0;
        $cust    = $o['customer'] ?? [];
        $when    = $o['paid_at'] ?? $o['created_at'] ?? '';
      ?>
      <tr>
        <td>
          <div style="font-weight:600;font-size:.875rem;"><?php echo htmlspecialchars($cust['name'] ?? '—'); ?></div>
          <div class="pay-sub">
            <a href="mailto:<?php echo htmlspecialchars($cust['email'] ?? ''); ?>" style="color:var(--text-3);">
              <?php echo htmlspecialchars($cust['email'] ?? '—'); ?>
            </a>
          </div>
          <?php if (!empty($cust['phone'])): ?>
            <div class="pay-sub"><?php echo htmlspecialchars($cust['phone']); ?></div>
          <?php endif; ?>
          <?php if (!empty($cust['company'])): ?>
            <div class="pay-sub"><?php echo htmlspecialchars($cust['company']); ?></div>
          <?php endif; ?>
        </td>
        <td>
          <div style="font-size:.84rem;font-weight:500;max-width:240px;line-height:1.4;">
            <?php echo htmlspecialchars($o['item_label'] ?? '—'); ?>
          </div>
          <?php if (!empty($cust['notes'])): ?>
          <div class="pay-sub" style="max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
               title="<?php echo htmlspecialchars($cust['notes']); ?>">
            <?php echo htmlspecialchars($cust['notes']); ?>
          </div>
          <?php endif; ?>
        </td>
        <td>
          <div class="pay-amount" style="color:<?php echo $status === 'paid' ? '#16a34a' : 'var(--text-2)'; ?>;">
            <?php echo omg_naira($amount); ?>
          </div>
          <?php if (($o['mode'] ?? '') === 'deposit'): ?>
            <div class="pay-sub">50% of <?php echo omg_naira($full); ?></div>
            <?php if ($balance > 0 && $status === 'paid'): ?>
              <div class="pay-sub" style="color:#d97706;font-weight:600;"><?php echo omg_naira($balance); ?> to invoice</div>
            <?php endif; ?>
          <?php endif; ?>
          <?php if (!empty($o['channel'])): ?>
            <div class="pay-sub" style="text-transform:capitalize;"><?php echo htmlspecialchars(str_replace('_', ' ', $o['channel'])); ?></div>
          <?php endif; ?>
        </td>
        <td>
          <span class="badge badge-<?php echo htmlspecialchars($status); ?>">
            <?php echo htmlspecialchars($statusLabels[$status] ?? ucfirst($status)); ?>
          </span>
          <?php if ($status === 'paid'): ?>
            <div class="pay-sub" style="margin-top:5px;">
              <?php echo !empty($o['receipt_sent']) ? '✓ Receipt sent' : '⚠ Receipt not sent'; ?>
            </div>
          <?php elseif (!empty($o['gateway_msg'])): ?>
            <div class="pay-sub" style="margin-top:5px;max-width:180px;line-height:1.4;">
              <?php echo htmlspecialchars($o['gateway_msg']); ?>
            </div>
          <?php endif; ?>
          <?php if (!empty($o['flags'])): ?>
            <div class="pay-sub" style="margin-top:5px;color:#dc2626;font-weight:600;">
              <?php echo htmlspecialchars($o['flags'][count($o['flags']) - 1]['event']); ?>
            </div>
          <?php endif; ?>
        </td>
        <td><span class="pay-ref"><?php echo htmlspecialchars($o['reference'] ?? '—'); ?></span></td>
        <td style="color:var(--text-3);font-size:.78rem;white-space:nowrap;">
          <?php echo $when ? date('M j, Y', strtotime($when)) : '—'; ?>
          <?php if ($when): ?><div class="pay-sub"><?php echo date('g:ia', strtotime($when)); ?></div><?php endif; ?>
        </td>
      </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
    <?php endif; ?>
  </div>

  <div class="pay-banner pay-banner-info" style="margin-top:22px;">
    <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <div>
      Paystack is the authority on whether money actually moved — this table mirrors it for day-to-day
      work. If a row disagrees with your Paystack dashboard, trust Paystack and check the reference there.
      Refunds and payouts are handled in the Paystack dashboard, not here.
    </div>
  </div>

</div>
<?php layout_foot(); ?>

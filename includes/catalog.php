<?php
// ─────────────────────────────────────────────────────────────────────────────
//  Price Catalog  —  server-side source of truth
// ─────────────────────────────────────────────────────────────────────────────
//  The browser never tells us what to charge. It sends an item id; this file
//  decides the amount. That means a tampered request cannot buy the Premium
//  package for ₦1.
//
//  KEEP IN SYNC with the `serviceCategories` and `addOns` arrays in
//  src/pages/PricingPage.jsx. If a price changes there, change it here too —
//  the checkout uses THIS file, so this one is what customers actually pay.
// ─────────────────────────────────────────────────────────────────────────────

function omg_catalog(): array {
    return [

        // ── Graphic Design ────────────────────────────────────────────────
        'graphic-design:starter' => [
            'type'     => 'package',
            'category' => 'Graphic Design',
            'tier'     => 'Starter',
            'monthly'  => 80000,
            'annual'   => 64000,
        ],
        'graphic-design:growth' => [
            'type'     => 'package',
            'category' => 'Graphic Design',
            'tier'     => 'Growth',
            'monthly'  => 200000,
            'annual'   => 160000,
        ],
        'graphic-design:premium' => [
            'type'     => 'package',
            'category' => 'Graphic Design',
            'tier'     => 'Premium',
            'monthly'  => 450000,
            'annual'   => 360000,
        ],

        // ── Web Development ───────────────────────────────────────────────
        'web-development:starter' => [
            'type'     => 'package',
            'category' => 'Web Development',
            'tier'     => 'Starter',
            'monthly'  => 200000,
            'annual'   => 160000,
        ],
        'web-development:growth' => [
            'type'     => 'package',
            'category' => 'Web Development',
            'tier'     => 'Growth',
            'monthly'  => 500000,
            'annual'   => 400000,
        ],
        'web-development:premium' => [
            'type'     => 'package',
            'category' => 'Web Development',
            'tier'     => 'Premium',
            'monthly'  => 1200000,
            'annual'   => 960000,
        ],

        // ── UI/UX Design ──────────────────────────────────────────────────
        'ui-ux-design:starter' => [
            'type'     => 'package',
            'category' => 'UI/UX Design',
            'tier'     => 'Starter',
            'monthly'  => 150000,
            'annual'   => 120000,
        ],
        'ui-ux-design:growth' => [
            'type'     => 'package',
            'category' => 'UI/UX Design',
            'tier'     => 'Growth',
            'monthly'  => 350000,
            'annual'   => 280000,
        ],
        'ui-ux-design:premium' => [
            'type'     => 'package',
            'category' => 'UI/UX Design',
            'tier'     => 'Premium',
            'monthly'  => 700000,
            'annual'   => 560000,
        ],

        // ── Motion Design ─────────────────────────────────────────────────
        'motion-design:starter' => [
            'type'     => 'package',
            'category' => 'Motion Design',
            'tier'     => 'Starter',
            'monthly'  => 100000,
            'annual'   => 80000,
        ],
        'motion-design:growth' => [
            'type'     => 'package',
            'category' => 'Motion Design',
            'tier'     => 'Growth',
            'monthly'  => 280000,
            'annual'   => 224000,
        ],
        'motion-design:premium' => [
            'type'     => 'package',
            'category' => 'Motion Design',
            'tier'     => 'Premium',
            'monthly'  => 600000,
            'annual'   => 480000,
        ],

        // ── Add-ons (standalone services) ─────────────────────────────────
        //  `from => true` means the listed price is a starting figure
        //  ("₦80,000+" on the pricing page). The deposit is calculated on
        //  that starting figure; the final scope is quoted separately.
        'addon:logo-design' => [
            'type'   => 'addon',
            'label'  => 'Logo Design Only',
            'amount' => 80000,
            'from'   => true,
        ],
        'addon:landing-page' => [
            'type'   => 'addon',
            'label'  => 'Landing Page Design & Dev',
            'amount' => 150000,
            'from'   => true,
        ],
        'addon:social-media-kit' => [
            'type'   => 'addon',
            'label'  => 'Social Media Kit (30 Posts)',
            'amount' => 75000,
            'from'   => false,
        ],
        'addon:explainer-video' => [
            'type'   => 'addon',
            'label'  => 'Explainer Video Animation',
            'amount' => 200000,
            'from'   => true,
        ],
        'addon:packaging-design' => [
            'type'   => 'addon',
            'label'  => 'Packaging Design',
            'amount' => 120000,
            'from'   => true,
        ],
        'addon:design-retainer' => [
            'type'   => 'addon',
            'label'  => 'Monthly Design Retainer',
            'amount' => 120000,
            'from'   => false,
            'note'   => 'Billed monthly',
        ],
        'addon:seo-audit' => [
            'type'   => 'addon',
            'label'  => 'SEO Audit & Optimisation',
            'amount' => 80000,
            'from'   => false,
        ],
        'addon:creative-consulting' => [
            'type'   => 'addon',
            'label'  => 'Creative Consulting',
            'amount' => 150000,
            'from'   => false,
        ],
    ];
}

/**
 * Look up a catalog item by id. Returns null for unknown ids, which is how
 * the API rejects anything the browser invents.
 */
function omg_catalog_item(string $id): ?array {
    $catalog = omg_catalog();
    if (!isset($catalog[$id])) return null;
    $item       = $catalog[$id];
    $item['id'] = $id;
    return $item;
}

/**
 * Human-readable name for receipts, emails and the admin table.
 */
function omg_catalog_label(array $item, string $billing = 'monthly'): string {
    if (($item['type'] ?? '') === 'package') {
        $period = $billing === 'annual' ? 'Annual' : 'Monthly';
        return $item['category'] . ' — ' . $item['tier'] . ' (' . $period . ')';
    }
    return $item['label'] ?? 'Service';
}

/**
 * Full package price in naira, before the deposit split.
 * Returns null if the billing cycle does not apply to this item.
 */
function omg_catalog_price(array $item, string $billing = 'monthly'): ?int {
    if (($item['type'] ?? '') === 'package') {
        $key = $billing === 'annual' ? 'annual' : 'monthly';
        return isset($item[$key]) ? (int) $item[$key] : null;
    }
    return isset($item['amount']) ? (int) $item['amount'] : null;
}

/**
 * The deposit actually charged at checkout, in naira.
 */
function omg_deposit_amount(int $fullPrice): int {
    return (int) round($fullPrice * PAYSTACK_DEPOSIT_PERCENT / 100);
}

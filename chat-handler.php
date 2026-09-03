<?php
require_once __DIR__ . '/includes/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['reply' => 'Invalid request.']); exit;
}

$input   = json_decode(file_get_contents('php://input'), true);
$message = trim(strip_tags($input['message'] ?? ''));

if (!$message) {
    echo json_encode(['reply' => 'Please type a message.']); exit;
}

$systemPrompt = "You are a friendly assistant for OMG Tech Hub, a premium creative-tech agency in Benin City, Nigeria. Answer questions helpfully and concisely (2-4 sentences max).

SERVICES & PRICING:
1. Graphic Design — Starter: ₦80,000 | Growth: ₦200,000 | Premium: ₦450,000 | Enterprise: Custom
2. Web Development — Starter: ₦200,000 | Growth: ₦500,000 | Premium: ₦1,200,000 | Enterprise: Custom
3. UI/UX Design — Starter: ₦150,000 | Growth: ₦350,000 | Premium: ₦700,000 | Enterprise: Custom
4. Motion Design — Starter: ₦100,000 | Growth: ₦280,000 | Premium: ₦600,000 | Enterprise: Custom

WHAT WE DO:
- Graphic Design: logos, brand identity, packaging, social media kits
- Web Development: custom websites, e-commerce, web apps, CMS, SEO
- UI/UX Design: wireframes, prototypes, design systems, usability testing
- Motion Design: logo animation, explainer videos, social motion, brand films

OUR PROCESS: Discovery then Strategy then Design then Launch
PAYMENT: 50% deposit to begin, balance on completion
GUARANTEE: Unlimited revisions, 3 months post-launch support, on-time delivery

If someone wants to start a project, tell them to visit the Contact page or send a WhatsApp message.
Only answer questions about OMG Tech Hub. Do not make up information not listed here.";

$payload = [
    'model'    => 'llama-3.1-8b-instant',
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user',   'content' => $message],
    ],
    'max_tokens' => 300,
];

$apiKey = getenv('GROQ_API_KEY') ?: (getenv('ANTHROPIC_API_KEY') ?: (defined('ANTHROPIC_API_KEY') ? ANTHROPIC_API_KEY : ''));

$ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);

$response = curl_exec($ch);
$error    = curl_error($ch);
curl_close($ch);

if ($error) {
    echo json_encode(['reply' => 'I\'m having trouble connecting. Please contact us directly.']); exit;
}

$data  = json_decode($response, true);
$reply = $data['choices'][0]['message']['content'] ?? 'Sorry, I couldn\'t get a response. Please contact us directly.';

echo json_encode(['reply' => $reply]);
<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$accessToken = getenv('META_CAPI_ACCESS_TOKEN') ?: '';
$pixelId = '1053615244262897';

if ($accessToken === '') {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'capi_token_not_configured']);
    exit;
}

$input = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$allowedEvents = ['AddToCart', 'InitiateCheckout', 'AddPaymentInfo'];
$eventName = (string)($input['event_name'] ?? '');
if (!in_array($eventName, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'event_not_allowed']);
    exit;
}

$eventId = preg_replace('/[^a-zA-Z0-9_\-\.]/', '', (string)($input['event_id'] ?? ''));
if ($eventId === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_event_id']);
    exit;
}

$customData = $input['custom_data'] ?? [];
if (!is_array($customData)) $customData = [];

$userData = [
    'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
    'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
];

$fbp = trim((string)($input['fbp'] ?? ''));
$fbc = trim((string)($input['fbc'] ?? ''));
if ($fbp !== '') $userData['fbp'] = $fbp;
if ($fbc !== '') $userData['fbc'] = $fbc;

$event = [
    'event_name' => $eventName,
    'event_time' => time(),
    'event_id' => $eventId,
    'action_source' => 'website',
    'event_source_url' => (string)($input['event_source_url'] ?? ''),
    'user_data' => $userData,
    'custom_data' => $customData
];

$payload = json_encode(['data' => [$event]], JSON_UNESCAPED_SLASHES);
$url = 'https://graph.facebook.com/v23.0/' . rawurlencode($pixelId) . '/events?access_token=' . rawurlencode($accessToken);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 8
]);

$response = curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'meta_request_failed',
        'status' => $status,
        'detail' => $error
    ]);
    exit;
}

echo json_encode(['ok' => true]);

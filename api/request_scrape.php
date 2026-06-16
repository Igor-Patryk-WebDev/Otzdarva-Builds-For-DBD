<?php
error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

session_start();
if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized']));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

// Load config from .env (same pattern as login.php)
$envPath = __DIR__ . '/../.env';
$env = parse_ini_file($envPath);

if (!$env) {
    http_response_code(500);
    exit(json_encode(['error' => 'Server config error']));
}

$github_owner = $env['GITHUB_OWNER'] ?? '';
$github_repo  = $env['GITHUB_REPO']  ?? '';
$github_pat   = $env['GITHUB_PAT']   ?? '';
$event_type   = $env['GITHUB_EVENT_TYPE'] ?? 'run-scraper';

if (!$github_owner || !$github_repo || !$github_pat) {
    http_response_code(500);
    exit(json_encode(['error' => 'GitHub config missing from .env']));
}

$url  = "https://api.github.com/repos/$github_owner/$github_repo/dispatches";
$data = json_encode(['event_type' => $event_type]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: token $github_pat",
    "Accept: application/vnd.github.v3+json",
    "Content-Type: application/json",
    "User-Agent: PHP-cURL-Trigger",
]);

$result    = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error     = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    exit(json_encode(['error' => 'cURL error: ' . $error]));
}

if ($http_code === 204) {
    echo json_encode(['success' => true, 'message' => 'Workflow triggered successfully.']);
} else {
    http_response_code(502);
    echo json_encode([
        'error'   => 'GitHub API returned unexpected status.',
        'code'    => $http_code,
        'details' => $result,
    ]);
}
?>
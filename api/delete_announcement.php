<?php
session_start();
header('Content-Type: application/json');

$dataPath = __DIR__ . '/../public/data/announcements.json';

function readData(string $path): array {
    if (!file_exists($path)) return ['alerts' => [], 'threatLevelsStyles' => []];
    return json_decode(file_get_contents($path), true);
}

function writeData(string $path, array $data): void {
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

if (!($_SESSION['admin'] ?? false)) {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized']));
}

$body = json_decode(file_get_contents('php://input'), true);
$id = $body['id'] ?? '';

if (!$id) {
    http_response_code(400);
    exit(json_encode(['error' => 'Missing id']));
}

$data = readData($dataPath);
$data['alerts'] = array_values(array_filter($data['alerts'], fn($a) => $a['id'] !== $id));
writeData($dataPath, $data);

echo json_encode(['success' => true]);
?>
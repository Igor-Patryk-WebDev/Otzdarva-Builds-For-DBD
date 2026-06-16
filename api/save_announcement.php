<?php
// /api/announcements.php

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataPath = __DIR__ . '/../public/data/announcements.json';

function readData(string $path): array {
    if (!file_exists($path)) return ['alerts' => [], 'threatLevelsStyles' => []];
    return json_decode(file_get_contents($path), true);
}

function writeData(string $path, array $data): void {
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

function isAdmin(): bool {
    return $_SESSION['admin'] ?? false;
}

// ───── POST — dodaj alert ─────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isAdmin()) {
        http_response_code(401);
        exit(json_encode(['error' => 'Unauthorized']));
    }

    $body = json_decode(file_get_contents('php://input'), true);

    $title = trim($body['title'] ?? '');
    $desc = trim($body['desc'] ?? '');
    $threatLevel = (int)($body['threatLevel'] ?? 0);
    $expiresAt = isset($body['expiresAt']) ? (int)$body['expiresAt'] : null;

    if (!$title || !$desc || !in_array($threatLevel, [0, 1, 2, 3])) {
        http_response_code(400);
        exit(json_encode(['error' => 'Invalid data']));
    }

    $newAlert = [
        'id' => bin2hex(random_bytes(8)),
        'title' => $title,
        'desc' => $desc,
        'threatLevel' => $threatLevel,
        'expiresAt' => $expiresAt,
        'createdAt' => date('c'),
    ];

    $data = readData($dataPath);
    $data['alerts'][] = $newAlert;
    writeData($dataPath, $data);

    http_response_code(201);
    echo json_encode(['success' => true, 'alert' => $newAlert]);
    exit;
}
?>
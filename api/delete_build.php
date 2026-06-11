<?php
error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

if (!$body || !isset($body['characterName'], $body['buildName'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$filePath = __DIR__ . '/../public/data/builds.json';
$data = json_decode(file_get_contents($filePath), true);

$found = false;
foreach ($data['killers'] as &$killer) {
    if ($killer['name'] === $body['characterName']) {
        foreach ($killer['builds'] as $index => $build) {
            if ($build['name'] === $body['buildName']) {
                array_splice($killer['builds'], $index, 1);
                $found = true;
                break;
            }
        }
        break;
    }
}

if (!$found) {
    http_response_code(404);
    echo json_encode(['error' => 'Build not found']);
    exit;
}

file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode(['success' => true]);
?>
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
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

if (!$body || !isset($body['characterName'], $body['buildName'], $body['perks'], $body['notes'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$filePath = __DIR__ . '/../public/data/builds.json';
if (!file_exists($filePath)) {
    $filePath = __DIR__ . '/../data/builds.json';
}
error_log("Looking for file at: " . realpath($filePath));
$data = json_decode(file_get_contents($filePath), true);

$newBuild = [
    'name' => $body['buildName'],
    'perks' => array_map(fn($perk) => [
        'name' => $perk['name'],
        'alts' => array_map(fn($alt) => ['name' => $alt['name']], $perk['alts'] ?? []),
    ], $body['perks']),
    'notes' => $body['notes'],
];

// Check for duplicate name for this character
$buildNameClean = strtolower(trim($body['buildName']));
foreach (['killers', 'survivors'] as $role) {
    if (isset($data[$role])) {
        foreach ($data[$role] as $char) {
            if ($char['name'] === $body['characterName'] && isset($char['builds'])) {
                foreach ($char['builds'] as $b) {
                    if (strtolower(trim($b['name'])) === $buildNameClean) {
                        http_response_code(400);
                        exit(json_encode(['error' => "A build named '{$body['buildName']}' already exists for {$body['characterName']}."]));
                    }
                }
            }
        }
    }
}

// Find the matching character (killer or survivor) by name
$found = false;
foreach (['killers', 'survivors'] as $role) {
    if (isset($data[$role])) {
        foreach ($data[$role] as &$char) {
            if ($char['name'] === $body['characterName']) {
                $char['builds'][] = $newBuild;
                $found = true;
                break 2;
            }
        }
    }
}

if (!$found) {
    $data['killers'][] = [
        'name' => $body['characterName'],
        'builds' => [$newBuild],
    ];
}

file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode(['success' => true]);
?>
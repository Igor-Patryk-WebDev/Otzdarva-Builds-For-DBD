<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['admin'])) {
    echo json_encode(['authenticated' => true]);
} else {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
}
?>
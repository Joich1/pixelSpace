<?php
require 'config.php';
header ("Content-Type: application/json");

$x = (int)($_POST["y"] ?? -1);
$y = (int)($_POST["y"] ?? -1);
$color = $_POST["color"] ?? "";

if ($x < 0 || $x >= 64 || $y < 0 || $y >= 64 || !preg_match('/^#[0-9a-f]{6}$/i', $color)){
    http_response_code(400);
    die(json_encode(["error" => "Invalid data"]));
}

$stmt = $conn->prepare(
    "INSERT INTO pixels (x, y, color) VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE color = values(color)"
);

$stmt->bind_param("iis", $x, $y, $color);
$stmt->execute();

echo json_encode(["ok" => true]);
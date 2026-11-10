<?php
require "config.php";
header("Content-Type: application/json");

$result = $conn->query("SELECT x, y, color FROM pixels");
$pixels = [];

while ($row = $result->fetch_assoc()){
    $pixels[] = [
        "x" => (int)$row["x"],
        "y" => (int)$row["y"],
        "color" => $row["color"]
    ];
}

echo json_encode($pixels);
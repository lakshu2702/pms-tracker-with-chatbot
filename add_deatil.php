<?php
// Database configuration
$host = 'localhost';
$dbname = 'pms_tracker';
$username = 'root'; // Change this if necessary
$password = ''; // Change this if necessary

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve POST data
    $lastPeriodStart = $_POST['lastPeriodStart'];
    $lastPeriodEnd = $_POST['lastPeriodEnd'];
    $todayFeeling = $_POST['todayFeeling'];
    $mood = $_POST['mood'] ?? null;
    $cravings = $_POST['cravings'] ?? null;

    // SQL query to insert data
    $sql = "INSERT INTO period_details (last_period_start, last_period_end, today_feeling, mood, cravings) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$lastPeriodStart, $lastPeriodEnd, $todayFeeling, $mood, $cravings]);

    // Return success response
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    // Handle error
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>

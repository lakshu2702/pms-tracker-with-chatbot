<?php
// Database configuration
$host = 'localhost';
$dbname = 'pms_tracker';
$username = 'root'; // Change this if necessary
$password = ''; // Change this if necessary

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch data
    $sql = "SELECT last_period_start, last_period_end, today_feeling, mood, cravings FROM period_details ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->query($sql);
    $details = $stmt->fetch(PDO::FETCH_ASSOC);

    // Return data as JSON
    echo json_encode($details);
} catch (PDOException $e) {
    // Handle error
    echo json_encode(['error' => $e->getMessage()]);
}
?>

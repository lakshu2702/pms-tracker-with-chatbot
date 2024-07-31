<?php
// add_symptoms.php

// Database connection
$host = 'localhost';
$db = 'period_tracker';
$user = 'root'; // Replace with your MySQL username
$pass = ''; // Replace with your MySQL password

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the JSON data from the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Prepare the SQL statement
    $stmt = $pdo->prepare('INSERT INTO symptoms (
        user_name, mood, mood_intensity, feeling_today, period_start_date, period_end_date
    ) VALUES (
        :user_name, :mood, :mood_intensity, :feeling_today, :period_start_date, :period_end_date
    )');

    // Execute the statement
    $result = $stmt->execute([
        ':user_name' => $data['user_name'],
        ':mood' => $data['mood'],
        ':mood_intensity' => $data['mood_intensity'],
        ':feeling_today' => $data['feeling_today'],
        ':period_start_date' => $data['period_start_date'],
        ':period_end_date' => $data['period_end_date']
    ]);

    // Return response
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add symptoms.']);
    }

} catch (PDOException $e) {
    // Default error handling
    echo json_encode(['success' => false, 'message' => 'An error occurred.']);
}
?>
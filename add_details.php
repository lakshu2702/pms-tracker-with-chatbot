<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'period_tracker';
$username = 'root'; // Replace with your MySQL username
$password = ''; // Replace with your MySQL password

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Log the received data for debugging
    file_put_contents('debug.log', print_r($data, true), FILE_APPEND);

    if (isset($data['symptom'])) {
        // Handle symptoms insertion
        if (empty($data['user_name']) || empty($data['symptom']) || empty($data['severity'])) {
            echo json_encode(['success' => false, 'message' => 'User name, symptom, and severity are required.']);
            exit;
        }

        $sql = "INSERT INTO symptoms (user_name, symptom, severity, notes) VALUES (:user_name, :symptom, :severity, :notes)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':user_name' => $data['user_name'],
            ':symptom' => $data['symptom'],
            ':severity' => $data['severity'],
            ':notes' => $data['notes'] ?? null
        ]);

        echo json_encode(['success' => true]);
    } elseif (isset($data['period_start_date'])) {
        // Handle periods insertion
        if (empty($data['user_name']) || empty($data['period_start_date']) || empty($data['period_end_date'])) {
            echo json_encode(['success' => false, 'message' => 'User name, period start date, and period end date are required.']);
            exit;
        }

        $sql = "INSERT INTO periods (user_name, period_start_date, period_end_date, mood, mood_intensity, last_period_1_start_date, last_period_1_end_date, last_period_1_feeling, last_period_2_start_date, last_period_2_end_date, last_period_2_feeling, last_period_3_start_date, last_period_3_end_date, last_period_3_feeling) VALUES (:user_name, :period_start_date, :period_end_date, :mood, :mood_intensity, :last_period_1_start_date, :last_period_1_end_date, :last_period_1_feeling, :last_period_2_start_date, :last_period_2_end_date, :last_period_2_feeling, :last_period_3_start_date, :last_period_3_end_date, :last_period_3_feeling)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':user_name' => $data['user_name'],
            ':period_start_date' => $data['period_start_date'],
            ':period_end_date' => $data['period_end_date'],
            ':mood' => $data['mood'] ?? null,
            ':mood_intensity' => $data['mood_intensity'] ?? null,
            ':last_period_1_start_date' => $data['last_period_1_start_date'] ?? null,
            ':last_period_1_end_date' => $data['last_period_1_end_date'] ?? null,
            ':last_period_1_feeling' => $data['last_period_1_feeling'] ?? null,
            ':last_period_2_start_date' => $data['last_period_2_start_date'] ?? null,
            ':last_period_2_end_date' => $data['last_period_2_end_date'] ?? null,
            ':last_period_2_feeling' => $data['last_period_2_feeling'] ?? null,
            ':last_period_3_start_date' => $data['last_period_3_start_date'] ?? null,
            ':last_period_3_end_date' => $data['last_period_3_end_date'] ?? null,
            ':last_period_3_feeling' => $data['last_period_3_feeling'] ?? null
        ]);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    }

} catch (PDOException $e) {
    // Log and return error response
    file_put_contents('debug.log', 'SQL Error: ' . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    exit;
}
?>
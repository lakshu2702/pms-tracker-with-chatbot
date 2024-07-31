<?php
// add_period.php

// Database connection
$host = 'localhost';
$db = 'period_tracker';
$user = 'root'; // Replace with your MySQL username
$pass = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the JSON data from the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Prepare the SQL statement
    $stmt = $pdo->prepare('INSERT INTO periods (
        user_name, is_for_self, person_name, relation, dob, period_start_date, period_end_date,
        feeling_today, mood, mood_intensity, last_period_1_start_date, last_period_1_end_date,
        last_period_1_feeling, last_period_2_start_date, last_period_2_end_date, last_period_2_feeling,
        last_period_3_start_date, last_period_3_end_date, last_period_3_feeling
    ) VALUES (
        :user_name, :is_for_self, :person_name, :relation, :dob, :period_start_date, :period_end_date,
        :feeling_today, :mood, :mood_intensity, :last_period_1_start_date, :last_period_1_end_date,
        :last_period_1_feeling, :last_period_2_start_date, :last_period_2_end_date, :last_period_2_feeling,
        :last_period_3_start_date, :last_period_3_end_date, :last_period_3_feeling
    )');

    // Execute the statement
    $result = $stmt->execute([
        ':user_name' => $data['user_name'],
        ':is_for_self' => $data['is_for_self'],
        ':person_name' => isset($data['person_name']) ? $data['person_name'] : null,
        ':relation' => isset($data['relation']) ? $data['relation'] : null,
        ':dob' => isset($data['dob']) ? $data['dob'] : null,
        ':period_start_date' => $data['period_start_date'],
        ':period_end_date' => $data['period_end_date'],
        ':feeling_today' => $data['feeling_today'],
        ':mood' => $data['mood'],
        ':mood_intensity' => $data['mood_intensity'],
        ':last_period_1_start_date' => isset($data['last_period_1_start_date']) ? $data['last_period_1_start_date'] : null,
        ':last_period_1_end_date' => isset($data['last_period_1_end_date']) ? $data['last_period_1_end_date'] : null,
        ':last_period_1_feeling' => isset($data['last_period_1_feeling']) ? $data['last_period_1_feeling'] : null,
        ':last_period_2_start_date' => isset($data['last_period_2_start_date']) ? $data['last_period_2_start_date'] : null,
        ':last_period_2_end_date' => isset($data['last_period_2_end_date']) ? $data['last_period_2_end_date'] : null,
        ':last_period_2_feeling' => isset($data['last_period_2_feeling']) ? $data['last_period_2_feeling'] : null,
        ':last_period_3_start_date' => isset($data['last_period_3_start_date']) ? $data['last_period_3_start_date'] : null,
        ':last_period_3_end_date' => isset($data['last_period_3_end_date']) ? $data['last_period_3_end_date'] : null,
        ':last_period_3_feeling' => isset($data['last_period_3_feeling']) ? $data['last_period_3_feeling'] : null
    ]);

    // Return response
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add period.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
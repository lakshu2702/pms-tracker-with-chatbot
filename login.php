<?php
// Database configuration
$host = 'localhost';
$db = 'period_tracker';
$user = 'root'; // Replace with your MySQL username
$pass = '';

// Create a new PDO instance
$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['email'], $data['password'])) {
    echo json_encode(['message' => 'All fields are required']);
    exit;
}

// Check if the user exists
try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute([':email' => $data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['password'], $user['password'])) {
        echo json_encode(['message' => 'Login successful']);
    } else {
        echo json_encode(['message' => 'Invalid email or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>
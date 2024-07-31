<?php
// Database configuration
$host = 'localhost';
$db = 'period_tracker';
$user = 'root'; // Replace with your MySQL username
$pass = ''; // Replace with your MySQL password

// Create a new PDO instance
$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['name'], $data['dob'], $data['email'], $data['password'], $data['confirmPassword'])) {
    echo json_encode(['message' => 'All fields are required']);
    exit;
}

if ($data['password'] !== $data['confirmPassword']) {
    echo json_encode(['message' => 'Passwords do not match']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

// Check if the email already exists
try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute([':email' => $data['email']]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo json_encode(['message' => 'Email already registered']);
        exit;
    }

    // Insert user into database
    $stmt = $pdo->prepare("INSERT INTO users (name, dob, email, password) VALUES (:name, :dob, :email, :password)");
    $stmt->execute([
        ':name' => $data['name'],
        ':dob' => $data['dob'],
        ':email' => $data['email'],
        ':password' => $hashedPassword
    ]);

    echo json_encode(['message' => 'Registration successful']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>
<?php
// database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pms_tracker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch user details and previous records
session_start();
$user_id = $_SESSION['user_id']; // Assuming user ID is stored in session

$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user_result = $stmt->get_result();
$user = $user_result->fetch_assoc();

$sql = "SELECT * FROM period_records WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$period_result = $stmt->get_result();
$period_records = $period_result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

// Process form submission and integrate with Python prediction
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $lastPeriodStart = $_POST['lastPeriodStart'];
    $periodDuration = $_POST['periodDuration'];
    $cycleLength = $_POST['cycleLength'];
    $mood = $_POST['mood'];
    $cravings = $_POST['cravings'];

    // Save to database
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO period_records (user_id, last_period_start, period_duration, cycle_length, mood, cravings) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issiis", $user_id, $lastPeriodStart, $periodDuration, $cycleLength, $mood, $cravings);
    $stmt->execute();
    $stmt->close();

    // Predict next period start date
    $command = escapeshellcmd("python3 predict.py $lastPeriodStart $periodDuration $cycleLength");
    $output = shell_exec($command);

    // Output prediction
    echo "<script>alert('Predicted next period start date: $output');</script>";

    // Redirect after submission
    header("Location: dashboard.html");
    exit();
}
?>
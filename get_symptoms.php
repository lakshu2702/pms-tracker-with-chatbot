<?php
include 'db_connection.php'; // Include your database connection

$user_id = $_GET['user_id'];

$stmt = $pdo->prepare("SELECT * FROM symptoms WHERE user_id = ?");
$stmt->execute([$user_id]);
$symptoms = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($symptoms);
?>

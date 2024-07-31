<?php
include 'db_connection.php'; // Include your database connection

$user_id = $_GET['user_id'];

$stmt = $pdo->prepare("
    SELECT period_start_date, period_end_date, DATEDIFF(period_end_date, period_start_date) + 1 AS duration, feeling 
    FROM periods 
    WHERE user_id = ?
    ORDER BY period_start_date DESC
");
$stmt->execute([$user_id]);
$periods = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($periods);
?>

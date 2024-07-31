<?php
// Database configuration
$host = 'localhost';
$dbname = 'pms_tracker';
$username = 'root'; // Change this if necessary
$password = ''; // Change this if necessary

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve last period details
    $sql = "SELECT last_period_start, last_period_end FROM period_details ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->query($sql);
    $details = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($details) {
        // Call predict.py and get the result
        $lastPeriodStart = escapeshellarg($details['last_period_start']);
        $lastPeriodEnd = escapeshellarg($details['last_period_end']);
        $command = "python3 predict.py $lastPeriodStart $lastPeriodEnd";
        $output = shell_exec($command);
        $prediction = json_decode($output, true);

        // Return prediction result
        echo json_encode($prediction);
    } else {
        echo json_encode(['error' => 'No period details found']);
    }
} catch (PDOException $e) {
    // Handle error
    echo json_encode(['error' => $e->getMessage()]);
}
?>

<?php
date_default_timezone_set('America/Chicago');

$dailyBudget = 150;

// SUBMIT NEW ENTRY
if(isset($_POST["submit"])) {

    $amount = floatval($_POST["amount"]);
    $category = trim($_POST["category"]);

    if(empty($amount) || $amount <= 0){
        header("Location: index.html");
        exit();
    }

    if($category === 'clearMe') {
        // Reset JSON
        $reset = [
            "entries" => []
        ];
        file_put_contents('current.json', json_encode($reset, JSON_PRETTY_PRINT));
        header("Location: index.html");
        exit();
    }

    // Read current.json or create new
    if(file_exists('current.json')){
        $current_data = file_get_contents('current.json');
        $array_data = json_decode($current_data, true);
    } else {
        $array_data = ["entries" => []];
    }

    // Add new entry with today's date
    $entry = [
        "amount" => $amount,
        "category" => $category,
        "date" => date("Y-m-d")
    ];

    $array_data['entries'][] = $entry;

    file_put_contents('current.json', json_encode($array_data, JSON_PRETTY_PRINT));

    header("Location: index.html");
    exit();
}
?>
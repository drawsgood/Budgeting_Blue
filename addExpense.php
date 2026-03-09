<?php
$dailyBudget = 150; // daily starting budget

// DELETE ENTRY
if(isset($_POST["delete"])) {
    $index = $_POST["delete"]; // index of item to remove

    if(file_exists('current.json')) {
        $current_data = file_get_contents('current.json');
        $array_data = json_decode($current_data, true);

        if(isset($array_data['entries'][$index])) {
            $amount = $array_data['entries'][$index]['amount'];

            // add amount back to startingValue
            $array_data['startingValue']['fart'] += $amount;

            // remove entry
            unset($array_data['entries'][$index]);

            // reindex array
            $array_data['entries'] = array_values($array_data['entries']);

            $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
            file_put_contents('current.json', $final_data);
        }

        header("Location: index.html", true, 303);
        exit();
    }
}

// SUBMIT NEW ENTRY
if(isset($_POST["submit"])) {
    if(empty(trim($_POST["amount"]))) {  
        header("Location: index.html");
        exit();
    }

    if($_POST["category"] == 'clearMe') {  
        // reset the JSON file completely
        file_put_contents('current.json', json_encode([
            "startingValue" => ["fart" => $dailyBudget],
            "entries" => []
        ], JSON_PRETTY_PRINT));

        header("Location: index.html", true, 303);
        exit();
    } else {  
        if(file_exists('current.json')) {  
            $current_data = file_get_contents('current.json');  
            $array_data = json_decode($current_data, true);

            // Add today's entry with date
            $extra = array(  
                 'amount'   => $_POST['amount'],
                 'category' => $_POST['category'],
                 'date'     => date("Y-m-d")   // <-- today's date
            );

            // Update starting value
            $newFart = isset($array_data['startingValue']['fart']) ? $array_data['startingValue']['fart'] - $_POST['amount'] : $dailyBudget - $_POST['amount'];
            $array_data['entries'][] = $extra;
            $array_data['startingValue']['fart'] = $newFart;

            $final_data = json_encode($array_data, JSON_PRETTY_PRINT);  
            file_put_contents('current.json', $final_data);

            header("Location: index.html", true, 303);
            exit();
        } else {  
            // If file doesn't exist, create it
            $array_data = [
                "startingValue" => ["fart" => $dailyBudget - $_POST['amount']],
                "entries" => [
                    [
                        'amount' => $_POST['amount'],
                        'category' => $_POST['category'],
                        'date' => date("Y-m-d")
                    ]
                ]
            ];
            $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
            file_put_contents('current.json', $final_data);

            header("Location: index.html", true, 303);
            exit();
        }  
    }  
}
?>
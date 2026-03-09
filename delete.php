<?php

if(isset($_POST['index'])){

    $index = $_POST['index'];

    $data = json_decode(file_get_contents("current.json"), true);

    if(isset($data['entries'][$index])){

        $amount = $data['entries'][$index]['amount'];

        // restore balance
        $data['startingValue']['fart'] += $amount;

        unset($data['entries'][$index]);

        $data['entries'] = array_values($data['entries']);

        file_put_contents("current.json", json_encode($data, JSON_PRETTY_PRINT));
    }

}
?>
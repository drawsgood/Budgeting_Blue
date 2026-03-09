<?php
if(isset($_POST["delete"])){
    $index = $_POST["delete"];

    if(file_exists('current.json')){
        $current_data = file_get_contents('current.json');
        $array_data = json_decode($current_data, true);

        if(isset($array_data['entries'][$index])){
            unset($array_data['entries'][$index]); // remove entry
            $array_data['entries'] = array_values($array_data['entries']); // reindex

            $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
            file_put_contents('current.json', $final_data);

            echo "Deleted index $index"; // return response
        } else {
            echo "Index $index not found";
        }
    } else {
        echo "current.json missing";
    }
}
?>
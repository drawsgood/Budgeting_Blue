<?php
	 if(isset($_POST["submit"]))  
		 {  
		      if(empty(trim($_POST["amount"]))) 
		      {  
		            header("Location: index.html");
					exit();
		      }


		      if(($_POST["category"]) == 'clearMe') 
		      {  

				$file = file_get_contents("current.json");
				$json = json_decode($file, true);


					    foreach($json as $key => $item) {
					         file_put_contents('current.json', "{\"startingValue\": {\"fart\": 50}}");	
	        
					    }

					   	header("refresh:1; url=index.html", true, 303);
						exit();
				  }
		      else  
		      {  
		           if(file_exists('current.json'))  
		           {  
		                $current_data = file_get_contents('current.json');  
		                $array_data = json_decode($current_data, true);
		                $extra = array(  
		                     'amount'               =>     $_POST['amount'],
		                     'category'               =>     $_POST['category'],
		                );
		                $extra_2 = array(
		                	'fart'               =>     $_POST['fart'] - $_POST['amount']
		                );
		                $array_data['entries'][] = $extra;
		                $array_data['startingValue'] = $extra_2;
		                $final_data = json_encode($array_data, JSON_PRETTY_PRINT);  
		                if(file_put_contents('current.json', $final_data))  
		                {  
		                     $message = "<label class='text-success'>File Appended Success fully</p>";  
		                }

		                // $filename = 'myNewJSON.json';
		                //$handle = fopen($filename, 'w+');
		                //fwrite($handle, '[]');
		                //fclose($handle);

		                header("refresh:1; url=index.html", true, 303);
						exit();
		           }  
		           else  
		           {  
		                $error = 'JSON File not exits';  
		           }  
		      }  
		  }
?>
<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json; charset=UTF-8");

    $data = "GET request was successful.";

    /*ini_set('SMTP','mail.gmx.net');
    ini_set('smtp_port','587');
    ini_set('auth_username','a.paschold@gmx.net');
    ini_set('auth_password','xJKXm-681');
    ini_set('sendmail_from','a.paschold@gmx.net');*/
    
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        //check if the parameters are set in post request
        if (isset($_POST["mail"]) && isset($_POST["name"]) 
            && isset($_POST["subject"]) && isset($_POST["message"])){
            // filter parameters to avoid 
            $mail = filter_input(INPUT_POST, "mail", FILTER_SANITIZE_EMAIL);
            $name = htmlspecialchars($_POST["name"]);
            $subject = htmlspecialchars($_POST["subject"]);
            $message = htmlspecialchars($_POST["message"]);
            

            $data = ['POST REQUEST WAS SUCESSFUL'];
            array_push($data, $mail);
            array_push($data, $name);
            array_push($data, $subject);
            array_push($data, $message);

            //mail($mail, $subject, $message);
        } else {
            $data = ['POST REQUEST NOT COMPLET!'];
        }
    } else {
        $mail = "a.paschold@gmx.net";
        $subject = "Testnachricht";
        $message = "Das ist eine Nachricht";
        $header = "From: a.paschold@gmx.net";
        mail($mail, $subject, $message, $header);

        $data = ["Mail send", $mail];
    }

    $json = json_encode($data);
    
    $json = isJsonValid($json);

    echo $json;


    function isJsonValid ($json){
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(["jsonError" => json_last_error_msg()]);
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError":"unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }

        return $json;
    }
?>




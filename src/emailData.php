<?php
if(isset($_POST['email'])) {
    PRINT($_POST);
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "robin.john.in@gmail.com";
    $email_subject = "A new score submission";
 
        
 
    $name = $_POST['name']; 
    $email_from = $_POST['email']; 
  
 
    
 
    $email_message = "Game Submission details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Score: ".clean_string($score)."\n";
    $email_message .= "Genre: ".clean_string($genre)."\n";
    $email_message .= "School: ".clean_string($school)."\n";
    $email_message .= "Group: ".clean_string($group)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
 
} else {
    // print("Error in data")
}

?>
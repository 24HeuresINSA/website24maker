<?php

$to = 'communication@24heures.org'; // Change your email address

$name = $_POST['form-name'];
$subject = $_POST['form-subject'];
$email = $_POST['form-email'];
$message = $_POST['form-message'];
$destinataire = $_POST['form-destinataire'];


// Email Submit
// Note: filter_var() requires PHP >= 5.2.0
 if ( isset($email) && isset($name) && isset($subject) && isset($message) && filter_var($email, FILTER_VALIDATE_EMAIL) ) {

  // detect & prevent header injections
  $test = "/(content-type|bcc:|cc:|to:)/i";
  foreach ( $_POST as $key => $val ) {
    if ( preg_match( $test, $val ) ) {
      exit;
    }
  }

$body = <<<EMAIL
subject : $subject
  
My name is, $name.

$message

From : $name
Email : $email

EMAIL;
  
  
$header = 'From: ' . $_POST["form-name"] . '<' . $_POST["form-email"] . '>' . "\r\n" .
    'Reply-To: ' . $_POST["form-email"] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

 mail($to, $subject, $body, $header);

}
?>
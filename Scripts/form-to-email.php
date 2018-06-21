<?php
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "solarcode2018@gmail.com";
    $email_subject = "Website Contact Enquiry";
    $SpamErrorMessage = "<p align=\"center\"><font color=\"red\">Malicious code content detected.
    </font><br><b>Your IP Number of <b>".getenv("REMOTE_ADDR")."</b> has been logged.</b></p>";
    $SpamReplaceText = "*content removed*";

    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }


    $email_from = $_POST['email']; // required
    $message = $_POST['message']; // not required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if (preg_match("/http/i", "$email")) {echo "$SpamErrorMessage"; exit();}
  if (preg_match("/http/i", "$message")) {echo "$SpamErrorMessage"; exit();}

  // Patterm match search to strip out the invalid charcaters, this prevents the mail injection spammer
  $pattern = '/(;|\||`|>|<|&|^|"|'."\n|\r|'".'|{|}|[|]|\)|\()/i'; // build the pattern match string

  $email = preg_replace($pattern, "", $email);
  $message = preg_replace($pattern, "", $message);

// Check for the injected headers from the spammer attempt
// This will replace the injection attempt text with the string you have set in the above config section
  $find = array("/bcc\:/i","/Content\-Type\:/i","/cc\:/i","/to\:/i");
  $email = preg_replace($find, "$SpamReplaceText", $email);
  $message = preg_replace($find, "$SpamReplaceText", $message);

  if(stristr($message, $SpamReplaceText) !== FALSE) {echo "$SpamErrorMessage"; exit();}

  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }

    $string_exp = "/^[A-Za-z .'-,a]+$/";

  if(strlen($message) < 2) {
    $error_message .= 'The message you entered do not appear to be valid.<br />';
  }

  if(strlen($error_message) > 0) {
    died($error_message);
  }

    $email_message = "Form details below.\n\n";


    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";


// create email headers
$headers .= 'From: '.$email_from."\r\n";
$headers .= 'Reply-To: '.$email_from."\r\n";
$headers .= 'Return-Path ' .$email_from."\r\n";
$headers .= "X-Priority: 3\r\n";
$headers .= "X-Mailer: PHP". phpversion() ."\r\n";
mail($email_to, $email_subject, $email_message, $headers);


?>

<!-- include your own success html here -->

Thank you for contacting us. We will be in touch with you very soon.

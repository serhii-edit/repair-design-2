<?php
  // Has Notice when input not filled, then Notice: index undefined (line of variable).
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$userQuestion = $_POST['userQuestion'];
  
  require "PHPMailer/Exception.php";
  require "PHPMailer/PHPMailer.php";
  require "PHPMailer/SMTP.php";
  
  //Create an instance; passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'mailsenderyak@gmail.com';                     //SMTP username
    $mail->Password   = 'Mailsender0101#';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('mailsenderyak@gmail.com', 'Repair Design');
    $mail->addAddress('m.serhiiyakymenko@gmail.com', 'Serhii Yakymenko');

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Repair Design Request';
    $mail->Body    = "
    <span style='display: block; max-width: 600px; margin: 0 auto;'>
    <h3 style='color: #000;'>Data of Requester</h3>
    <br />
    Name: <b>$userName</b>
    <br />
    Telephone-number: <b>$userPhone</b>
    <br />
    Email: <b>$userEmail</b>
    <br />
    Question: $userQuestion
    <br />
    <br />
    <a style='color: #000; text-decoration: none; cursor: pointer;' href='serhii-yakymenko.zzz.com.ua/webs/repair-design-2'>Sent from: <b>serhii-yakymenko.zzz.com.ua/webs/repair-design-2</b></a>
    </span>
    ";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if ( $mail->send() ) {
      echo "Submited";
    } else {
      echo "Not submited, error exist. Erorr code: $mail->ErrorInfo";
    }
} catch (Exception $e) {
    echo "Not submited, error exist. Erorr code: $mail->ErrorInfo";
}

?>
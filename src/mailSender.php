<?php
  
  
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];

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
    $mail->SMTPSecure = ssl;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('m.serhiiyakymenko@gmail.com', 'Serhii Yakymenko');
    $mail->addAddress('m.serhiiyakymenko@gmail.com', 'Serhii Yakymenko'); 
    $mail->addAddress($userEmail, 'Repair Design'); 

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Repair Design Request';
    $mail->Body    = "
    <h3/>Data of Requester</h3><br><br>
    Name: <b>$userName</b><br />
    Telephone-number: <b>$userPhone</b><br />
    Email: <b>$userEmail</b><br />

    <a href='serhii-yakymenko.zzz.com.ua/webs/repair-design-2'>Sent from serhii-yakymenko.zzz.com.ua/webs/repair-design-2/</a>
    ";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>
<?php

	require 'MailSender.php';

	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		$response = array(
			'status' => 'fail',
			'errors' => null
		);

		extract($_POST);

		$subject = 'Gatsby Contact Form';
		$message = '';

		if(isset($cf_name)) $message .= 'Name: ' . $cf_name . "\r\n";
		if(isset($cf_email)) $message .= 'Email: ' . $cf_email . "\r\n";
		if(isset($cf_service)) $message .= 'Service: ' . $cf_service . "\r\n";
		if(isset($cf_phone)) $message .= 'Phone: ' . $cf_phone . "\r\n";
		if(isset($cf_message)) $message .= 'Message: ' . $cf_message;

		try{

			$sender = new Gatsby\MailSender(array(
				'email' => 'gatsbycompanyname@mail.com',
				'headers' => array(
					'From' => 'gatsby@gatsby.com',
					'Reply-To' => 'gatsby@gatsby.com',
					'X-Mailer' => 'PHP'
				)
			));

			if($sender->send($message, $subject)){

				$response['status'] = 'success';
				$response['statusText'] = 'Your mail has been successfully sent!';

			}
			else{
				$response['errors'] = $sender->getErrorsList();
			}

		}
		catch(Exception $e){

			$response['errors'] = $e->getMessage();

		}

		echo json_encode($response);

	}

?>
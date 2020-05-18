<?php

	require 'MailSender.php';

	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		$response = array(
			'status' => 'fail',
			'errors' => null
		);

		extract($_POST);

		$subject = 'Gatsby Subscribe Form';
		$message = '';

		$message .= 'Email: ' . $subscribe_email . "\r\n";

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
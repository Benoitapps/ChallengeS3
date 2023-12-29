<?php

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsEventListener()]
class ForgotPasswordListener
{
    public function __construct(private MailerInterface $mailer)
    {
    }

    public function __invoke(CheckPassportEvent $event): void
    {
        $passport = $event->getPassport();
        $user = $passport->getUser();

        if (!$user instanceof User) {
            return;
        }

        $email = new Email();
        $email->to($user->getEmail());
        $email->subject('Forgot Password');
        $email->html('<p>Your reset token: ' . $user->getResetToken() . '</p>');
        // $email->context([
        //     'token' => $user->getResetToken(),
        // ]);

        $this->mailer->send($email);
    }
}


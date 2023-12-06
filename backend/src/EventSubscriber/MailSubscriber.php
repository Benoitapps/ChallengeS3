<?php
// api/src/EventSubscriber/MailSubscriber.php

namespace App\EventSubscriber;

// use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Book;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class MailSubscriber implements EventSubscriberInterface
{
    private $mailer;

    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(GetResponseForControllerResultEvent $event)
    {
        $book = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$book instanceof Book || Request::METHOD_POST !== $method) {
            return;
        }

        $message = (new \Swift_Message('A new book has been added'))
            ->setFrom('system@example.com')
            ->setTo('contact@les-tilleuls.coop')
            ->setBody(sprintf('The book #%d has been added.', $book->getId()));

        $this->mailer->send($message);
    }

    static function sendMail(string $emailTo, string $subject, string $content)
    {
        $emailTo = $_ENV['EMAIL_TO'];
        $config = \SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', $_ENV['SENDINBLUE_API_KEY']);

        $apiInstance = new \SendinBlue\Client\Api\TransactionalEmailsApi(
            new \GuzzleHttp\Client(),
            $config
        );

        $sendSmtpEmail = new \SendinBlue\Client\Model\SendSmtpEmail(); 
        $sendSmtpEmail['to'] = [
            [
                'email' => $emailTo,
            ]
        ];
        $sendSmtpEmail['subject'] = $subject;
        $sendSmtpEmail['htmlContent'] = $content;
        $sendSmtpEmail['sender'] = [
            'email'=>'no-reply@challenge.com',
            'name'=>'Challenge'
        ];

        try {
            $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            echo 'Exception when calling AccountApi->getAccount: ', $e->getMessage(), PHP_EOL;
        }
    }
}
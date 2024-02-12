<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Resend;
use Symfony\Component\Routing\RouterInterface;


final class UserMail implements EventSubscriberInterface
{

    private EntityManagerInterface $entityManager;
    private RouterInterface $router;

    public function __construct(EntityManagerInterface $entityManager , RouterInterface $router)
    {
        $this->entityManager = $entityManager;
        $this->router = $router;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['sendMailUser', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMailUser(ViewEvent $event): void
    {
        $book = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$book instanceof User || (Request::METHOD_POST !== $method)) {
            return;
        }

        //POST
        if ($book instanceof User && (Request::METHOD_POST == $method)) {

            $requestData = json_decode($event->getRequest()->getContent(), true);

            $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');

            if ($requestData['email'] !== null) {
                $emailClient = $requestData['email'];

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => 'tionebrien@gmail.com',
                    'subject' => "Inscription",
                    'html' => 'Merci pour votre inscription' . $emailClient,
                ]);
            }
        }
    }

}
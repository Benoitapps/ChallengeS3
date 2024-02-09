<?php
// api/src/EventSubscriber/BookMailSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Client;
use App\Entity\Slot;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Resend;
use App\Entity\Coach;
use Symfony\Component\Routing\RouterInterface;


final class EventMail implements EventSubscriberInterface
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
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],

        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $book = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$book instanceof Slot || (Request::METHOD_POST !== $method && Request::METHOD_PATCH !== $method && Request::METHOD_DELETE !== $method)) {
            return;
        }

        //POST
        if ($book instanceof Slot && (Request::METHOD_POST == $method)) {


            $requestData = json_decode($event->getRequest()->getContent(), true);

            $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');

            if ($requestData['coach'] !== null) {
                $providedCoachId = basename($requestData['coach']);
                $coach = $this->entityManager->getRepository(Coach::class)->find($providedCoachId);
                $resCoach = $coach->getAuth()->getEmail();
                $nameCoach = $coach->getAuth()->getFirstName();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resCoach,
                    'subject' => "Reservation de cours",
                    'html' => 'Vous avez une réservation de cours de sport du ' . $requestData['startDate'] . ' au ' . $requestData['endDate'],
                ]);
            }

            if ($requestData['client'] !== null) {
                $providedClientId = basename($requestData['client']);
                $client = $this->entityManager->getRepository(Client::class)->find($providedClientId);
                $resClient = $client->getAuth()->getEmail();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resClient,
                    'subject' => "Reservation de cours",
                    'html' => 'Vous avez reserver un cours de cours de sport le ' . $requestData['startDate'] . ' au ' . $requestData['endDate'] . ' avec le coach ' . $nameCoach,
                ]);
            }
        }

        //PATCH
        if ($book instanceof Slot && (Request::METHOD_PATCH == $method)) {

            $requestData = json_decode($event->getRequest()->getContent(), true);
            $uri = $event->getRequest()->getRequestUri();
            $slotId = $this->extractSlotIdFromUri($uri);

            $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');

            if ($slotId !== null) {

                $coach = $this->entityManager->getRepository(Slot::class)->find($slotId)->getCoach();
                $resCoach = $coach->getAuth()->getEmail();
                $nameCoach = $coach->getAuth()->getFirstName();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resCoach,
                    'subject' => "Modification de cours",
                    'html' => 'Vous avez modifier la réservation de cours de sport au ' . $requestData['startDate'] . ' au ' . $requestData['endDate'],
                ]);


                $client = $this->entityManager->getRepository(Slot::class)->find($slotId)->getClient();
                $resClient = $client->getAuth()->getEmail();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resClient,
                    'subject' => "Modification de cours",
                    'html' => 'Votre client a modifier la date de votre cours au : ' . $requestData['startDate'] . ' au ' . $requestData['endDate'] . ' avec le coach ' . $nameCoach,
                ]);
            }
        }
        //DELETE
        if ($book instanceof Slot && (Request::METHOD_DELETE == $method)) {

            $requestData = json_decode($event->getRequest()->getContent(), true);
            $uri = $event->getRequest()->getRequestUri();
            $slotId = $this->extractSlotIdFromUri($uri);

            $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');

            if ($slotId !== null) {

                $coach = $this->entityManager->getRepository(Slot::class)->find($slotId)->getCoach();
                $resCoach = $coach->getAuth()->getEmail();
                $nameCoach = $coach->getAuth()->getFirstName();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resCoach,
                    'subject' => "Annulation de cours",
                    'html' => 'Votre cours du ' . $requestData['startDate'] . ' au ' . $requestData['endDate'] . ' a été annulé',
                ]);


                $client = $this->entityManager->getRepository(Slot::class)->find($slotId)->getClient();
                $resClient = $client->getAuth()->getEmail();

                $resend->emails->send([
                    'from' => 'mycoach@mycoach.bendc.site',
                    'to' => '' . $resClient,
                    'subject' => "Annulation de cours",
                    'html' => 'Votre cours du ' . $requestData['startDate'] . ' au ' . $requestData['endDate'] . ' a été annulé',
                ]);
            }
        }




    }
    private function extractSlotIdFromUri(string $uri): ?int
    {
        $parameters = $this->router->match($uri);
        return $parameters['id'] ?? null;
    }
}
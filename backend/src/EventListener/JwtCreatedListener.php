<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedListener
{
    public function onJwtCreated(JWTCreatedEvent $event)
    {
        // Récupérez l'utilisateur depuis l'événement
        $user = $event->getUser();

        // Ajoutez des informations supplémentaires dans le payload
        $payload = $event->getData();
        $payload['user_id'] = $user->getId();
        $payload['exp_jwt'] = (new \DateTime())->modify('+2 hours')->getTimestamp() * 1000;

        // Ajoutez d'autres informations selon vos besoins

        $event->setData($payload);
    }
}
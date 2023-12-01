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
        // Ajoutez d'autres informations selon vos besoins

        $event->setData($payload);
    }
}
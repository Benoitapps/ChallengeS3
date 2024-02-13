<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\Prestation;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\SecurityBundle\Security;

class PrestationCreationSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents(): array
    {
        return [
                KernelEvents::VIEW => ['attachFranchiseToPrestation', EventPriorities::PRE_WRITE],
        ];
    }

    public function attachFranchiseToPrestation(ViewEvent $event): void
    {
        $prestation = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$prestation instanceof Prestation || Request::METHOD_POST !== $method) {
            return;
        }

        $data = json_decode($event->getRequest()->getContent(), true);
        $franchiseId = $data['franchiseId'] ?? null;
        if (!$franchiseId) {
            throw new \Exception('Franchise ID is not provided');
        }
    
        $franchise = $this->entityManager->getRepository(Franchise::class)->find($franchiseId);
    
        if (!$franchise) {
            throw new \Exception('Franchise not found');
        }
    
        $prestation->setFranchise($franchise);
    
        if (!$prestation->getFranchise()) {
            throw new \Exception('Franchise is not set');
        }
        
    }

}
<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Company;
use App\Entity\Manager;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\SecurityBundle\Security;

class CompanyCreationSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['attachManagerToCompany', EventPriorities::PRE_WRITE],
        ];
    }

    public function attachManagerToCompany(ViewEvent $event): void
    {
        $company = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // Check if the request is a POST request and the entity is a Company
        if (!$company instanceof Company || Request::METHOD_POST !== $method) {
            return;
        }

        // Check if a manager is provided in the request body
        $requestData = json_decode($event->getRequest()->getContent(), true);
        $providedManagerUri = $requestData['manager'] ?? null;

        // If a manager is provided, retrieve the Manager entity from the URI
        if ($providedManagerUri) {
            $providedManagerId = basename($providedManagerUri);
            $providedManager = $this->entityManager->getRepository(Manager::class)->find($providedManagerId);

            // Check if the provided manager exists
            if (!$providedManager) {
                return;
            }

            // Attach the provided manager to the company
            $company->setManager($providedManager);

            return;
        }

        // Get the current user from the security context
        $user = $this->security->getUser();

        // Check if the user is logged in
        if (!$user) {
            return;
        }

        // Get the manager entity associated with the user
        $manager = $user->getManager();

        // Check if the manager exists
        if (!$manager) {
            return;
        }

        // Attach the manager to the company
        $company->setManager($manager);
    }

}
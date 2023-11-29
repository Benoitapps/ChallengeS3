<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Company;
use App\Entity\Franchise;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\SecurityBundle\Security;

class FranchiseCreationSubscriber implements EventSubscriberInterface
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
            KernelEvents::VIEW => ['attachCompanyToFranchise', EventPriorities::PRE_WRITE],
        ];
    }

    public function attachCompanyToFranchise(ViewEvent $event): void
    {
        $franchise = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // Check if the request is a POST request and the entity is a Franchise
        if (!$franchise instanceof Franchise || Request::METHOD_POST !== $method) {
            return;
        }

        // Check if a company is provided in the request body
        $requestData = json_decode($event->getRequest()->getContent(), true);
        $providedCompanyUri = $requestData['company'] ?? null;

        // If a company is provided, retrieve the Company entity from the URI
        if ($providedCompanyUri) {
            $providedCompanyId = basename($providedCompanyUri);
            $providedCompany = $this->entityManager->getRepository(Company::class)->find($providedCompanyId);

            // Check if the provided company exists
            if (!$providedCompany) {
                return;
            }

            // Attach the provided company to the franchise
            $franchise->setCompany($providedCompany);

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

        // Get the company entity associated with the manager
        $company = $manager->getCompany();

        // Check if the company exists
        if (!$company) {
            return;
        }

        // Attach the company to the franchise
        $franchise->setCompany($company);
    }

}
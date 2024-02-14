<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ManagerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/managers-without-company',
            normalizationContext: ['groups' => ['manager:admin:read']],
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Get(
            normalizationContext: ['groups' => ['manager:read']],
            security: 'is_granted("ROLE_ADMIN") or (object.getAuth() === user and is_granted("ROLE_MANAGER"))',
        ),
        new Get(
            uriTemplate: '/managers/{id}/stats/coach',
            normalizationContext: ['groups' => ['stat:coach:read']],
        ),
        new Get(
            uriTemplate: '/managers/{id}/stats/prestation',
            normalizationContext: ['groups' => ['stat:prestation:read']],
        ),
        new Get(
            uriTemplate: '/managers/{id}/stats/reservation',
            normalizationContext: ['groups' => ['stat:reservation:read']],
        ),
        new Get(
            uriTemplate: '/managers/{id}/stats/money',
            normalizationContext: ['groups' => ['stat:money:read']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['manager:write']],
        ),
        new Delete(),
        new Patch(
            denormalizationContext: ['groups' => ['manager:update']],
            security: 'is_granted("ROLE_ADMIN") or (object.getAuth() === user and is_granted("ROLE_MANAGER"))',
        ),
    ],
)]
#[ORM\Entity(repositoryClass: ManagerRepository::class)]
class Manager
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'manager:admin:read', 'manager:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'manager', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['company:read', 'manager:write','stat:admin:read', 'manager:admin:read', 'manager:update', 'manager:read'])]
    private ?User $auth = null;

    #[Groups(['stat:coach:read','stat:prestation:read','stat:reservation:read','stat:money:read','stat:admin:read', 'manager:admin:read'])]
    #[ORM\OneToOne(mappedBy: 'manager', cascade: ['persist', 'remove'])]
    private ?Company $company = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuth(): ?User
    {
        return $this->auth;
    }

    public function setAuth(User $auth): static
    {
        $this->auth = $auth;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(Company $company): static
    {
        // set the owning side of the relation if necessary
        if ($company->getManager() !== $this) {
            $company->setManager($this);
        }

        $this->company = $company;

        return $this;
    }
}

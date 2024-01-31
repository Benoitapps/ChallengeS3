<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
//            juste pour tester, à supprimer ensuite
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Get(
            uriTemplate: 'companies/myCompany',
            normalizationContext: ['groups' => ['company:read:myCompany']],
            security: "is_granted('ROLE_MANAGER')",
            name: 'GetMyCompany',
        ),
        new Get(
            normalizationContext: ['groups' => ['company:read']],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Post(
            denormalizationContext: ['groups' => ['company:write']],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Delete(),
        new Patch(
            denormalizationContext: ['groups' => ['company:update']],
        ),
        new Patch(
            denormalizationContext: [
                'groups' => ['company:admin:update']
            ],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new GetCollection(
            shortName: "StatAdmin",
            security: "is_granted('ROLE_ADMIN')",
            uriTemplate: '/admin/stats/all',
            normalizationContext: ['groups' => ['stat:admin:read']],
        ),
    ],
//    normalizationContext: ['groups' => ['company:read','company:read:user-is-logged']],
//    denormalizationContext: ['groups' => ['company:write']],
    security: "is_granted('ROLE_ADMIN')",
)]

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['manager:admin:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:write', 'franchise:read', 'company:read:myCompany','stat:admin:read', 'company:admin:update'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
//    #[Groups(['company:read:user-is-logged', 'company:write'])]
    #[Groups(['company:read', 'company:write', 'company:read:myCompany', 'company:admin:update'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
//    #[Groups(['company:read:user-is-logged', 'company:write'])]
    #[Groups(['company:read', 'company:write'])]
    private ?string $kbis = null;

    #[ORM\Column]
    #[Groups(['company:read', 'company:write', 'company:read:myCompany', 'company:admin:update'])]
    private ?bool $isVerified = false;

    #[ORM\OneToOne(inversedBy: 'company', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
//    #[Groups(['company:read:user-is-logged', 'company:write'])]
    #[Groups(['company:read', 'company:write','stat:admin:read'])]
    private ?Manager $manager = null;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Franchise::class, orphanRemoval: true)]
    #[Groups(['company:read','stat:coach:read','stat:prestation:read','stat:reservation:read','stat:money:read','stat:admin:read'])]
    private Collection $franchises;

    public function __construct()
    {
        $this->franchises = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getManager(): ?Manager
    {
        return $this->manager;
    }

    public function setManager(Manager $manager): static
    {
        $this->manager = $manager;

        return $this;
    }

    /**
     * @return Collection<int, Franchise>
     */
    public function getFranchises(): Collection
    {
        return $this->franchises;
    }

    public function addFranchise(Franchise $franchise): static
    {
        if (!$this->franchises->contains($franchise)) {
            $this->franchises->add($franchise);
            $franchise->setCompany($this);
        }

        return $this;
    }

    public function removeFranchise(Franchise $franchise): static
    {
        if ($this->franchises->removeElement($franchise)) {
            // set the owning side to null (unless already changed)
            if ($franchise->getCompany() === $this) {
                $franchise->setCompany(null);
            }
        }

        return $this;
    }
}

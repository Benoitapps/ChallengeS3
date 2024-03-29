<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\PrestationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Post(
            denormalizationContext: [
                'groups' => ['prestation:write']
            ],
            security: "is_granted('ROLE_MANAGER')",
        ),
        new Get(
            normalizationContext: [
                'groups' => [
                    'prestation:read',
                ],
            ],
        ),
        new Patch(
            denormalizationContext: [
                'groups' => ['prestation:update']
            ],
            security: "is_granted('ROLE_MANAGER') and object.getFranchise().getCompany().getManager().getAuth().getId() === user.getId()",
        )
    ]
)]
#[ORM\Entity(repositoryClass: PrestationRepository::class)]
class Prestation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['slot:read', 'franchise:read', 'coach:read','slot:history:read:collection', 'franchise:prestations-list', 'coach-prestation:link'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['slot:read', 'slot:read:collection', 'prestation:write', 'prestation:read', 'coach:read:slots', 'company:read:franchise', 'franchise:read', 'coach:read','slot:history:read:collection','stat:prestation:read','prestation:update', 'franchise:prestations-list'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['prestation:write', 'prestation:read','prestation:update', 'franchise:prestations-list'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[Groups(['prestation:write', 'prestation:read', 'franchise:read', 'coach:read','stat:money:read','stat:admin:read','prestation:update', 'company:read:franchise', 'franchise:prestations-list'])]
    #[ORM\Column]
    private ?float $price = null;

    #[Groups(['prestation:write', 'prestation:read', 'franchise:read'])]
    #[ORM\ManyToMany(targetEntity: Coach::class, inversedBy: 'prestations')]
    private Collection $coach; // ! to change to coachs

    #[Groups(['prestation:write', 'coach:read'])]
    #[ORM\ManyToOne(inversedBy: 'prestations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Franchise $franchise = null;

    #[Groups(['prestation:write','stat:prestation:read','stat:money:read','stat:admin:read'])]
    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Slot::class)]
    private Collection $slots;

    public function __construct()
    {
        $this->coach = new ArrayCollection();
        $this->slots = new ArrayCollection();
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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Coach>
     */
    public function getCoach(): Collection
    {
        return $this->coach;
    }

    public function addCoach(Coach $coach): static
    {
        if (!$this->coach->contains($coach)) {
            $this->coach->add($coach);
        }

        return $this;
    }

    public function removeCoach(Coach $coach): static
    {
        $this->coach->removeElement($coach);

        return $this;
    }

    public function getFranchise(): ?Franchise
    {
        return $this->franchise;
    }

    public function setFranchise(?Franchise $franchise): static
    {
        $this->franchise = $franchise;

        return $this;
    }

    /**
     * @return Collection<int, Slot>
     */
    public function getSlots(): Collection
    {
        return $this->slots;
    }

    public function addSlot(Slot $slot): static
    {
        if (!$this->slots->contains($slot)) {
            $this->slots->add($slot);
            $slot->setPrestation($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getPrestation() === $this) {
                $slot->setPrestation(null);
            }
        }

        return $this;
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\GetCollection;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['client:read:collection']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Get(
            normalizationContext: ['groups' => ['client:read']],
            security: "is_granted('ROLE_COACH')"
        ),
    ],
)]

#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['slot:read','user:read','coach:read','slot:history:read:collection', 'client:read:collection'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['client:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[Groups(['client:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $city = null;

    #[Groups(['client:read'])]
    #[ORM\Column(length: 5, nullable: true)]
    private ?string $zip_code = null;

    #[Groups(['slot:read','coach:read', 'client:read', 'slot:history:read:collection'])]
    #[ORM\OneToOne(inversedBy: 'client', cascade: ['persist', 'remove'])]
    private ?User $auth = null;

    #[Groups(['client:read'])]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: ReviewClient::class)]
    private Collection $reviewClients;

    #[Groups(['coach:read', 'client:read'])]
    private ?float $rating = null;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: ReviewCoach::class)]
    private Collection $reviewCoaches;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Slot::class)]
    private Collection $slots;

    public function __construct()
    {
        $this->reviewClients = new ArrayCollection();
        $this->reviewCoaches = new ArrayCollection();
        $this->slots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    public function setZipCode(?string $zip_code): static
    {
        $this->zip_code = $zip_code;

        return $this;
    }

    public function getAuth(): ?User
    {
        return $this->auth;
    }

    public function setAuth(?User $auth): static
    {
        // unset the owning side of the relation if necessary
        if ($auth === null && $this->auth !== null) {
            $this->auth->setClient(null);
        }

        // set the owning side of the relation if necessary
        if ($auth !== null && $auth->getClient() !== $this) {
            $auth->setClient($this);
        }

        $this->auth = $auth;

        return $this;
    }

    /**
     * @return Collection<int, ReviewClient>
     */
    public function getReviewClients(): Collection
    {
        return $this->reviewClients;
    }

    public function addReviewClient(ReviewClient $reviewClient): static
    {
        if (!$this->reviewClients->contains($reviewClient)) {
            $this->reviewClients->add($reviewClient);
            $reviewClient->setClient($this);
        }

        return $this;
    }

    public function removeReviewClient(ReviewClient $reviewClient): static
    {
        if ($this->reviewClients->removeElement($reviewClient)) {
            // set the owning side to null (unless already changed)
            if ($reviewClient->getClient() === $this) {
                $reviewClient->setClient(null);
            }
        }

        return $this;
    }

    public function getRating(): ?float
    {
        $sum = 0;
        foreach ($this->reviewClients as $reviewClient) {
            $sum += $reviewClient->getNote();
        }
        if(count($this->reviewClients) === 0){
            return 0;
        } else {
            $this->rating = round($sum / count($this->reviewClients), 1);
            return $this->rating;
        }
    }

    /**
     * @return Collection<int, ReviewCoach>
     */
    public function getReviewCoaches(): Collection
    {
        return $this->reviewCoaches;
    }

    public function addReviewCoach(ReviewCoach $reviewCoach): static
    {
        if (!$this->reviewCoaches->contains($reviewCoach)) {
            $this->reviewCoaches->add($reviewCoach);
            $reviewCoach->setClient($this);
        }

        return $this;
    }

    public function removeReviewCoach(ReviewCoach $reviewCoach): static
    {
        if ($this->reviewCoaches->removeElement($reviewCoach)) {
            // set the owning side to null (unless already changed)
            if ($reviewCoach->getClient() === $this) {
                $reviewCoach->setClient(null);
            }
        }

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
            $slot->setClient($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getClient() === $this) {
                $slot->setClient(null);
            }
        }

        return $this;
    }
}

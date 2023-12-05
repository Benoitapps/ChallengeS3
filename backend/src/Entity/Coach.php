<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CoachRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(

    operations: [
        new Post(
            denormalizationContext: ['groups' => ['coach:write']],
        ),
        new Get(
            normalizationContext: ['groups' => ['coach:read']],
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['coach:read']],
        ),
        new Patch(
            denormalizationContext: ['groups' => ['coach:write']],
        ),

        new Get(
            uriTemplate: '/coaches/slots/{id}',
            normalizationContext: [
                'groups' => ['coach:read:slots']
            ]
        ),
        new Get(
            uriTemplate: '/coaches/shedules/{id}',
            normalizationContext: [
                'groups' => ['coach:read:shedules']
            ]
        ),
    ]


)]
#[ORM\Entity(repositoryClass: CoachRepository::class)]
class Coach
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['schedule:read', 'schedule:write','slot:read', 'franchise:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $biography = null;

    #[Groups(['slot:read', 'coach:read', 'prestation:read', 'company:read:franchise', 'franchise:read'])]
    #[ORM\OneToOne(inversedBy: 'coach', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $auth = null;

    #[ORM\ManyToOne(inversedBy: 'coachs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Franchise $franchise = null;

    #[Groups(['coach:read','coach:read:shedules'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Schedule::class)]
    private Collection $schedules;

    #[Groups(['coach:read'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: ReviewClient::class)]
    private Collection $reviewClients;

    #[Groups(['coach:read'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: ReviewCoach::class)]
    private Collection $reviewCoaches;

    #[Groups(['coach:read'])]
    private ?float $rating = null;

    #[Groups(['coach:read'])]
    #[ORM\ManyToMany(targetEntity: Prestation::class, mappedBy: 'coach')]
    private Collection $prestations;

    #[Groups(['coach:read'])]
    #[ORM\ManyToMany(targetEntity: TimeOff::class, mappedBy: 'coachs')]
    private Collection $timeOffs;


    #[Groups(['coach:read','coach:read:slots'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Slot::class)]
    private Collection $slots;

    public function __construct()
    {
        $this->schedules = new ArrayCollection();
        $this->reviewClients = new ArrayCollection();
        $this->reviewCoaches = new ArrayCollection();
        $this->prestations = new ArrayCollection();
        $this->timeOffs = new ArrayCollection();
        $this->slots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): static
    {
        $this->biography = $biography;

        return $this;
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
     * @return Collection<int, Schedule>
     */
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedule $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setCoach($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getCoach() === $this) {
                $schedule->setCoach(null);
            }
        }

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
            $reviewClient->setCoach($this);
        }

        return $this;
    }

    public function removeReviewClient(ReviewClient $reviewClient): static
    {
        if ($this->reviewClients->removeElement($reviewClient)) {
            // set the owning side to null (unless already changed)
            if ($reviewClient->getCoach() === $this) {
                $reviewClient->setCoach(null);
            }
        }

        return $this;
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
            $reviewCoach->setCoach($this);
        }

        return $this;
    }

    public function removeReviewCoach(ReviewCoach $reviewCoach): static
    {
        if ($this->reviewCoaches->removeElement($reviewCoach)) {
            // set the owning side to null (unless already changed)
            if ($reviewCoach->getCoach() === $this) {
                $reviewCoach->setCoach(null);
            }
        }

        return $this;
    }

    public function getRating(): ?float
    {
        $sum = 0;
        foreach ($this->reviewCoaches as $reviewCoach) {
            $sum += $reviewCoach->getNote();
        }
        if(count($this->reviewCoaches) === 0){
            return 0;
        } else {
            $this->rating = round($sum / count($this->reviewCoaches), 1);
            return $this->rating;
        }
    }

    /**
     * @return Collection<int, Prestation>
     */
    public function getPrestations(): Collection
    {
        return $this->prestations;
    }

    public function addPrestation(Prestation $prestation): static
    {
        if (!$this->prestations->contains($prestation)) {
            $this->prestations->add($prestation);
            $prestation->addCoach($this);
        }

        return $this;
    }

    public function removePrestation(Prestation $prestation): static
    {
        if ($this->prestations->removeElement($prestation)) {
            $prestation->removeCoach($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, TimeOff>
     */
    public function getTimeOffs(): Collection
    {
        return $this->timeOffs;
    }

    public function addTimeOff(TimeOff $timeOff): static
    {
        if (!$this->timeOffs->contains($timeOff)) {
            $this->timeOffs->add($timeOff);
            $timeOff->addCoach($this);
        }

        return $this;
    }

    public function removeTimeOff(TimeOff $timeOff): static
    {
        if ($this->timeOffs->removeElement($timeOff)) {
            $timeOff->removeCoach($this);
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
            $slot->setCoach($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getCoach() === $this) {
                $slot->setCoach(null);
            }
        }

        return $this;
    }
}

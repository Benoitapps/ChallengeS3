<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CoachRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['coach:read']],
    denormalizationContext: ['groups' => ['coach:write']],
)]
#[ORM\Entity(repositoryClass: CoachRepository::class)]
class Coach
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['schedule:read', 'schedule:write'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $biography = null;

    #[ORM\OneToOne(inversedBy: 'coach', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $auth = null;

    #[ORM\ManyToOne(inversedBy: 'coachs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Franchise $franchise = null;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Schedule::class)]
    private Collection $schedules;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: ReviewClient::class)]
    private Collection $reviewClients;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: ReviewCoach::class)]
    private Collection $reviewCoaches;

    #[ORM\ManyToMany(targetEntity: Prestation::class, mappedBy: 'coach')]
    private Collection $prestations;

    #[ORM\ManyToMany(targetEntity: TimeOff::class, mappedBy: 'coachs')]
    private Collection $timeOffs;

    public function __construct()
    {
        $this->schedules = new ArrayCollection();
        $this->reviewClients = new ArrayCollection();
        $this->reviewCoaches = new ArrayCollection();
        $this->prestations = new ArrayCollection();
        $this->timeOffs = new ArrayCollection();
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
}

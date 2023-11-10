<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Filter\CustomSlotDateFilter;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
    new GetCollection(
        normalizationContext: [
            'groups' => ['slot:read:collection']
        ]
    ),
    new Get(
        normalizationContext: [
            'groups' => ['slot:read']
        ]
    ),
    new Post(
        denormalizationContext: [
            'groups' => ['slot:write']
        ]
    ),
    new Patch(
        normalizationContext: [
            'groups' => ['slot:update']
        ]
    ),
    new Get(
        uriTemplate: '/grimoire/{id}',
        requirements: ['id' => '\d+'],

    ),
//    new GetCollectionByCoach(
//        path: '/slots/coach/{id}',
//        methods: ['GET'],
//        controller: GetCollectionByCoachAction::class,
//    )
],
)]
#[ORM\Entity(repositoryClass: SlotRepository::class)]
class Slot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    private ?\DateTimeInterface $customStartDate = null;

    private ?\DateTimeInterface $customEndDate = null;

//    #[ApiFilter(CustomSlotDateFilter::class)]
    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Prestation $prestation = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?TimeOff $time_off = null;

    #[Groups(['slot:read','slot:read:collection','slot:read:collection','slot:write','slot:update','coach:read'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Client $client = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Coach $coach = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getCustomStartDate(): ?\DateTimeInterface
    {
        return $this->customStartDate;
    }

    /**
     * @param \DateTimeInterface|null $customStartDate
     */
    public function setCustomStartDate(?\DateTimeInterface $customStartDate): void
    {
        $this->customStartDate = $customStartDate;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getCustomEndDate(): ?\DateTimeInterface
    {
        return $this->customEndDate;
    }

    /**
     * @param \DateTimeInterface|null $customEndDate
     */
    public function setCustomEndDate(?\DateTimeInterface $customEndDate): void
    {
        $this->customEndDate = $customEndDate;
    }



    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getPrestation(): ?Prestation
    {
        return $this->prestation;
    }

    public function setPrestation(?Prestation $prestation): static
    {
        $this->prestation = $prestation;

        return $this;
    }

    public function getTimeOff(): ?TimeOff
    {
        return $this->time_off;
    }

    public function setTimeOff(?TimeOff $time_off): static
    {
        $this->time_off = $time_off;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getCoach(): ?Coach
    {
        return $this->coach;
    }

    public function setCoach(?Coach $coach): static
    {
        $this->coach = $coach;

        return $this;
    }
}

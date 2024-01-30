<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilterSecurity;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Filter\CustomSlotDateFilter;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Coach;
use App\Entity\Schedule;
use App\Validator\ContainsSlot as ContainsSlotConstraint;



#[ApiResource(
    operations: [
    new GetCollection(
        paginationItemsPerPage: 50,
        security: "is_granted('ROLE_USER')",
        normalizationContext: [
            'groups' => ['slot:read:collection']
        ]
    ),
    new GetCollection(
        order: ['startDate' => 'DESC'],
        paginationItemsPerPage: 8,
        security: "is_granted('ROLE_USER')",
        uriTemplate: '/slots/history',
        normalizationContext: [
            'groups' => ['slot:history:read:collection']
        ]
    ),
    new Get(
        security: "is_granted('ROLE_USER')",
        normalizationContext: [
            'groups' => ['slot:read']
        ]
    ),
    new Post(
        security: "is_granted('ROLE_USER')",
        denormalizationContext: [
            'groups' => ['slot:write']
        ]
    ),
    new Patch(
        security: "is_granted('ROLE_USER')",
        denormalizationContext: [
            'groups' => ['slot:update']
        ]
    ),
    new Delete()

],
)]
#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[UniqueEntity(fields: ['startDate','endDate','coach'], message: 'Ce créneau est déjà pris')]
class Slot
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['slot:read:collection','slot:read','coach:read:slots','slot:history:read:collection'])]
    private ?int $id = null;

    #[ApiFilter(DateFilter::class)]
    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read:slots','slot:history:read:collection'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\GreaterThan('today')]
//    #[ContainsSlotConstraint]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read:slots','slot:history:read:collection'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','coach:read:slots','slot:history:read:collection','stat:admin:read'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Prestation $prestation = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','coach:read:slots','slot:history:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?TimeOff $time_off = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:history:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Client $client = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:history:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Coach $coach = null;

    public function getId(): ?int
    {
        return $this->id;
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

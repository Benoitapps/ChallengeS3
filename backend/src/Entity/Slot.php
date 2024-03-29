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
use App\Controller\SlotVacationController;



#[ApiResource(
    normalizationContext:['groups' => ['slot:vide']],
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
        security: "(is_granted('ROLE_CLIENT') and object.getClient() === user.getClient()) or (is_granted('ROLE_COACH') and object.getCoach() === user.getCoach())",
        normalizationContext: [
            'groups' => ['slot:read']
        ],
    ),
    new Post(
        denormalizationContext: [
            'groups' => ['slot:write']
        ],
        security: "is_granted('ROLE_CLIENT')",
    ),
//    new Post(
//        uriTemplate: '/slots/vacation',
//        controller: SlotVacationController::class,
//        security: "is_granted('ROLE_MANAGER')",
//        denormalizationContext: [
//            'groups' => ['slot:vacation:write']
//        ]),

    new Patch(
        security: "(is_granted('ROLE_USER') and object.getClient() === user.getClient()) ",
        denormalizationContext: [
            'groups' => ['slot:update']
        ]
    ),
    new Delete(
        security: "(is_granted('ROLE_USER') and object.getClient() === user.getClient()) or (is_granted('ROLE_COACH') and object.getCoach() === user.getCoach())",
    )

],
)]
#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[UniqueEntity(fields: ['startDate','endDate','coach'], message: 'Ce créneau est déjà pris')]
#[ContainsSlotConstraint]
class Slot
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['slot:read:collection','slot:read','coach:read:slots','slot:history:read:collection'])]
    private ?int $id = null;

    #[ApiFilter(DateFilter::class)]
    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read:slots','slot:history:read:collection','slot:vacation:write'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\GreaterThan('today')]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:update','coach:read:slots','slot:history:read:collection','slot:vacation:write'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','coach:read:slots','slot:history:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Prestation $prestation = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:history:read:collection'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Client $client = null;

    #[Groups(['slot:read','slot:read:collection','slot:write','slot:history:read:collection','slot:vacation:write'])]
    #[ORM\ManyToOne(inversedBy: 'slots')]
    private ?Coach $coach = null;

    #[Groups(['slot:read','slot:read:collection','slot:write'])]
    #[ORM\Column(type: Types::BOOLEAN, nullable: false, options: ['default' => false])]
    private ?bool $vacation = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

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

        $this->date = $startDate;

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

    public function isVacation(): ?bool
    {
        return $this->vacation;
    }

    public function setVacation(?bool $vacation): static
    {
        $this->vacation = $vacation;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }
}

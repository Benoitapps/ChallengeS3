<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Link;
use App\Repository\ReviewCoachRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    uriTemplate: '/coaches/{id}/reviews',
    operations: [
        new GetCollection(),
    ],
    uriVariables: [
        'id' => new Link(toProperty: 'coach', fromClass: Coach::class)
    ],
)]
#[ApiResource(
    operations: [
        new Post(),
        new Patch(
            denormalizationContext: [
                'groups' => ['review-coach:update']
            ]
        ),
        new Delete(),
    ]
)]
#[ORM\Entity(repositoryClass: ReviewCoachRepository::class)]
class ReviewCoach
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['coach:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['review-coach:read', 'review-coach:write' , 'review-coach:update','stat:coach:read'])]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $note = null;

    #[ORM\ManyToOne(inversedBy: 'reviewCoaches')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-coach:read', 'review-coach:write', 'coach:read'])]
    private ?Client $client = null;

    #[ORM\ManyToOne(targetEntity: Coach::class, inversedBy: 'reviewCoaches')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-coach:read', 'review-coach:write', 'coach:read'])]
    private ?Coach $coach = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

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

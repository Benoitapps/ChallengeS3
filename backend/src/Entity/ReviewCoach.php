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

#[ApiResource(
    uriTemplate: '/coaches/{id}/reviews',
    operations: [
        new GetCollection(),
        new Post(),
    ],
)]
#[ApiResource(
    normalizationContext: ['groups' => ['review-coach:read']],
    denormalizationContext: ['groups' => ['review-coach:write']],
    operations: [
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
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['review-coach:read', 'review-coach:write' , 'review-coach:update'])]
    private ?int $note = null;

    #[ORM\ManyToOne(inversedBy: 'reviewCoaches')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-coach:read', 'review-coach:write'])]
    private ?Client $client = null;

    #[ORM\ManyToOne(inversedBy: 'reviewCoaches')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-coach:read', 'review-coach:write'])]
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

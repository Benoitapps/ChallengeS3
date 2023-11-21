<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ReviewClientRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    uriTemplate: '/clients/{id}/reviews',
    operations: [
        new GetCollection(),
    ],
    uriVariables: [
        'id' => new Link(toProperty: 'client', fromClass: Client::class)
    ],
)]
#[ApiResource(
    normalizationContext: ['groups' => ['review-client:read']],
    denormalizationContext: ['groups' => ['review-client:write']],
    operations: [
        new Post(),
        new Patch(
            denormalizationContext: [
                'groups' => ['review-client:update']
            ]
        ),
        new Delete(),
    ]
)]
#[ORM\Entity(repositoryClass: ReviewClientRepository::class)]
class ReviewClient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['review-client:read', 'review-client:write' , 'review-client:update'])]
    #[ORM\Column]
    private ?int $note = null;

    #[ORM\ManyToOne(targetEntity: Client::class ,inversedBy: 'reviewClients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-client:read', 'review-client:write'])]
    private ?Client $client = null;

    #[ORM\ManyToOne(inversedBy: 'reviewClients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-client:read', 'review-client:write'])]
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

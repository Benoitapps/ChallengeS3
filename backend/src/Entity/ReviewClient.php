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
use Symfony\Component\Validator\Constraints as Assert;

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
    #[Groups(['coach:read'])]
    private ?int $id = null;

    #[Groups(['review-client:read', 'review-client:write' , 'review-client:update'])]
    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $note = null;

    #[ORM\ManyToOne(targetEntity: Client::class ,inversedBy: 'reviewClients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-client:read', 'review-client:write', 'coach:read'])]
    private ?Client $client = null;

    #[ORM\ManyToOne(inversedBy: 'reviewClients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-client:read', 'review-client:write', 'coach:read'])]
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
        if($note <= 0 || $note > 5){
            throw new \InvalidArgumentException('The note must be between 1 and 5');
        }

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

<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => [
                    'user:read',
                ],
            ]
        ),
        new Get(
            normalizationContext: [
                'groups' => [
                    'user:read',
                ],
            ]
        ),
        new Post(),
        new Patch(),
    ],
    // denormalizationContext: [
    //     'groups' => [
    //         'user:write',
    //     ],
    // ],
    // normalizationContext: [
    //     'groups' => [
    //         'user:read',
    //     ],
    // ],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;
    
    #[Groups(['user:read'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;
    
    #[ORM\Column]
    #[Groups(['user:read'])]
    private array $roles = [];
    
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $firstname = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $lastname = null;
    
    #[ORM\OneToOne(inversedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read'])]
    private ?Client $client = null;
    
    #[ORM\OneToOne(mappedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read'])]
    private ?Coach $coach = null;
    
    #[ORM\OneToOne(mappedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read'])]
    private ?Manager $manager = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

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

    public function setCoach(Coach $coach): static
    {
        // set the owning side of the relation if necessary
        if ($coach->getAuth() !== $this) {
            $coach->setAuth($this);
        }

        $this->coach = $coach;

        return $this;
    }

    public function getManager(): ?Manager
    {
        return $this->manager;
    }

    public function setManager(Manager $manager): static
    {
        // set the owning side of the relation if necessary
        if ($manager->getAuth() !== $this) {
            $manager->setAuth($this);
        }

        $this->manager = $manager;

        return $this;
    }
}

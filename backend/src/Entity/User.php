<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use App\State\UserPasswordHasher;
use App\Controller\UserController;
use App\Controller\ForgotPasswordController;

#[ApiResource(
    normalizationContext: [
        'groups' => [
            'user:read',
        ],
    ],
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => [
                    'user:admin:read',
                ],
            ],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Get(
            normalizationContext: [
                'groups' => [
                    'user:read',
                    'user:admin:read' => "is_granted('ROLE_ADMIN')"
                ],
            ],
            security: "is_granted('ROLE_ADMIN') or user.getId() == id"

        ),
        new Post(
            processor: UserPasswordHasher::class,
            controller: UserController::class,
            denormalizationContext: [
                'groups' => [
                    'user:write',
                ],
            ],
            normalizationContext: [
                'groups' => [
                    'user:read',
                ],
            ]
        ),
        // new Post(
        //     uriTemplate: '/users/admin',
        //     processor: UserPasswordHasher::class,
        //     controller: UserController::class,
        //     denormalizationContext: [
        //         'groups' => [
        //             'user:admin:write',
        //         ],
        //     ],
        //     normalizationContext: [
        //         'groups' => [
        //             'user:admin:read',
        //         ],
        //     ],
        //     security: "is_granted('ROLE_ADMIN')"
        // ),
        new Patch(
            denormalizationContext: [
                'groups' => [
                    'user:admin:update',
                ],
            ],
            normalizationContext: [
                'groups' => [
                    'user:admin:read',
                ],
            ],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            controller: ForgotPasswordController::class,
            uriTemplate: '/forgot-password',
            normalizationContext: [
                'groups' => [],
            ],
            denormalizationContext: [
                'groups' => [],
            ],
        )
    ],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:admin:read'])]
    private ?int $id = null;
    
    #[Groups(['user:read', 'user:write', 'user:update', 'user:admin:write', 'user:admin:update', 'user:admin:read','coach:read:email', 'client:read', 'client:write', 'coach:read', 'coach:write', 'manager:read', 'manager:update'])]
    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private ?string $email = null;
    
    #[ORM\Column]
    #[Groups(['user:admin:read', 'user:admin:write', 'user:admin:update'])]
    private array $roles = [];

    #[Groups(['user:write', 'user:update'])]
//    #[Groups(['user:write', 'user:update', 'client:write', 'coach:write'])]
    private ?string $plainPassword = null;
    
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write','slot:read','coach:read', 'coach:write', 'client:read', 'user:admin:write', 'user:admin:update', 'prestation:read', 'company:read', 'company:read:franchise', 'franchise:read','slot:history:read:collection','stat:coach:read','stat:reservation:read', 'user:admin:read', 'manager:admin:read', 'client:write', 'manager:update', 'manager:read'])]
    private ?string $firstname = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write', 'user:admin:write', 'user:admin:update', 'prestation:read', 'company:read', 'company:read:franchise', 'franchise:read','slot:history:read:collection','stat:coach:read','stat:reservation:read', 'user:admin:read', 'manager:admin:read', 'client:read', 'coach:read', 'coach:write', 'client:write', 'manager:update', 'manager:read'])]
    private ?string $lastname = null;
    
    #[ORM\OneToOne(mappedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read', 'user:write', 'user:admin:write'])]
    private ?Client $client = null;

    #[ORM\OneToOne(mappedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read', 'user:write', 'user:admin:write'])]
    private ?Coach $coach = null;
    
    #[ORM\OneToOne(mappedBy: 'auth', cascade: ['persist', 'remove'])]
    #[Groups(['user:read', 'user:write', 'user:admin:write'])]
    private ?Manager $manager = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $token = null;

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
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $password): static
    {
        $this->plainPassword = $password;

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
        $this->plainPassword = null;
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

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): static
    {
        $this->token = $token;

        return $this;
    }
}

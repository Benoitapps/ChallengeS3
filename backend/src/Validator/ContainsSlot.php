<?php

namespace App\Validator;

use App\Entity\Schedule;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;


class ContainsSlot extends ConstraintValidator

{
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;


    // Inject the EntityManagerInterface through the constructor
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function validate(mixed $value, Constraint $constraint): void
    {
        if (null === $value || '' === $value) {
            return;
        }

        // Perform a database query to check if the value exists
        $repository = $this->entityManager->getRepository(Schedule::class); // Replace YourEntity with your actual entity class
        $result = $repository->findOneBy(['start_date' => $value]);
        $this->logger->info('The value is: ' . $value);

        if ($result !== null) {
            return; // Value exists in the database, validation passed
        }

        // The value was not found in the database, add a validation error
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ string }}', $value)
            ->addViolation();
    }
}
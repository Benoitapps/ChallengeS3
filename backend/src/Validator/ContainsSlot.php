<?php

namespace App\Validator;

use App\Entity\Schedule;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;


class ContainsSlot extends ConstraintValidator

{
    private EntityManagerInterface $entityManager;


    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function validate(mixed $value, Constraint $constraint): void
    {
        if (null === $value || '' === $value) {
            return;
        }

        $dateValue = new Date($value['start_date']);

        $repository = $this->entityManager->getRepository(Schedule::class);
        $sheduleCoach= $repository->findOneBy(['start_date' => $dateValue] AND ['coach' => $value['coach']]);

        if(!$sheduleCoach) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value)
                ->addViolation();
        }

        if ($sheduleCoach->getStart_date() > $value['start_date'] || $sheduleCoach->getEnd_date() < $value['end_date']) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value)
                ->addViolation();
        }


    }
}
<?php

namespace App\Validator;

use App\Entity\Coach;
use App\Entity\Schedule;
use App\Entity\Slot;
use App\ValueObject\PersoSchedule;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use function Symfony\Component\String\s;

class ContainsSchedulePersoValidator extends ConstraintValidator
{
    private RequestStack $requestStack;
    private EntityManagerInterface $entityManager;

    public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager)
    {
        $this->requestStack = $requestStack;
        $this->entityManager = $entityManager;
    }

    public function validate($value, Constraint $constraint): void
    {
        /** @var PersoSchedule $value */

        if (!$constraint instanceof ContainsSchedulePerso) {
            throw new UnexpectedTypeException($constraint, ContainsSchedulePerso::class);
        }

        $request = $this->requestStack->getCurrentRequest();
        if (!$request || !$request->isMethod('POST')) {
            return;
        }


        if ($value->getDateStart() > $value->getDateEnd()) {
            $this->context->buildViolation("le End date ne peut etre superieur au start date")
                ->atPath('startDate')
                ->addViolation();
        }

        if ($value->getDateTimeStart() > $value->getDateTimeEnd()) {
            $this->context->buildViolation("le getDateTimeStart ne peut etre superieur au getDateTimeEnd")
                ->atPath('startDate')
                ->addViolation();
        }

        if ($value->getDateTimeStart() == $value->getDateTimeEnd()) {
            $this->context->buildViolation("le getDateTimeStart ne peut etre egal au getDateTimeEnd")
                ->atPath('startDate')
                ->addViolation();
        }


        if ($value->getDateTimeStart()->format('i:s') !== '00:00' || $value->getDateTimeEnd()->format('i:s') !== '00:00') {
            $this->context->buildViolation("un cours ne peut pas etre reserver a cette heur la ")
                ->atPath('start_date')
                ->addViolation();
        }
    }
}

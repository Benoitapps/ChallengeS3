<?php

namespace App\Validator;

use App\Entity\Coach;
use App\Entity\Schedule;
use App\Entity\Slot;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use function Symfony\Component\String\s;

class ContainsSlotValidator extends ConstraintValidator
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
        /** @var Slot $value */

        if (!$constraint instanceof ContainsSlot) {
            throw new UnexpectedTypeException($constraint, ContainsSlot::class);
        }

        $request = $this->requestStack->getCurrentRequest();
        if (!$request || !$request->isMethod('POST')) {
            return;
        }

        $coachId = $value->getCoach()->getId();

        $schedules = $this->entityManager->getRepository(Schedule::class)->findBy([
            'coach' => $coachId,
            'date' => $value->getDate()

        ]);

        dump($schedules);

        if ($schedules == []) {
            $this->context->buildViolation("La plage horaire n'est pas disponible.")
                ->atPath('startDate')
                ->addViolation();
        }

        foreach ($schedules as $schedule) {
            if ($schedule->getStartDate() > $value->getStartDate() || $schedule->getEndDate() < $value->getEndDate()) {
                $this->context->buildViolation("La plage horaire n'est pas disponible.")
                    ->atPath('startDate')
                    ->addViolation();
                break;
            }
        }

        $dateNow = new \DateTime();
        if ($value->getStartDate() < $dateNow) {
            $this->context->buildViolation("Vous ne pas reserver dans le passée")
                ->atPath('startDate')
                ->addViolation();
        }

        if ($value->getStartDate() > $value->getEndDate()) {
            $this->context->buildViolation("La date de debut ne peut pas etre superieur a la date de fin")
                ->atPath('startDate')
                ->addViolation();
        }

        if ($value->getEndDate()->diff($value->getStartDate())->h > 1) {
            $this->context->buildViolation("un cours ne peut depasser 1h")
                ->atPath('startDate')
                ->addViolation();
        }

        if ($value->getStartDate()->format('i:s') !== '00:00' || $value->getEndDate()->format('i:s') !== '00:00') {
            $this->context->buildViolation("un cours ne peut pas etre reserver a cette heur la ")
                ->atPath('startDate')
                ->addViolation();
        }
    }
}

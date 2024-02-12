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

        // Vérifier si la requête est de type POST
        $request = $this->requestStack->getCurrentRequest();
        if (!$request || !$request->isMethod('POST')) {
            return;
        }

        $coachId = $value->getCoach()->getId();

        $schedules = $this->entityManager->getRepository(Schedule::class)->findBy([
            'coach' => $coachId,
            'date' => $value->getDate()

        ]);


        foreach ($schedules as $schedule) {
            if ($schedule->getStartDate() > $value->getStartDate() || $schedule->getEndDate() < $value->getEndDate()) {
                $this->context->buildViolation("La plage horaire n'est pas disponible.")
                    ->atPath('start_date') // ajustez le chemin si nécessaire
                    ->addViolation();
                break;
            }
        }
    }
}

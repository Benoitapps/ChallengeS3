<?php

namespace App\Validator;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

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
        if (!$constraint instanceof ContainsSlot) {
            throw new UnexpectedTypeException($constraint, ContainsSlot::class);
        }

        // Vérifier si la requête est de type POST
        $request = $this->requestStack->getCurrentRequest();
        if (!$request || !$request->isMethod('POST')) {
            return;
        }

        $providedCoachId = basename($value['coach']);
        $coachId = $this->entityManager->getRepository(Coach::class)->find($providedCoachId);

        $schedules = $this->entityManager->getRepository(Schedule::class)->findBy([
            'coach' => $coachId,
            'date' => $value['date']
        ]);

        foreach ($schedules as $schedule) {
            if ($schedule->getStartDate() > $value['start_date'] || $schedule->getEndDate() < $value['end_date']) {
                $this->context->buildViolation("La plage horaire n'est pas disponible.")
                    ->atPath('start_date') // ajustez le chemin si nécessaire
                    ->addViolation();
                break;
            }
        }
    }
}

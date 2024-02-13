<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class ContainsSchedulePerso extends Constraint
{
    public function validatedBy(): string
    {
        return ContainsSchedulePersoValidator::class;
    }

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}

import React, { useState } from 'react';
import {setHours} from "date-fns";
import {postVacation} from '../../hook/manager/postVacation.js'

function ScheduleEditor({coachId}) {


    const postVacations= async (dateStartSimple,dateEndSimple) => {
        await postVacation(dateStartSimple,dateEndSimple,coachId)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const dateStartSimple = new Date(event.target.dateStart.value)
        const dateEndSimple = new Date(event.target.dateEnd.value)


        postVacations(dateStartSimple,dateEndSimple)

    };

    const hours = Array.from({ length: 24 }, (_, index) => index);

    return (
        <>
            <form className="login-signup__forme" onSubmit={handleSubmit}>
                <label>Vacances : </label>
                <label>Date de début:</label>
                <input type="date" name="dateStart"  />

                <label>Date de fin:</label>
                <input type="date" name="dateEnd"   />

                <input type="submit" value="Reserver les vacances" />
            </form>
        </>
    );
}

export default ScheduleEditor;
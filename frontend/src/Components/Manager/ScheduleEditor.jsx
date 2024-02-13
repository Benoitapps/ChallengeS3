import React, { useState } from 'react';
import {setHours} from "date-fns";
import {postScheduleCoach} from '../../hook/manager/postScheduleCoach.js'

function ScheduleEditor({coachId}) {

    const postShedule = async (dateStartTime,dateEndTime,dateStartSimple,dateEndSimple) => {
        await postScheduleCoach(dateStartTime,dateEndTime,dateStartSimple,dateEndSimple,coachId)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const dateStartSimple = new Date(event.target.dateStart.value)
        const dateEndSimple = new Date(event.target.dateEnd.value)

        const dateStartRecup = event.target.dateStart.value
        let dateStartTime = new Date(dateStartRecup);

        const dateEndRecup = event.target.dateEnd.value
        let dateEndTime = new Date(dateEndRecup);

        const hourStart = event.target.timeStart.value
        dateStartTime.setHours(hourStart);

        const hourEnd = event.target.timeEnd.value
        dateEndTime.setHours(hourEnd);

        // console.log(dateStartTime,dateEndTime,dateStartSimple,dateEndSimple)
        postShedule(dateStartTime,dateEndTime,dateStartSimple,dateEndSimple)

    };

    const hours = Array.from({ length: 24 }, (_, index) => index);

    return (
        <>
            <form className="login-signup__forme" onSubmit={handleSubmit}>
                    <label>Date de début:</label>
                    <input type="date" name="dateStart"  />

                    <label>Date de fin:</label>
                    <input type="date" name="dateEnd"   />

                    <label>Heure de début:</label>
                    <select name="timeStart" id="timeStart" >
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}h
                            </option>
                        ))}
                    </select>

                    <label>Heure de fin:</label>
                    <select name="timeEnd" id="timeEnd" >
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}h
                            </option>
                        ))}
                    </select>

                <input type="submit" value="Update" />
            </form>
        </>
    );
}

export default ScheduleEditor;
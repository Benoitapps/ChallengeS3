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
        dateStartTime.setHours(dateStartTime.getHours() + 1);

        const hourEnd = event.target.timeEnd.value
        dateEndTime.setHours(hourEnd);
        dateEndTime.setHours(dateEndTime.getHours() + 1);

        postShedule(dateStartTime,dateEndTime,dateStartSimple,dateEndSimple)

    };

    const hours = Array.from({ length: 24 }, (_, index) => index);

    return (
        <>
            <form className="schedule-editor" onSubmit={handleSubmit}>
                <div className="schedule-editor__line">
                    <label>Date de début:</label>
                    <input type="date" name="dateStart"/>
                </div>

                <div className="schedule-editor__line">
                    <label>Date de fin:</label>
                    <input type="date" name="dateEnd"/>
                </div>

                <div className="schedule-editor__line time">
                    <label>Heure de début:</label>
                    <select name="timeStart" id="timeStart" >
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}h
                            </option>
                        ))}
                    </select>
                </div>

                <div className="schedule-editor__line time">
                    <label>Heure de fin:</label>
                    <select name="timeEnd" id="timeEnd" >
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}h
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" value="Update" />
            </form>
        </>
    );
}

export default ScheduleEditor;
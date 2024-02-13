import React, { useState } from 'react';


function ScheduleEditor({onSave}) {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState('');
    const [working, setWorking] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const addDayToSchedule = () => {
        setSchedule(prevSchedule => [...prevSchedule, { date, working, startTime, endTime }]);
        setDate('');
        setWorking(true);
        setStartTime('');
        setEndTime('');
    };

    const removeDayFromSchedule = (dayToRemove) => {
        setSchedule(prevSchedule => prevSchedule.filter(day => day.date !== dayToRemove.date));
    };

    const renderSchedule = () => {
        return schedule.map((day, index) => (
            <ul key={index} className="popup__content__texts__datetime">
                <li>
                    <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path>
                    </svg>
                    <p>{day.date}</p>
                </li>
                <li>
                    <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path>
                        <path d="m15.443 16.5-4.193-4.193V5.25h1.5v6.435l3.75 3.758-1.057 1.057Z"></path>
                    </svg>
                    {day.working && day.startTime && day.endTime ? (
                        <p>De {day.startTime} à {day.endTime}</p>
                    ) : (
                        <p>Jour de congé</p>
                    )}
                </li>
                <button onClick={() => removeDayFromSchedule(day)}>Supprimer</button>
            </ul>
        ))
    };

    const saveScheduleChanges = () => {
        onSave(schedule);
    };

    return (
        <>
            <h4>Gestion des horaires de travail</h4>
            <div className="schedule-editor">
                {renderSchedule()}
                <div className="schedule-editor__line">
                    <label>Date:</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                </div>
                <div className="schedule-editor__line checkbox">
                    <label htmlFor="work-time">Heures de travail ?</label>
                    <input type="checkbox" name="work-time" checked={working} onChange={() => setWorking(!working)}/>
                </div>
                {working && (
                    <>
                        <div className="schedule-editor__line time">
                            <label>Heure de début</label>
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}/>
                        </div>
                        <div className="schedule-editor__line time">
                            <label>Heure de fin</label>
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}/>
                        </div>
                    </>
                )}
                <button onClick={addDayToSchedule}>Ajouter un jour</button>
                <button className="primary-button" onClick={saveScheduleChanges}>Enregistrer</button>
            </div>
        </>
    );
}

export default ScheduleEditor;
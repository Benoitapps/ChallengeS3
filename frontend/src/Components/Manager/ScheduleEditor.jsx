import React, { useEffect, useState } from 'react';


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
            <div key={index}>
                <p>Date: {day.date}</p>
                {day.working ? (
                    <p>Travail de {day.startTime} à {day.endTime}</p>
                ) : (
                    <p>Jour de congé</p>
                )}
                <button onClick={() => removeDayFromSchedule(day)}>Supprimer</button>
            </div>
        ));
    };

    const saveScheduleChanges = () => {
        onSave(schedule);
    };

    return (
        <div>
            <h2>Gestion des horaires de travail</h2>
            {renderSchedule()}
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
                <label>Heures de travail:</label>
                <input type="checkbox" checked={working} onChange={() => setWorking(!working)} />
            </div>
            {working && (
                <>
                    <div>
                        <label>Heure de début:</label>
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                    </div>
                    <div>
                        <label>Heure de fin:</label>
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                    </div>
                </>
            )}
            <button onClick={addDayToSchedule}>Ajouter un jour</button>
            <button onClick={saveScheduleChanges}>Enregistrer</button>
        </div>
    );
}

export default ScheduleEditor;
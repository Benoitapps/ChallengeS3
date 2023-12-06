import React, { useEffect } from 'react';
import {dateStrings} from "./dateStrings.jsx";
import {useNavigate} from "react-router-dom";

function HistorySlot({ slot }) {


   const dateStart = dateStrings(slot.startDate)
    const dateEnd = dateStrings(slot.endDate)
    const navigate = useNavigate();


    const reschedule = (prestationId, coachId) => {
        console.log(prestationId,coachId)
        const route = `/prestation/${prestationId}/coach/${coachId}/add`;
        navigate(route);
    }

    return (
                <div style={{display: 'flex'}}>
                    <div>{slot.prestation.name}</div>

                   <div>{slot.client.auth.firstname}</div>
                    <div>{slot.client.auth.lastname}</div>

                    <div>{slot.coach.auth.firstname}</div>
                    <div>{slot.coach.auth.lastname}</div>

                    <div>{dateStart}</div>
                    <div>{dateEnd}</div>

                    <button onClick={() => reschedule( slot.prestation.id, slot.coach.id )}>Reprendre</button>
                </div>
    );
}

export default HistorySlot;
import React, { useEffect } from 'react';
import {dateStrings} from "../../services/dateStrings.js";
import {useNavigate} from "react-router-dom";
import '@css/History.css';


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
            <div className="allSlot">
                <div className="lineSlot" >
                    <div className="partSlot" id="prestationSlot">{slot.prestation.name}</div>

                   <div className="partSlot" id="clientFirstnameSlot">{slot.client.auth.firstname}</div>
                    <div className="partSlot" id="clientLastnameSlot">{slot.client.auth.lastname}</div>

                    <div className="partSlot" id="coachFirstnameSlot">{slot.coach.auth.firstname}</div>
                    <div className="partSlot" id="coachLastnameSlot">{slot.coach.auth.lastname}</div>

                    <div>{dateStart}</div>
                    <div>{dateEnd}</div>

                    <button className="buttonSlot" onClick={() => reschedule( slot.prestation.id, slot.coach.id )}>Reprendre</button>
                </div>
            </div>
    );
}

export default HistorySlot;
import React, { useEffect } from 'react';
import {dateStrings} from "../../services/dateStrings.js";
import {useNavigate, Link} from "react-router-dom";
import '@css/History.css';


function HistorySlot({ slot, isCoach }) {


   const dateStart = dateStrings(slot.startDate)
    const dateEnd = dateStrings(slot.endDate)
    const navigate = useNavigate();


    const reschedule = (prestationId, coachId) => {
        const route = `/prestation/${prestationId}/coach/${coachId}/add`;
        navigate(route);
    }

    return (
            <div className="allSlot">
                <div className="lineSlot" >
                    <div className="partSlot" id="prestationSlot">{slot.prestation.name}</div>

                    <div className="partSlot" id="clientFirstnameSlot"><Link to={`/client/${slot.client.id}`}>{slot.client.auth.firstname}</Link></div>
                    <div className="partSlot" id="clientLastnameSlot"><Link to={`/client/${slot.client.id}`}>{slot.client.auth.lastname}</Link></div>

                    <div className="partSlot" id="coachFirstnameSlot">{slot.coach.auth.firstname}</div>
                    <div className="partSlot" id="coachLastnameSlot">{slot.coach.auth.lastname}</div>

                    <div>{dateStart}</div>
                    <div>{dateEnd}</div>

                    {!isCoach? <button className="buttonSlot" onClick={() => reschedule( slot.prestation.id, slot.coach.id )}>Reprendre</button>: null}
                </div>
            </div>
    );
}
export default HistorySlot;
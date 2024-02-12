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
        <tr className="lineSlot">
            <td className="partSlot" id="prestationSlot">{slot.prestation?.name}</td>

            <td className="partSlot" id="clientFirstnameSlot">
                {
                    isCoach ? <Link to={`/client/${slot.client.id}`}>{slot.client.auth.firstname}</Link>
                        : slot.client.auth.firstname
                }
            </td>
            <td className="partSlot" id="clientLastnameSlot">
                {
                    isCoach ? <Link to={`/client/${slot.client.id}`}>{slot.client.auth.lastname}</Link>
                        : slot.client.auth.lastname
                }
            </td>

            <td className="partSlot" id="coachFirstnameSlot">
                {
                    !isCoach ? <Link to={`/coach/${slot.coach.id}`}>{slot.coach.auth.firstname}</Link>
                        : slot.coach.auth.firstname
                }
            </td>
            <td className="partSlot" id="coachLastnameSlot">
                {
                    !isCoach ? <Link to={`/coach/${slot.coach.id}`}>{slot.coach.auth.lastname}</Link>
                        : slot.coach.auth.lastname
                }
            </td>

            <td className="partSlot">{dateStart}</td>
            <td className="partSlot">{dateEnd}</td>

            {!isCoach ? <td className="partSlot noPadding">
                <button className="buttonSlot"
                        onClick={() => reschedule(slot.prestation.id, slot.coach.id)}>Reprendre
                </button>
            </td> : null}
        </tr>
    );
}

export default HistorySlot;
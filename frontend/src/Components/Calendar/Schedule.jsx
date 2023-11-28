import React, {useRef, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import PopUp from "./Popup.jsx";
import '@css/Schedule.css';
import {tab} from './eventsGet.jsx';
import {addslot} from './eventCreate.jsx';
import {eventDetails} from './eventDetails.jsx';
import { deleteSlot } from "../../hook/Schedule/eventDelete.js";


function Schedule({ onButtonClick, ...otherProps }) {

    //les evenements de la personne connecter (client ou coach)
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState("");
    const [eventDetail, setEventDetail] = useState(null);

    //Type de Modal et son contenu
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    //Date de debut et de fin de la reservation
    const [dateStartModal, setDateStartModal] = useState(null);
    const [dateEndModal, setDateEndModal] = useState(null);

    //Date de debut et de fin du calendrier (de la semaine selectionner)
    const [calendarFilterStart, setCalendarFilterStart] = useState(null);
    const [calendarFilterEnd, setCalendarFilterEnd] = useState(null);
    const calendarRef = useRef(null);
    const navigate = useNavigate();

    //recuperation des evenements
    async function fetchData() {
        let events = await tab(calendarFilterStart, calendarFilterEnd);
        setEvents(events);
    }
    //recuperation des evenements au chargement de la page
    useEffect(() => {
        if (calendarFilterStart !== null && calendarFilterEnd !== null) {
            fetchData();
        }
    }, [calendarFilterStart]);



    const formatReadableDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        return {
            date: `${day}/${month}/${year}`,
            time: `${hours}:0${minutes} à ${hours + 1}:0${minutes}`,
        }
    }

    const handleDateChange = (arg) => {
        setCalendarFilterStart(new Date(arg.startStr).toISOString())
        setCalendarFilterEnd(new Date(arg.endStr).toISOString())
    }

    //avoir les details de l'evenement
    const handleEventInfo = (info) => {
        setEventId(info.event._def.publicId);

        async function fetchEventDetails() {

            let eventDetail = await eventDetails(info.event._def.publicId);
            setEventDetail(eventDetail);
            let DateFormat = formatReadableDate(info.el.fcSeg.eventRange.range.start);

            const modalContentInfo = (
                <div className="popup__content__texts">

                    <h2>Vous avez reserver un Cours :</h2>
                    <p>Prestation : {eventDetail.title} {eventDetail.idPrestation}</p>
                    <p>Coach : {eventDetail.coach} </p>
                    <p>Client : {eventDetail.client}</p>

                    <ul className="popup__content__texts__datetime">
                        <li>
                            <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path>
                            </svg>
                            <p>{DateFormat.date}</p>
                        </li>
                        <li>
                            <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path>
                                <path d="m15.443 16.5-4.193-4.193V5.25h1.5v6.435l3.75 3.758-1.057 1.057Z"></path>
                            </svg>
                            <p>{DateFormat.time}</p>
                        </li>
                    </ul>
                </div>
            );

            setIsModalOpenDetail(true);
            setModalContent(modalContentInfo);

        }
        fetchEventDetails();
    }

    const closeModal = () => {
        setIsModalOpenDetail(false);
        setIsModalOpen(false);
        setModalContent(null);
    };


    const updateModal = () => {


        if (typeof onButtonClick === 'function') {
            onButtonClick(eventDetail);
        }

        console.log("changement de page");
        console.log(eventDetail);
        const route = `/prestation/${eventDetail.idPrestation}/coach/${eventDetail.idCoach}`;

        navigate(route);
    };

    const deleteSlotbyID = (e) => {

        deleteSlot(eventId);
        fetchData();
        closeModal();
    };

    return (
        <main className="schedule">

            <h1>Mes Reservations</h1>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={'timeGridWeek'}
                slotDuration="01:00:00"
                events={events}
                allDaySlot={false}
                editable={false}
                selectable={true}
                headerToolbar={
                    {
                        start: "today prev,next",
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }
                }
                height={"42em"}
                locale={"fr"}
                // dateClick={(e) => handleDateClick(e)}
                // viewDidMount={handleViewChange}
                datesSet={handleDateChange}
                eventClick={handleEventInfo}
            />
            <PopUp show={isModalOpen} onClose={() => closeModal()} button1={() => reserveModal()} nameButton1={"Réserver"}
                   annuler={"Annuler"}>
                {modalContent}
            </PopUp>
            <PopUp show={isModalOpenDetail} showButton={true} showButton1={true} onClose={() => closeModal()} button1={() => updateModal()} button2={() => deleteSlotbyID()}
                   nameButton1={"Modifier"} nameButton2={"Supprimer"} annuler={"Annuler"}>
                {modalContent}
            </PopUp>
        </main>
    );
}
export default Schedule;
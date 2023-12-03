import React, {useRef, useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import PopUp from "./Popup.jsx";
import '@css/Schedule.css';
import {addslot} from './eventCreate.jsx';
import { deleteSlot } from "../../hook/Schedule/eventDelete.js";
import { eventCoach } from "./eventCoach.jsx";
import { sheduleCoach } from "./sheduleCoachGet.jsx"
import {postSlot} from "../../hook/Schedule/eventPost.js";
import {patchSlot} from "../../hook/Schedule/eventPatch.js";
import { useNavigate, useParams } from 'react-router-dom';
import {getUserId} from "../User/DecodeUser.jsx";
import loadingGIF from "@img/loading.gif";


function ScheduleReservation({ eventDetail, isUpdate, }) {
    const { coachId, prestationId } = useParams();
    const [loading, setLoading] = useState(true);


    const [idPrestation, setIdPrestation] = useState(prestationId);
    const [idCoach, setIdCoach] = useState(coachId);
    const [idClient, setIdClient] = useState(null);

    //Horraire du coach ainsi que ces evenements
    const [scheduleHeur, setSheduleHeur] = useState([]);
    const [events, setEvents] = useState([]);

    //Type de Modal et son contenu
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [isModalOpenErreur, setIsModalOpenErreur] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    //Date de debut et de fin de la reservation
    const [dateStartModal, setDateStartModal] = useState(null);//
    const [dateEndModal, setDateEndModal] = useState(null);

    //Date de debut et de fin du calendrier (de la semaine selectionner)
    const [calendarFilterStart, setCalendarFilterStart] = useState(null);
    const [calendarFilterEnd, setCalendarFilterEnd] = useState(null);
    const calendarRef = useRef(null);
    const navigate = useNavigate();


    //recuperation des evenement et des horraires du coach
    async function fetchData() {
        let tabHorraire = await sheduleCoach(idCoach, calendarFilterStart, calendarFilterEnd);
        let eventCoaches = await eventCoach(idCoach);
        let idClient = await getUserId();

        if (calendarRef && calendarRef.current.getApi()) {
            const api = calendarRef.current.getApi();
            api.setOption('businessHours', tabHorraire);
        }
        setIdClient(idClient);
        setEvents(eventCoaches);
        setSheduleHeur(tabHorraire);
        setLoading(false);

    }

    //recuperation des evenement et des horraires du coach au chargement de la page
    useEffect(() => {
        console.log("eventDetail",eventDetail);
        console.log("isUpdate",isUpdate);
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
        const date2 = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const hours = date.getUTCHours()<10? "0"+date.getUTCHours() : date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        date2.setHours(date.getHours() + 1);
        const hours2 = date2.getUTCHours()<10? "0"+date2.getUTCHours() : date2.getUTCHours();

        return {
            date: `${day}/${month}/${year}`,
            time: `${hours}:0${minutes} à ${hours2}:0${minutes}`,
            timeCompareStart: `${hours}:0${minutes}`,
            timeCompareEnd: `${hours2}:0${minutes}`
        }
    }

    const handleDateChange = (arg) => {
        setCalendarFilterStart(new Date(arg.startStr).toISOString())
        setCalendarFilterEnd(new Date(arg.endStr).toISOString())
    }

    const handleDateClick = (arg) => {

        let dateBaseStart = new Date(arg.dateStr);
        let dateBaseEnd = new Date(arg.dateStr);
        dateBaseStart.setHours(dateBaseStart.getHours() + 1);
        dateBaseEnd.setHours(dateBaseEnd.getHours() + 2);

        let now = new Date();

        let DateFormat = formatReadableDate(dateBaseStart);
        let dateClick = arg.dayEl.dataset.date
        let click = false;

        for (let i = 0; i < scheduleHeur.length; i++) {//verification que le slot est bien dans les horraires du coach et qui soit pas deja passer
            if (dateClick === scheduleHeur[i].date) {
                const time1start = new Date("2000-01-01T"+scheduleHeur[i].startTime+":00Z");//horaire du coach
                const time1end = new Date("2000-01-01T"+scheduleHeur[i].endTime+":00Z");

                const time2start = new Date("2000-01-01T"+DateFormat.timeCompareStart+":00Z");//click
                const time2end = new Date("2000-01-01T"+DateFormat.timeCompareEnd+":00Z");

                console.log("heur Debut Coach",time1start)
                console.log("heur fin coach",time1end)
                console.log("Heur debut click",time2start)
                console.log("heur fin click",time2end)

                i = scheduleHeur.length;
                click = (time2start >= time1start && time2end < time1end) && (dateBaseStart > now);
            }


        }


        if(click === true) {//si le slot peut etre cree

            setDateStartModal(dateBaseStart);
            setDateEndModal(dateBaseEnd);


            const modalContentreserve = (
                <div className="popup__content__texts">

                    {isUpdate ? (
                        <h2>Remplacer le créneau de :</h2>
                    ) : (
                        <h2>Reserver le créneau de : </h2>
                    )}

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

            setIsModalOpen(true);
            setModalContent(modalContentreserve);
        }else{
            const modalContentreserve = (
                <div className="popup__content__texts">

                    <h2>Le Coach ne travail pas durant ces horraires ou l'horraire selectionner est deja passer</h2>

                </div>
            );
            setIsModalOpenErreur(true);
            setModalContent(modalContentreserve);
        }

    };

    const closeModal = () => {
        setIsModalOpenDetail(false);
        setIsModalOpen(false);
        setIsModalOpenErreur(false);
        setModalContent(null);

    };

    const reserveModal = (e) => {

        const upadateSlot = async (dateStart, dateEnd, slotId) => {
            const getData = await patchSlot(dateStart, dateEnd,slotId);
            navigate("/schedule");
        }

        const addslot = async (dateStart, dateEnd, idPrestation, idCoach, idClient) => {
            const getData = await postSlot(dateStart, dateEnd,idPrestation,idCoach,idClient);
            if (getData && getData?.status === 500) {
                console.log("ya une erreur")
                const modalContentreserve = (

                    <h2>Le créneau est déjà réservé</h2>

                );
                setIsModalOpenErreur(true);
                setModalContent(modalContentreserve);
            }else {
            }

            setLoading(true);
            console.log("loading lancer a ",loading);

            fetchData();
            closeModal();
        };

        if(isUpdate){
            console.log("le update")
            upadateSlot(dateStartModal, dateEndModal,eventDetail.slotId);
        }else{
            console.log("le add")
            console.log("idClient",idClient);
            addslot(dateStartModal, dateEndModal,idPrestation,idCoach,idClient);
        }

    };

    const deleteSlotbyID = (e) => {

        deleteSlot(eventId);
        fetchData();
        closeModal();
    };


    return (
        <main>

            <div className="schedule">


                {loading?  <div className="fondLoader"></div> : null}
                {loading? <img className="loader" src={loadingGIF}  alt="Chargement..."/> : null}

            <h1>Calendrier du Coach</h1>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={'timeGridWeek'}
                slotDuration="01:00:00"
                events={events}
                allDaySlot={false}
                editable={false}
                selectable={true}
                slotMinTime="02:00:00"
                slotMaxTime="22:00:00"
                headerToolbar={
                    {
                        start: "today prev,next",
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek'
                    }
                }

                height={"36em"}
                locale={"fr"}
                dateClick={(e) => handleDateClick(e)}
                datesSet={handleDateChange}
                eventClick={false}
            />
            <PopUp show={isModalOpen} showButton1={true} onClose={() => closeModal()} button1={() => reserveModal()} nameButton1={"Réserver"}
                   annuler={"Annuler"}>
                {modalContent}
            </PopUp>
            <PopUp show={isModalOpenDetail} showButton={true} onClose={() => closeModal()} button1={() => reserveModal()} button2={() => deleteSlotbyID()}
                   nameButton1={"Modifier"} nameButton2={"Supprimer"} annuler={"Annuler"}>
                {modalContent}
            </PopUp>
            <PopUp show={isModalOpenErreur}  onClose={() => closeModal()}
                   annuler={"Retour"}>
                {modalContent}
            </PopUp>
            </div>
        </main>
    );
}

export default ScheduleReservation;
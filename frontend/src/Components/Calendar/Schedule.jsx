import React, {useRef,useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import PopUp from "./Popup.jsx";
import '@css/Schedule.css';
import {tab} from './events.jsx';

function Schedule() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [dateStartModal, setDateStartModal] = useState(null);
    const [dateEndModal, setDateEndModal] = useState(null);

    const [calendarFilterStart, setCalendarFilterStart ] = useState(null);
    const [calendarFilterEnd, setCalendarFilterEnd ] = useState(null);
    const [calendarView, setCalendarView ] = useState(null);
    const calendarRef = useRef(null);


    // useEffect(() => {
    //     if(calendarRef.current){
    //
    //         const dateFilterStart = calendarRef.current.getApi().currentData.dateProfile.currentRange.start;
    //         const dateFilterEnd = calendarRef.current.getApi().currentData.dateProfile.currentRange.end;
    //
    //         setCalendarFilterStart(new Date(dateFilterStart).toISOString())
    //         setCalendarFilterEnd(new Date(dateFilterEnd).toISOString())
    //
    //
    //         // console.log("resultat 1er use effect ", calendarFilterStart + "and" + calendarFilterEnd);
    //     }
    // },[]);


    useEffect(() => {
        console.log("resultat 2eme use effect ", calendarFilterStart + "and" + calendarFilterEnd);

        async function fetchData() {
            console.log("init events")
            let events = await tab(calendarFilterStart,calendarFilterEnd);
            setEvents(events);
            console.log("events",events)
        }
        if(calendarFilterStart !== null && calendarFilterEnd !== null){
            fetchData();
        }
    }, [calendarFilterStart]);




    const formatReadableDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
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

    const handleViewChange = (view) => {

        setCalendarView(view.view.type) ;
    };

    const handleDateChange = (arg) => {
        console.log("date",arg.startStr)

        setCalendarFilterStart(new Date(arg.startStr).toISOString())
        setCalendarFilterEnd(new Date(arg.endStr).toISOString())
        // setCalendarFilterStart(arg.startStr);
        // setCalendarFilterEnd(arg.endStr);
    }

    const handleDateClick = (arg) => {
        console.log(arg);

        setDateStartModal(arg.startStr);
        setDateEndModal(arg.endStr);

        console.log("dateStartModal",dateStartModal);
        console.log("dateEndModal",dateEndModal);
        let DateFormat = formatReadableDate(arg.dateStr);

        const modalContent = (
            <div className="popup__content__texts">
                <h2>Réserver ce créneau</h2>
                <ul className="popup__content__texts__datetime">
                    <li>
                        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5Zm0 16.5h-15V9h15v10.5Zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3v3Z"></path>
                        </svg>
                        <p>{DateFormat.date}</p>
                    </li>
                    <li>
                        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path>
                            <path d="m15.443 16.5-4.193-4.193V5.25h1.5v6.435l3.75 3.758-1.057 1.057Z"></path>
                        </svg>
                        <p>{DateFormat.time}</p>
                    </li>
                </ul>
            </div>
        );

        setIsModalOpen(true);
        setModalContent(modalContent);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <main className="schedule">
            <FullCalendar
                ref={calendarRef}
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin ]}
                initialView={'timeGridWeek'}
                slotDuration="01:00:00"
                events={events}
                allDaySlot={false}
                editable={true}
                selectable={true}
                // slotMinTime="05:00:00"
                // slotMaxTime="22:00:00"
                headerToolbar={
                    {
                        start : "today prev,next",
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }
                }
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5, 6],
                    startTime: '08:00',
                    endTime: '17:00',
                }}
                height={"42em"}
                locale={"fr"}
                dateClick={(e) => handleDateClick(e)}
                viewDidMount={handleViewChange}
                datesSet={handleDateChange}
            />
            <PopUp show={isModalOpen} onClose={() => closeModal()} dateStart={dateStartModal} dateEnd={dateEndModal}>
                {modalContent}
            </PopUp>
        </main>
    );
}

export default Schedule;
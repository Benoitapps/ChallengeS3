import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import PopUp from "./Popup.jsx";
import '../../assets/css/App.css';
import '../../assets/css/Schedule.css';
import {tab} from './events.jsx';


export default class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalContent: null,
        };
    }

    componentDidMount() {
        tab().then((transformedData) => {
            this.setState({ events: transformedData });
        });
    }

    formatReadableDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Les mois sont 0-indexés, donc on ajoute 1
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        return `${day} ${month} ${year}, ${hours}:0${minutes}`;
    }


    handleDateClick = (arg) => {
        console.log(arg);
        console.log("state",this.state.isModalOpen)

        let DateFormat = this.formatReadableDate(arg.dateStr);

        const modalContent = (
            <div>
                <h2>Voulez vous prendre le crenaux du :</h2>
                <p>{DateFormat}</p>
            </div>
        );

        this.setState({
            isModalOpen: true,
            modalContent: modalContent,
        });
        console.log("modalConetent", modalContent);
    };

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            modalContent: null,
        });
    };

    render() {

        return (
            <>
                <main>

                <div className="calendar">
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin ]}
                initialView={'timeGridWeek'}
                slotDuration="01:00:00"
                events={this.state.events}
                allDaySlot={false}
                editable={true}
                selectable={true}
                slotMinTime="05:00:00"
                slotMaxTime="22:00:00"
                // contentHeight="200px"
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
                height={"31em"}
                locale={"fr"}
                dateClick={(e) => this.handleDateClick(e)}
            />
                </div>
                <div className="flex">
                <div className="popup">
                    <PopUp show={this.state.isModalOpen} onClose={this.closeModal}>
                        {this.state.modalContent}
                    </PopUp>
                </div>
                </div>
                </main>
            </>

        )
    }

}
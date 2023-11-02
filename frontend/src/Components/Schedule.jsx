import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Popup from "./Popup.jsx";
import './../assets/css/App.css';

export default class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalContent: null,
        };
    }

    handleDateClick = (arg) => {
        console.log(arg);
        console.log("state",this.state.isModalOpen)

        const modalContent = (
            <div>
                <h2>Date sélectionnée :</h2>
                <p>{arg.dateStr}</p>
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
        const events = [
            {
                title: 'Événement 1',
                start: '2023-11-02T08:31:01.297Z',
                end: '2023-11-02T10:31:01.297Z',
            },
        ];
        const customViews = {
            week: {
                type: 'timeGridWeek',
                buttonText: 'Semaine',
            },
        };

        return (
            <>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                initialView={'timeGridWeek'}
                slotDuration="01:00:00"
                events={events}
                allDaySlot={false}
                views={customViews}
                editable={true}
                selectable={true}
                slotMinTime="05:00:00"
                slotMaxTime="22:00:00"
                // contentHeight="200px"
                headerToolbar={
                    {
                       start : "today prev,next",
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek'
                    }
                }
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5, 6],
                    startTime: '08:00',
                    endTime: '17:00',
                }}
                // height={"90em"}
                locale={"fr"}
                dateClick={(e) => this.handleDateClick(e)}
            />
                <div className="test">

                    <Popup show={this.state.isModalOpen} onClose={this.closeModal}>
                        {this.state.modalContent}
                    </Popup>
                </div>
            </>

        )
    }

}
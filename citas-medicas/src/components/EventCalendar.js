import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

require('react-big-calendar/lib/css/react-big-calendar.css')
require('moment/locale/es.js');
const localizer = momentLocalizer(moment);

//array de eventos
const myEventsList= [{
    title: "today",
    start: new Date('2020-05-05 10:22:00'),
    end: new Date('2020-05-05 10:42:00')
  },
  {
    title: "string",
    start: new Date('2020-05-05 12:22:00'),
    end: new Date('2020-05-05 13:42:00')
  }]

  
export default class EventCalendar extends Component {

    click = e => {
      console.log(e)
    }

    selecting = e => {
      return false;
    }

    

    render() {
        return (
          <div className="bigCalendar-container">
            <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              views={['work_week']}
              defaultView='work_week'
              messages={{
                next: "Siguiente",
                previous: "Anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
              }}
              step="60"
              timeslots="1"
              selectable={true}
              onSelectSlot={this.click}
              onSelecting={this.selecting}
              min={new Date(0, 0, 0, 8, 0, 0)}
              max={new Date(0, 0, 0, 20, 0, 0)}
            />
        </div>);
    }
}

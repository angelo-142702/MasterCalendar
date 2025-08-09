import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useRef, useState } from 'react';
import es from "@fullcalendar/core/locales/es"
import EventDetailsModal from './components/DetailsEvent.jsx';
function renderEventContent(eventInfo) {
    return(
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
const CalendarComponent = ({}) => {
    const calendarRef = useRef(null);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        console.log(info.event);

         // Almacenar el evento seleccionado
      };
    // Eventos de ejemplo
    const events = [
        {
          id: '1',
          title: 'Reunión de equipo',
          start: '2025-02-10T09:00:00', // Fecha y hora de inicio
          end: '2025-02-10T10:30:00',   // Fecha y hora de fin
        },
        {
          id: '2',
          title: 'Almuerzo',
          start: '2025-02-12T12:00:00',
          end: '2025-02-12T13:00:00',
        },
        {
          id: '3',
          title: 'Desarrollo de feature',
          start: '2025-02-07T14:00:00',
          end: '2025-02-07T17:00:00',
        },
      ];;
  return (
    <div>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin, googleCalendarPlugin]}
        ref={calendarRef}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth', // Botones para cambiar entre vista diaria y semanal
          }}
          locale={es}
        initialView={["timeGridDay"]}
        slotDuration="00:30:00" // Duración de cada intervalo de tiempo (30 minutos)
        slotMinTime="08:00:00"  // Hora de inicio del calendario (8:00 AM)
        slotMaxTime="16:00:00"  // Hora de fin del calendario (8:00 PM)
        events={events}
        eventContent={(eventInfo) => {
            // Personalizar el contenido del evento
            return (
              <div
                style={{
                  width:"100%",
                  height:"100%",
                  display: "flex",
                  placeContent:"center",
                  placeItems:"center",
                  backgroundColor: "blue",
                  color: "white",
                  padding: '5px',
                  borderRadius: '4px',
                  borderRadius:"5px",
                  border: `1px solid blue || 'transparent'}`,
                }}
              >
                <strong>{eventInfo.event.title}</strong>
              </div>
            );
          }}
        editable={true} // Permite arrastrar y soltar eventos
        selectable={true} // Permite seleccionar fechas
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)} // Cerrar el modal
        />
      )}
    </div>
  );
};
const Calendarsuscriptions = ({events}) => {
    const calendarRef = useRef(null);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        console.log(info.event);

         // Almacenar el evento seleccionado
      };
    // Eventos de ejemplo
    const eventSuscript = events.forEach(element => {
      
    });
    const event = [
        {
          id: '1',
          title: 'Reunión de equipo',
          start: '2025-02-10T09:00:00', // Fecha y hora de inicio
          end: '2025-02-10T10:30:00',   // Fecha y hora de fin
        },
        {
          id: '2',
          title: 'Almuerzo',
          start: '2025-02-12T12:00:00',
          end: '2025-02-12T13:00:00',
        },
        {
          id: '3',
          title: 'Desarrollo de feature',
          start: '2025-02-07T14:00:00',
          end: '2025-02-07T17:00:00',
        },
      ];;
  return (
    <div>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin, googleCalendarPlugin]}
        ref={calendarRef}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth', // Botones para cambiar entre vista diaria y semanal
          }}
          locale={es}
        initialView={["timeGridDay"]}
        slotDuration="00:30:00" // Duración de cada intervalo de tiempo (30 minutos)
        slotMinTime="08:00:00"  // Hora de inicio del calendario (8:00 AM)
        slotMaxTime="16:00:00"  // Hora de fin del calendario (8:00 PM)
        events={events}
        eventContent={(eventInfo) => {
            // Personalizar el contenido del evento
            return (
              <div
                style={{
                  width:"100%",
                  height:"100%",
                  display: "flex",
                  placeContent:"center",
                  placeItems:"center",
                  backgroundColor: "blue",
                  color: "white",
                  padding: '5px',
                  borderRadius: '4px',
                  borderRadius:"5px",
                  border: `1px solid blue || 'transparent'}`,
                }}
              >
                <strong>{eventInfo.event.title}</strong>
              </div>
            );
          }}
        editable={true} // Permite arrastrar y soltar eventos
        selectable={true} // Permite seleccionar fechas
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)} // Cerrar el modal
        />
      )}
    </div>
  );
};

export default CalendarComponent;

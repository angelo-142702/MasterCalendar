// src/components/Calendar.jsx
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAdmin } from '../context/adminProvider';
import { Empty } from 'antd';

const Calendar = () => {
    const { events:Events, setEvents ,getAllSuscripCalendar } = useAdmin();
        if (Events) {
            console.log(Events);
            
        }
       useEffect(()=> getAllSuscripCalendar ,[])

    // Obtener las suscripciones desde el backend
   if (Events) {
    
       return (
           <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[...Events]}
                eventContent={renderEventContent}
                />
        </div>
    );
}else{
 return <Empty/>
     
}
};

// Personalizar el contenido de los eventos
const renderEventContent = (eventInfo) => {
    return (
        <div>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </div>
    );
};

export default Calendar;
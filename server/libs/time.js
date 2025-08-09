import dayjs from "dayjs";
export function removeTimeSlots(fullSlots, slotsToRemove) {
  // Normalizar formato (elimina espacios extras)
  const normalize = str => str.replace(/\s*-\s*/g, ' - ').trim();
  
  const removeSet = new Set(slotsToRemove.map(normalize));
  
  return fullSlots.filter(slot => {
    const normalizedSlot = normalize(slot);
    return !removeSet.has(normalizedSlot);
  });
}
export function sumarTiempoAFecha(fechaString, cantidad, unidad = 'minutos') {
    const unidades = {
        minutos: 60000,
        horas: 3600000,
        días: 86400000
    };

    const fecha = new Date(fechaString.replace(' ', 'T'));
    if (isNaN(fecha.getTime())) return "Fecha inválida";

    const factor = unidades[unidad] || 60000;
    const nuevaFecha = new Date(fecha.getTime() + (cantidad * factor));

    const opcionesFormato = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return nuevaFecha.toLocaleString('es-ES', opcionesFormato)
                     .replace(/,/g, '')
                     .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
}
export function formatDate(date){
    const formtear = dayjs(date);
    
    return formtear.format("DD/MM/YYYY");
}
// Ejemplo de uso:
//console.log(sumarTiempoAFecha("2025-05-22 12:00", 3, 'horas')); // 2025-05-22 15:00
//console.log(sumarTiempoAFecha("2025-12-31 23:30", 45)); // 2026-01-01 00:15
export function generarIntervalos30min(inicioStr, finStr) {
    // Convertir tiempos a minutos totales desde medianoche
    const inicio = convertirATiempoMinutos(inicioStr);
    const fin = convertirATiempoMinutos(finStr);
    
    const intervalos = [];
    
    // Validar que el inicio sea menor al fin
    if (inicio >= fin) return [];
    
    // Generar intervalos de 30 minutos
    for (let minutos = inicio; minutos < fin; minutos += 30) {
        const siguiente = Math.min(minutos + 30, fin);
        intervalos.push(
            `${formatearHora(minutos)} - ${formatearHora(siguiente)}`
        );
    }
    
    return intervalos;
}
//// Function para eliminar las horas del horario reservadas //////
function filtrarHorariosDisponibles(horariosCompletos, horariosReservados) {
    return horariosCompletos.filter(horario => 
      !horariosReservados.includes(horario)
    );
  }
// Función auxiliar: convertir tiempo HH:MM:SS.ssssss a minutos
export function convertirATiempoMinutos(tiempoStr) {
    const [horas, minutos] = tiempoStr.split(':').slice(0, 2).map(Number);
    return horas * 60 + minutos;
}
// Función auxiliar: formatear minutos a HH:MM
export function formatearHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
export const combineDateTime = (dateString, timeString) => {
    // Dividir la fecha en partes
    const [day, month, year] = dateString.split('-');
    
    // Dividir la hora en partes
    const [hours, minutes] = timeString.split(':');
  
    // Crear objeto de fecha usando componentes
    return dayjs()
      .set('year', year)
      .set('month', month - 1) // Meses van de 0 (Enero) a 11 (Diciembre)
      .set('date', day)
      .set('hour', hours)
      .set('minute', minutes)
      .set('second', 0)
      .set('millisecond', 0);
  };
export function calcularHorariosDisponibles(duracionHoras, todosLosHorarios) {
    // Convertir duración a intervalos de 30 minutos
    const intervalosNecesarios = duracionHoras * 2;
    const horariosDisponibles = [];
  
    // Convertir horarios a minutos desde medianoche
    const horariosEnMinutos = todosLosHorarios.map(horario => {
      const [inicio, fin] = horario.split(' - ');
      return {
        inicio: convertirAMinutos(inicio),
        fin: convertirAMinutos(fin),
        original: horario
      };
    });
  
    // Función para convertir tiempo HH:MM a minutos
    function convertirAMinutos(tiempo) {
      const [horas, minutos] = tiempo.split(':').map(Number);
      return horas * 60 + minutos;
    }
  
    // Función para convertir minutos a formato HH:MM
    function convertirATiempo(minutos) {
      const horas = Math.floor(minutos / 60).toString().padStart(2, '0');
      const mins = (minutos % 60).toString().padStart(2, '0');
      return `${horas}:${mins}`;
    }
  
    // Verificar disponibilidad consecutiva
    for (let i = 0; i < horariosEnMinutos.length - (intervalosNecesarios - 1); i++) {
      const intervaloFinal = i + intervalosNecesarios - 1;
      
      // Verificar si todos los intervalos necesarios están disponibles
      const intervalosConsecutivos = [];
      let valido = true;
      
      for (let j = i; j <= intervaloFinal; j++) {
        if (j < horariosEnMinutos.length - 1 && 
            horariosEnMinutos[j].fin !== horariosEnMinutos[j + 1].inicio) {
          valido = false;
          break;
        }
        intervalosConsecutivos.push(horariosEnMinutos[j].original);
      }
  
      if (valido) {
        const horaInicio = convertirATiempo(horariosEnMinutos[i].inicio);
        const horaFin = convertirATiempo(horariosEnMinutos[intervaloFinal].fin);
        horariosDisponibles.push(`${horaInicio} - ${horaFin}`);
      }
    }
  
    return horariosDisponibles;
  }
// Ejemplo de uso


export function valueInterno(texto) {
    const regex = /\((.*?)\)/g;
    return [...texto.matchAll(regex)].map(match => match[1]);
}
// Ejemplo de uso
//console.log(valueInterno(textoEjemplo)); // Salida: ["valor1", "valor2"]  // Salida: "valor1"
export function formatCustomDate(date) {
  return dayjs(date)
    .format("DD-MM-YYYY h:mmA")  // Formato base: "14-03-2025 3:00AM"
           // Reemplaza "PM" por "Pm"
}
export function recortarTexto(texto) {
    // Encontrar la posición del primer paréntesis
    const indiceParentesis = texto.indexOf('(');
    
    // Si no hay paréntesis, devolver el texto original
    if (indiceParentesis === -1) return texto;
    
    // Recortar hasta la posición del paréntesis y eliminar espacios al final
    return texto.substring(0, indiceParentesis).trim();
}
// Ejemplo de uso:
//console.log(sumarTiempoAFecha("2025-05-22 12:00", 3, 'horas')); // 2025-05-22 15:00
//console.log(sumarTiempoAFecha("2025-12-31 23:30", 45)); // 2026-01-01 00:15
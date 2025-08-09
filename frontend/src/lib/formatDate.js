import dayjs from 'dayjs';

export function formatDate(date){
    const formtear = dayjs(date);
    
    return formtear.format("DD/MM/YYYY");
}
export function obtenerDiaSemanaT(fecha) {
  // Array con los nombres de los días (empezando por domingo, según JavaScript)
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  // Crear objeto Date a partir de la fecha proporcionada
  const fechaObj = new Date(fecha);
  
  // Obtener el índice del día (0 para Domingo, 1 para Lunes, etc.)
  const indiceDia = fechaObj.getDay();
  
  // Retornar el nombre del día correspondiente
  return diasSemana[indiceDia];
}

export function obtenerDiaSemana(fechaStr) {
    const [dia, mes, anio] = fechaStr.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia); // Los meses van de 0 (enero) a 11 (diciembre)
    
    if (isNaN(fecha)) return 'Fecha inválida';
  
    const dias = [
      'Domingo', 'Lunes', 'Martes', 
      'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];
    
    return dias[fecha.getDay()];
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
// Ejemplo de uso:
//console.log(sumarTiempoAFecha("2025-05-22 12:00", 3, 'horas')); // 2025-05-22 15:00
//console.log(sumarTiempoAFecha("2025-12-31 23:30", 45)); // 2026-01-01 00:15
function generarIntervalos30min(inicioStr, finStr) {
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

// Función auxiliar: convertir tiempo HH:MM:SS.ssssss a minutos
function convertirATiempoMinutos(tiempoStr) {
    const [horas, minutos] = tiempoStr.split(':').slice(0, 2).map(Number);
    return horas * 60 + minutos;
}
// Función auxiliar: formatear minutos a HH:MM
function formatearHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}


//obtener el valor de la fecha sin los demas 
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

export function formataHora(hora) {
    const [h, m] = hora.split(':');
    const horas12 = h % 12 || 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${horas12}:${m} ${ampm}`;
  }
  
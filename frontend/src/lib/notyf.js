
// Importar Notyf (si usas npm)
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Crear una instancia de Notyf
export const notyf = new Notyf({
  duration: 3000, // Duración de la notificación (5 segundos)
  position: {
    x: 'right', // Posición horizontal (left, center, right)
    y: 'top', // Posición vertical (top, bottom)
  },
  types: [
    {
      type: 'success', // Tipo de notificación de éxito
      backgroundColor: '#22c55e', // Color verde
      icon: {
        className: 'fas fa-check-circle', // Ícono de FontAwesome
        tagName: 'i',
        color: 'white',
      },
    },
    {
      type: 'error', // Tipo de notificación de error
      backgroundColor: '#ef4444', // Color rojo
      icon: {
        className: 'fas fa-times-circle', // Ícono de FontAwesome
        tagName: 'i',
        color: 'white',
      },
    },
    {
      type: 'info', // Tipo de notificación personalizada
      backgroundColor: '#0ea5e9', // Color de fondo
      icon: {
        className: 'fas fa-info-circle', // Clase de ícono (FontAwesome)
        tagName: 'i',
        color: 'white',
      },
    },
  ],
});

// Mostrar una notificación de información

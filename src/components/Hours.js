import React, { useEffect, useState } from 'react';

// Función para obtener el día de la semana en español
const getDayOfWeek = () => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = new Date();
  return daysOfWeek[today.getDay()];
};

// Función para obtener el horario del día actual
const getCurrentHours = () => {
  const dayOfWeek = getDayOfWeek();
  const hours = {
    Lunes: '10:00 AM - 4:00 PM',
    Martes: '10:00 AM - 4:00 PM',
    Miércoles: '10:00 AM - 4:00 PM',
    Jueves: '10:00 AM - 4:00 PM',
    Viernes: '10:00 AM - 4:00 PM',
    Sábado: '9:00 AM - 8:00 PM',
    Domingo: '9:00 AM - 8:00 PM',
  };
  return hours[dayOfWeek];
};

// Función para verificar si estamos en el rango de horario
const isOpenNow = () => {
  const [start, end] = getCurrentHours().split(' - ');
  const now = new Date();
  const [startHour, startMinute] = start.match(/\d+/g).map(Number);
  const [endHour, endMinute] = end.match(/\d+/g).map(Number);
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), start.includes('PM') ? startHour + 12 : startHour, startMinute);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), end.includes('PM') && endHour !== 12 ? endHour + 12 : endHour, endMinute);
  return now >= startTime && now <= endTime;
};

// Horarios completos para mostrar en otra sección
const allHours = {
  Lunes: '10:00 AM - 4:00 PM',
  Martes: '10:00 AM - 4:00 PM',
  Miércoles: '10:00 AM - 4:00 PM',
  Jueves: '10:00 AM - 4:00 PM',
  Viernes: '10:00 AM - 4:00 PM',
  Sábado: '9:00 AM - 8:00 PM',
  Domingo: '9:00 AM - 8:00 PM',
};

const Hours = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpenNow());
  }, []); // Solo se ejecuta en el cliente

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Horario del día</h2>
      <div style={isOpen ? styles.currentOpen : styles.currentClosed}>
        <p>{`Hoy es ${getDayOfWeek()}`}</p>
        <p>{`Horario: ${getCurrentHours()}`}</p>
        <p>{isOpen ? '¡Estamos Abiertos!' : 'Cerrado'}</p>
      </div>

      <div style={styles.allHoursContainer}>
        <h3>Horarios de Apertura</h3>
        <ul style={styles.hoursList}>
          {Object.entries(allHours).map(([day, hours]) => (
            <li key={day} style={styles.hourItem}>
              <strong>{day}:</strong> {hours}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  currentOpen: {
    backgroundColor: '#DFF2BF',
    color: '#4F8A10',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  currentClosed: {
    backgroundColor: '#FFBABA',
    color: '#D8000C',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  allHoursContainer: {
    marginTop: '20px',
  },
  hoursList: {
    listStyleType: 'none',
    padding: '0',
  },
  hourItem: {
    fontSize: '18px',
    margin: '5px 0',
  },
};

export default Hours;
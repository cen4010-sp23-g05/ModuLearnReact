import React, { useState } from "react";
import "./styles/calendar.css";


function Calendar() {
  // Define the initial date state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Define the number of days in the week
  const daysOfWeek = [
    `${getDayOfWeekWithDate(currentDate, 1)}`,
    `${getDayOfWeekWithDate(currentDate, 2)}`,
    `${getDayOfWeekWithDate(currentDate, 3)}`,
    `${getDayOfWeekWithDate(currentDate, 4)}`,
    `${getDayOfWeekWithDate(currentDate, 5)}`,
    `${getDayOfWeekWithDate(currentDate, 6)}`,
    `${getDayOfWeekWithDate(currentDate, 7)}`
  ];

  // Define the number of days in the calendar
  const daysInCalendar = 7;

  // Calculate the start and end dates of the calendar
  const startDate = new Date(currentDate.getTime());
  startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  const endDate = new Date(startDate.getTime());
  endDate.setDate(startDate.getDate() + daysInCalendar - 1);

  // Calculate the dates for the calendar
  const dates = [];
  const currentDateCopy = new Date(startDate.getTime());
  while (currentDateCopy <= endDate) {
    dates.push(currentDateCopy);
    currentDateCopy.setDate(currentDateCopy.getDate() + 1);
  }

  // Get the name of the day of the week and the date
  function getDayOfWeekWithDate(date, index) {
    const currentDate = new Date(date.getTime());
    currentDate.setDate(date.getDate() - date.getDay() + index);
    const dayOfWeek = currentDate.toLocaleString('default', {weekday: 'short'});
    const dayOfMonth = currentDate.getDate();
    return `${dayOfWeek}-${dayOfMonth}`;
  }

  // Handle the previous week button click
  const handlePreviousWeekClick = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getTime());
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  // Handle the next week button click
  const handleNextWeekClick = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getTime());
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  // Render the calendar
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <a href="#">Home</a>
            <a href="#">Schedule</a>
            <a href="#">Class</a>
            <a href="#">Grades</a>
          </div>
          <div className="navbar-right">
            <button>Log Out</button>
            <button>My Profile</button>
          </div>
        </div>
      </nav>
      
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousWeekClick}>Previous Week</button>
          <h2>
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </h2>
          <button onClick={handleNextWeekClick}>Next Week</button>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div className="day">{day}</div>
          ))}
        </div>
        <div className="dates">
          {dates.map((date, index) => (
            <div className="date">
              <div className="date-label"> 
          
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
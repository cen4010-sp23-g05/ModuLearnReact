import "./styles/calendar.css";

import React from "react";
var moment = require("moment");

function Calendar() {
  // Generate a list of days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate a list of dates for the current month
  const today = moment();
  const firstDayOfMonth = moment(today).startOf("month");
  const endDayOfMonth = moment(today).endOf("month");
  const dates = [];
  let currentDay = moment(firstDayOfMonth);
  while (currentDay <= endDayOfMonth) {
    dates.push(currentDay);
    currentDay = moment(currentDay).add(1, "days");
  }

  // Render the calendar
  return (
    <div className="calendar">
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>
      <div className="dates">
        {dates.map((date) => (
          <div key={date.format("YYYY-MM-DD")} className="date">
            {date.format("ddd - MM/DD")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;

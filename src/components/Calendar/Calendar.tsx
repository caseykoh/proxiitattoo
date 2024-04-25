import { useState } from "react";
import CalendarDays from "./CalendarDays";

const Calendar = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedDay, setSelectedDay] = useState(new Date());

  const changeSelectedDay = (day: Date) => {
    setSelectedDay(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>
          {months[selectedDay.getMonth()]} {selectedDay.getFullYear()}
        </h2>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday) => {
            return (
              <div className="weekday">
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>
        <CalendarDays day={selectedDay} changeSelectedDay={changeSelectedDay} />
      </div>
    </div>
  );
};

export default Calendar;

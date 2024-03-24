import { NavLink } from "react-router-dom";
import "./CalendarSection.css";
import Calendar, { TileDisabledFunc } from "react-calendar";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { now } from "moment-timezone";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function isSameDay(a: Date, b: Date) {
  return differenceInCalendarDays(a, b) === 0;
}

function containsDate(dates: Date[], date: Date) {
  return dates.some(
    (dDate: Date) => dDate.toDateString() === date.toDateString()
  );
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarSection() {
  const [date, onChange] = useState<Value>(new Date());
  const availableDates = [
    new Date(2024, 2, 25), // 2 is March, programming counting
    new Date(2024, 2, 26),
    new Date(2024, 2, 30),
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());

  function onSelect(nextValue: Value, event: any) {
    onChange(nextValue);
    if (nextValue) {
      setSelectedDate(new Date(nextValue.toString()));
    }
  }

  return (
    <section className="calendar-section">
      <div className="calendar-container">
        <div className="calendar-container-content">
          <Calendar
            onChange={onSelect}
            calendarType="gregory"
            // tileClassName={({ activeStartDate, date, view }) =>
            //   view === "month" && date === selectedDate ? "selected-tile" : null
            // }
            tileDisabled={({ date, view }) => {
              if (view === "month") {
                return !containsDate(availableDates, date);
              }
              return true;
            }}
            value={date}
            showFixedNumberOfWeeks={true}
            minDate={new Date(2024, 2, 1)}
            maxDate={new Date(2024, 3, 31)}
            minDetail="month"
            next2Label=""
            nextLabel={<IoChevronForward />}
            prev2Label=""
            prevLabel={<IoChevronBack />}
          />
          {containsDate(availableDates, selectedDate) && (
            <>
              <p>1 spot available on {selectedDate.toDateString()}</p>
              <div className="booking-button">
                <NavLink to="/booking" className="booking-link">
                  book
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CalendarSection;

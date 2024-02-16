// CalendarApp.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarApp.css';
import Memo from './Memo'; 

const CalendarApp = () => {
  const [memos, setMemos] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMemoModal, setShowMemoModal] = useState(false);
  const handleDateClick = (newDate) => {
    setSelectedDate(newDate);
    setShowMemoModal(false);
  }
  
  const tileContent = ({ date }) => {
    const dateString = date.toDateString();
    const memo = memos[dateString];
    if (memo) {
      return (
        <div className="memo-content">
          <p className='memo-count'>{`일정: 개`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-app">
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
          tileContent={tileContent}
        />
      </div>
      <div className="memo-container">
        <Memo 
          selectedDate={selectedDate} 
          memos={memos}
          showMemoModal={showMemoModal}
          setShowMemoModal={setShowMemoModal}
        />
      </div>
    </div>
  );
};

export default CalendarApp;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarApp.css';

const AppleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memos, setMemos] = useState({});
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [memo, setMemo] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleDateClick = (newDate) => {
    setSelectedDate(newDate);
    setShowMemoModal(true);

    const memoForDate = memos[newDate.toDateString()];
    if (memoForDate) {
      setMemo(memoForDate.memo);
      setStartTime(memoForDate.startTime);
      setEndTime(memoForDate.endTime);
    } else {
      setMemo('');
      setStartTime(null);
      setEndTime(null);
    }

    setEditMode(false);
  };

  const handleMemoModalClose = () => {
    setShowMemoModal(false);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const saveMemo = () => {
    const newMemo = {
      memo,
      startTime,
      endTime,
    };
    setMemos({ ...memos, [selectedDate.toDateString()]: newMemo });
    setShowMemoModal(false);
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const onSelectStartTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    setStartTime(`${hours}:${minutes}`);
    setIsSelected(true);
    setEndTime(null);
  };

  const onSelectEndTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    setEndTime(`${hours}:${minutes}`);
  };

  return (
    <div className="apple-calendar">
      <div className="modal-container" style={{ display: showMemoModal ? 'flex' : 'none' }}>
        <div className="memo-container">
          <h2>{selectedDate.toDateString()}</h2>
          <div className="memo-editor">
            {editMode ? (
              <>
                <textarea
                  placeholder="메모를 입력하세요"
                  value={memo}
                  onChange={handleMemoChange}
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => onSelectStartTime(e.target.value)}
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => onSelectEndTime(e.target.value)}
                />
              </>
            ) : (
              <>
                <p>{startTime} ~ {endTime} {memo}</p>
              </>
            )}
            {editMode ? (
              <button onClick={saveMemo}>메모 저장</button>
            ) : (
              <button onClick={enterEditMode}>수정</button>,
              <button onClick={enterEditMode}>메모 추가</button>
            )}
          </div>
          <button onClick={handleMemoModalClose}>닫기</button>
        </div>
      </div>
      
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const memoForDay = memos[date.toDateString()];
              return memoForDay && <p style={{ margin: 0 }}>{memoForDay.memo}</p>;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default AppleCalendar;
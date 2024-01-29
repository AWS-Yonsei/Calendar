import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarApp.css';

const AppleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // 편집 모드 추가

  const handleDateClick = (newDate) => {
    setSelectedDate(newDate);
    setShowMemoModal(true);

    if (memos[newDate.toDateString()]) {
      setMemo(memos[newDate.toDateString()]);
    } else {
      setMemo('');
    }

    // 편집 모드를 끝내고 보기 모드로 전환
    setEditMode(false);
  };

  const handleMemoModalClose = () => {
    setShowMemoModal(false);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const saveMemo = () => {
    setMemos({ ...memos, [selectedDate.toDateString()]: memo });
    setShowMemoModal(false);
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  return (
    <div className="apple-calendar">
      <div className="modal-container" style={{ display: showMemoModal ? 'flex' : 'none' }}>
        <div className="memo-container">
          <h2>{selectedDate.toDateString()}</h2>
          <div className="memo-editor">
            {editMode ? ( // 편집 모드일 때 텍스트 에디터 보여주기
              <textarea
                placeholder="메모를 입력하세요"
                value={memo}
                onChange={handleMemoChange}
              />
            ) : (
              <p>{memo}</p> // 보기 모드일 때 텍스트 보여주기
            )}
            {editMode ? ( // 편집 모드일 때 "저장" 버튼 보여주기
              <button onClick={saveMemo}>메모 저장</button>
            ) : (
              <button onClick={enterEditMode}>편집</button> // 보기 모드일 때 "편집" 버튼 보여주기
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
              return memoForDay && <p style={{ margin: 0 }}>{memoForDay}</p>;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default AppleCalendar;

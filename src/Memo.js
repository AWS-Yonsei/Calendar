// Memo.js
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import './Memo.css';

const Memo = ({ selectedDate, memos, showMemoModal, setShowMemoModal }) => {
  const [memoList, setMemoList] = useState([]);
  const [startTimeHour, setStartTimeHour] = useState('');
  const [startTimeMinute, setStartTimeMinute] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');

  useEffect(() => {
    getData();
    const selectedDateString = selectedDate.toDateString();
    if (memos[selectedDateString]) {
      setMemoList(memos[selectedDateString]);
    } else {
      setMemoList([]);
    }
  }, [selectedDate, memos]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/calendar/date');
      const { success, schedules } = response.data;
      if (success) {
        const formattedMemos = schedules.map(schedule => ({
          content: schedule.attendee,
          startTime: new Date(schedule.startTime),
          patientName: schedule.attendee,
          patientID: schedule.content,
          color: getMemoColor(memoList.length),
        }));
        setMemoList(formattedMemos);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };


  const getMemoColor = (index) => {
    switch (index) {
      case 0:
        return '#7FFF00'; // 연두색
      case 1:
        return '#FFA500'; // 주황색
      case 2:
        return '#FF6347'; // 연한 빨간색
      case 3:
        return '#800080'; // 보라색
      case 4:
        return '#87CEEB'; // 하늘색
      default:
        return '#000000'; // 기본 색상
    }
  };

  const addMemo = async () => {
    const startTime = `${startTimeHour.padStart(2, '0')}:${startTimeMinute.padStart(2, '0')}`;
    const newMemo = {
      content: patientID,
      startTime: startTime,
      attendee: patientName,
      color: getMemoColor(memoList.length),
    };

    try {
      await axios.post('http://localhost:8080/calendar/create', newMemo);
  
      const updatedMemoList = [...memoList, newMemo];
      setMemoList(updatedMemoList);
      setShowMemoModal(false);
      setStartTimeHour('');
      setStartTimeMinute('');
      setPatientName('');
      setPatientID('');
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };

  const editMemo = (id) => {
    // 메모 수정 기능 구현
    console.log(`메모 ${id} 수정`);
  };

  const deleteMemo = (id) => {
    // 메모 삭제 기능 구현
    console.log(`메모 ${id} 삭제`);
  };

  const renderMemoList = () => {
    return memoList.map((memo, index) => (
      <div key={index} className="memo-item" >
        <p className="start-time">{memo.startTime}</p>
        <div className="memo-content" style={{ backgroundColor: memo.color }}>
          <p style={{ whiteSpace: 'pre-line' }}>{`환자 이름: ${memo.patientName}\n환자 ID: ${memo.patientID}`}</p>
        </div>
        <div className="memo-actions">
            <button onClick={() => editMemo(memo.id)}>수정</button>
            <button onClick={() => deleteMemo(memo.id)}>삭제</button>
          </div>
      </div>
      
    ));
  };

  const handleAddMemoClick = () => {
    setShowMemoModal(true);
  };

  return (
    <div className="memo">
      <div className="calendar-container">
        <h2>{selectedDate.toDateString()}</h2>
        {renderMemoList()}
        {!showMemoModal && (
          <button onClick={handleAddMemoClick}>메모 추가</button>
        )}
        {showMemoModal && (
          <div className="modal">
            <h2>메모 추가</h2>
            <label>진료 시간:</label>
            <div>
              <select value={startTimeHour} onChange={(e) => setStartTimeHour(e.target.value)}>
                {[...Array(25).keys()].map((hour) => (
                  <option key={hour} value={hour.toString().padStart(2, '0')}>
                    {hour.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              시
              <select value={startTimeMinute} onChange={(e) => setStartTimeMinute(e.target.value)}>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              분
            </div>
            <label>환자 이름:</label>
            <textarea rows="1" cols="5" value={patientName} onChange={(e) => setPatientName(e.target.value)} /><br/>
            <label>환자 ID:</label>
            <textarea rows="1" cols="2" value={patientID} onChange={(e) => setPatientID(e.target.value)} /><br/>
            <button onClick={addMemo}>추가</button>
            <button onClick={() => setShowMemoModal(false)}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;

import React, { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import AddNotice from "./AddNotice";

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function MyNotices() {
  const [myNotices, setMyNotices] = useState([]); // 공지 데이터 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    const fetchMyNotices = async () => {
      const response = await fetch(MOCKAPI_URL);
      const data = await response.json();
      setMyNotices(data);
    };
    fetchMyNotices();
  }, []);

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 공지 삭제 함수
  const deleteNotice = async (id) => {
    try {
      await fetch(`${MOCKAPI_URL}/${id}`, { method: "DELETE" }); // MockAPI에서 데이터 삭제
      setMyNotices((prev) => prev.filter((notice) => notice.id !== id)); // 상태에서 해당 공지 제거
    } catch (error) {
      console.error("Error deleting notice:", error); // 삭제 중 에러 처리
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="back-button"
        style={{ marginTop: "20px" }}
      >
        Add Notice
      </button>

      <div className="card-wrapper">
        {myNotices.map((notice) => (
          <div
            key={notice.id}
            style={{ width: "60%", margin: "10px", padding: "10px" }}
          >
            <NoticeCard notice={notice} />
            <button
              className="back-button"
              onClick={() => deleteNotice(notice.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 모달 표시 */}
      {isModalOpen && (
        <AddNotice closeModal={closeModal} setMyNotices={setMyNotices} />
      )}
    </div>
  );
}

export default MyNotices;

import React, { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import AddNotice from "./AddNotice";

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function MyNotices() {
    const [myNotices, setMyNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    useEffect(() => {
        const fetchMyNotices = async () => {
            const response = await fetch(MOCKAPI_URL);
            const data = await response.json();
            setMyNotices(data);
        };
        fetchMyNotices();
    }, []);

    const deleteNotice = async (id) => {
        await fetch(`${MOCKAPI_URL}/${id}`, { method: "DELETE" });
        setMyNotices((prev) => prev.filter((notice) => notice.id !== id));
    };

    const openModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div>
            <button onClick={openModal} style={{ marginTop: "20px" }}>
                Add Notice
            </button>

            <div className="card-wrapper">
                {myNotices.map((notice) => (
                    <div
                        key={notice.id}
                        style={{
                            width: "60%",
                            margin: "10px",
                            padding: "10px",
                        }}>
                        <NoticeCard notice={notice} />
                        <button className="back-button" onClick={() => deleteNotice(notice.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && <AddNotice closeModal={closeModal} setMyNotices={setMyNotices} />}
        </div>
    );
}

export default MyNotices;

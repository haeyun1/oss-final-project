import React, { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import AddNotice from "./AddNotice";

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function MyNotices() {
    const [myNotices, setMyNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNotice, setEditNotice] = useState(null); // Store the notice being edited

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

    const openModal = (notice = null) => {
        setEditNotice(notice); // If no notice, it will be for adding a new one
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setEditNotice(null); // Reset the edit notice when closing
    };

    return (
        <div>
            <button onClick={() => openModal()} style={{ marginTop: "20px" }}>
                Add Notice
            </button>

            <div className="card-wrapper">
                {myNotices.map((notice) => (
                    <div
                        key={notice.id}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            margin: "10px",
                        }}>
                        <NoticeCard notice={notice}>
                            <button className="add-button" onClick={() => openModal(notice)}>
                                Edit
                            </button>
                            <button className="add-button" onClick={() => deleteNotice(notice.id)}>
                                Delete
                            </button>
                        </NoticeCard>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <AddNotice
                    closeModal={closeModal}
                    setMyNotices={setMyNotices}
                    editNotice={editNotice} // Pass the notice to be edited
                />
            )}
        </div>
    );
}

export default MyNotices;

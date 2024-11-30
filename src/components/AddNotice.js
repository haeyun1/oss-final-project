import React, { useState } from "react";

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function AddNotice({ closeModal, setMyNotices }) {
    const [newNotice, setNewNotice] = useState({
        title: "",
        date: "",
        date_sale_start: "",
        date_sale_end: "",
        ongoing_flag: false,
        url: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNotice((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setNewNotice((prev) => ({ ...prev, ongoing_flag: e.target.checked }));
    };

    const addNotice = async () => {
        const response = await fetch(MOCKAPI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newNotice),
        });
        const addedNotice = await response.json();

        // 새로운 공지를 목록에 추가
        setMyNotices((prev) => [...prev, addedNotice]);

        // 폼 리셋
        setNewNotice({
            title: "",
            date: "",
            date_sale_start: "",
            date_sale_end: "",
            ongoing_flag: false,
            url: "",
        });

        // 모달 닫기
        closeModal();
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "5px",
                    width: "400px",
                }}>
                <h3>Add a new notice</h3>
                <form>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" value={newNotice.title} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="text" name="date" value={newNotice.date} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Sale Start Date</label>
                        <input
                            type="text"
                            name="date_sale_start"
                            value={newNotice.date_sale_start}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Sale End Date</label>
                        <input
                            type="text"
                            name="date_sale_end"
                            value={newNotice.date_sale_end}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Ongoing</label>
                        <input
                            type="checkbox"
                            name="ongoing_flag"
                            checked={newNotice.ongoing_flag}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div>
                        <label>URL</label>
                        <input type="text" name="url" value={newNotice.url} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button type="button" onClick={addNotice}>
                            Add Notice
                        </button>
                        <button type="button" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNotice;

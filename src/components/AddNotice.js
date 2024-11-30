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
    try {
      const response = await fetch(MOCKAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });

      const addedNotice = await response.json();
      setMyNotices((prev) => [...prev, addedNotice]);

      // 초기화 후 모달 닫기
      setNewNotice({
        title: "",
        date: "",
        date_sale_start: "",
        date_sale_end: "",
        ongoing_flag: false,
        url: "",
      });

      closeModal();
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add a New Notice</h3>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newNotice.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              type="text"
              name="date"
              value={newNotice.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Sale Start Date:
            <input
              type="text"
              name="date_sale_start"
              value={newNotice.date_sale_start}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Sale End Date:
            <input
              type="text"
              name="date_sale_end"
              value={newNotice.date_sale_end}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Ongoing:
            <input
              type="checkbox"
              name="ongoing_flag"
              checked={newNotice.ongoing_flag}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            URL:
            <input
              type="text"
              name="url"
              value={newNotice.url}
              onChange={handleInputChange}
            />
          </label>
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

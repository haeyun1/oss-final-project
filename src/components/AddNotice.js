import React, { useState, useEffect } from "react";

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function AddNotice({ closeModal, setMyNotices, editNotice }) {
  const [newNotice, setNewNotice] = useState({
    title: "",
    date: "",
    date_sale_start: "",
    date_sale_end: "",
    ongoing_flag: false,
    url: "",
  });

  useEffect(() => {
    if (editNotice) {
      setNewNotice(editNotice); // Pre-fill the form if editing an existing notice
    }
  }, [editNotice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setNewNotice((prev) => ({ ...prev, ongoing_flag: e.target.checked }));
  };

  const addOrEditNotice = async () => {
    let response;
    if (editNotice) {
      // Update the existing notice
      response = await fetch(`${MOCKAPI_URL}/${editNotice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });
    } else {
      // Add a new notice
      response = await fetch(MOCKAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });
    }

    const addedOrUpdatedNotice = await response.json();

    if (editNotice) {
      // If editing, update the notice in the list
      setMyNotices((prev) =>
        prev.map((notice) =>
          notice.id === addedOrUpdatedNotice.id ? addedOrUpdatedNotice : notice
        )
      );
    } else {
      // If adding, add the new notice to the list
      setMyNotices((prev) => [...prev, addedOrUpdatedNotice]);
    }

    // Reset form and close modal
    setNewNotice({
      title: "",
      date: "",
      date_sale_start: "",
      date_sale_end: "",
      ongoing_flag: false,
      url: "",
    });
    closeModal();
  };

  return (
    <div className="addNotice__overlay">
      <div className="addNotice__modalContainer">
        <h3 className="addNotice__modalHeader">
          {editNotice ? "Edit Notice" : "Add a new notice"}
        </h3>
        <form>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">Title</label>
            <input
              type="text"
              name="title"
              value={newNotice.title}
              onChange={handleInputChange}
              className="addNotice__input"
            />
          </div>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">Date</label>
            <input
              type="date"
              name="date"
              value={newNotice.date}
              onChange={handleInputChange}
              className="addNotice__input"
            />
          </div>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">Sale Start Date</label>
            <input
              type="date"
              name="date_sale_start"
              value={newNotice.date_sale_start}
              onChange={handleInputChange}
              className="addNotice__input"
            />
          </div>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">Sale End Date</label>
            <input
              type="date"
              name="date_sale_end"
              value={newNotice.date_sale_end}
              onChange={handleInputChange}
              className="addNotice__input"
            />
          </div>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">Ongoing</label>
            <input
              type="checkbox"
              name="ongoing_flag"
              checked={newNotice.ongoing_flag}
              onChange={handleCheckboxChange}
              className="addNotice__checkbox"
            />
          </div>
          <div className="addNotice__formGroup">
            <label className="addNotice__label">URL</label>
            <input
              type="text"
              name="url"
              value={newNotice.url}
              onChange={handleInputChange}
              className="addNotice__input"
            />
          </div>
          <div className="addNotice__buttonContainer">
            <button
              type="button"
              onClick={addOrEditNotice}
              className="addNotice__button"
            >
              {editNotice ? "Update Notice" : "Add Notice"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="addNotice__closeButton"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotice;

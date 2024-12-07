import React from "react";
import "../App.css";

function NoticeCard({ notice, children }) {
    const formatDate = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
        const day = newDate.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="notice-card">
            <h3 className="title">{notice.title}</h3>
            <p className="content">{formatDate(notice.date)}</p>
            <div className="footer">{children}</div>
        </div>
    );
}

export default NoticeCard;

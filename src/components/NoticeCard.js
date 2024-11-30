import React from "react";
import "../App.css"; // CSS 파일을 임포트합니다.

function NoticeCard({ notice }) {
    return (
        <div className="notice-card">
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-date">
                Date: <span>{notice.date}</span>
            </p>
            <p className="notice-sale-start">
                Sale Start: <span>{notice.date_sale_start}</span>
            </p>
            <p className="notice-sale-end">
                Sale End: <span>{notice.date_sale_end}</span>
            </p>
            <a href={notice.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More
            </a>
        </div>
    );
}

export default NoticeCard;

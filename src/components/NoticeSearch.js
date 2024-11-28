import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다.
import NoticeCard from "./NoticeCard";
import "../App.css"; // CSS 파일을 임포트합니다.

const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function NoticeSearch() {
    const [notices, setNotices] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능을 만듭니다.

    useEffect(() => {
        const fetchNotices = async () => {
            const response = await fetch(MOCKAPI_URL);
            const data = await response.json();
            setNotices(data || []); // MockAPI에서 받아온 공지사항을 상태에 저장
        };
        fetchNotices();
    }, []);

    const filteredNotices = notices.filter((notice) => notice.title.toLowerCase().includes(query.toLowerCase()));

    // 이전 페이지로 돌아가기 함수
    const goBack = () => {
        navigate(-1); // navigate(-1)은 이전 페이지로 돌아가게 만듭니다.
    };

    return (
        <div className="notice-search">
            <button className="back-button" onClick={goBack}>
                &#8592; Back
            </button>

            <input
                type="text"
                placeholder="Search notices..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // 사용자가 입력할 때마다 query 상태 변경
                className="search-input"
            />

            <div className="notice-list">
                {filteredNotices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                ))}
            </div>
        </div>
    );
}

export default NoticeSearch;

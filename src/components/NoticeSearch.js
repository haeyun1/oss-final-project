import React, { useState } from "react";
import NoticeCard from "./NoticeCard";
import "../App.css";

function NoticeSearch({ notices }) {
    const [query, setQuery] = useState(""); // 검색어 상태
    const [filteredNotices, setFilteredNotices] = useState(notices); // 초기 필터된 공지사항 상태

    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery); // 입력된 검색어 상태 업데이트

        // 검색어를 포함한 공지사항을 필터링
        const result = notices.filter((notice) => notice.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredNotices(result); // 필터링된 결과 상태 업데이트
    };

    const handleAddNotice = async (notice) => {
        try {
            const response = await fetch("https://6744288fb4e2e04abea10909.mockapi.io/notices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notice),
            });
            if (!response.ok) {
                throw new Error("Error adding to MockAPI");
            }
            console.log("Data added to MockAPI:", notice);
            alert("Data Added!");
        } catch (error) {
            console.error("Error adding data to MockAPI:", error);
        }
    };

    return (
        <div className="notice-search">
            <span className="searchT">Search </span>
            <input
                type="text"
                placeholder="Search notices..."
                value={query}
                onChange={handleSearch} // 실시간 검색 처리
                className="search-input"
            />
            <div className="notice-list">
                {filteredNotices.length === 0
                    ? "No matching notices found."
                    : filteredNotices.map((notice) => (
                          <div key={notice.id} className="notice-card-wrapper">
                              <NoticeCard notice={notice}>
                                  <button onClick={() => handleAddNotice(notice)} className="add-button">
                                      Add
                                  </button>
                              </NoticeCard>
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default NoticeSearch;

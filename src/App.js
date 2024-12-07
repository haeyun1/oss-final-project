import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoticeSearch from "./components/NoticeSearch";
import Navbar from "./components/Navbar";

const API_KEY = "test_b855160fb46b2937959542bd0fedd8ff0edb7c56f13ebcacda6a8838ddfa2328efe8d04e6d233bd35cf2fabdeb93fb0d";
const API_URL = "https://open.api.nexon.com/maplestory/v1/notice-cashshop";

function App() {
    const [notices, setNotices] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    "x-nxopen-api-key": API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error("API error");
            }

            const rawData = await response.json();
            const fetchedNotices = rawData.cashshop_notice || [];
            setNotices(fetchedNotices); // API 데이터 상태에 저장
            setDataFetched(true);

            // 로컬 스토리지에 데이터 저장 (한 번만 저장)
            localStorage.setItem("notices", JSON.stringify(fetchedNotices));
        } catch (error) {
            console.error("Error fetching API data:", error);
        }
    };

    useEffect(() => {
        fetchDataFromAPI(); // API에서 데이터 가져오기
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/search"
                    element={
                        dataFetched ? (
                            <NoticeSearch notices={notices} />
                        ) : (
                            <div>Loading...</div> // 데이터가 페치되기 전까지 Loading 메시지 출력
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

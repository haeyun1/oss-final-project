import Home from "./components/Home";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoticeSearch from "./components/NoticeSearch";

function NavigateButton() {
    const navigate = useNavigate();

    const goToSearch = () => {
        navigate("/search");
    };

    return <button onClick={goToSearch}>Go to Notice Search</button>;
}

const API_KEY = "test_b855160fb46b2937959542bd0fedd8ff0edb7c56f13ebcacda6a8838ddfa2328efe8d04e6d233bd35cf2fabdeb93fb0d";
const API_URL = "https://open.api.nexon.com/maplestory/v1/notice-cashshop";
const MOCKAPI_URL = "https://6744288fb4e2e04abea10909.mockapi.io/notices";

function App() {
    const [dataFetched, setDataFetched] = useState(false);

    const clearMockAPI = async () => {
        try {
            const response = await fetch(MOCKAPI_URL);
            const existingData = await response.json();

            for (const item of existingData) {
                await fetch(`${MOCKAPI_URL}/${item.id}`, {
                    method: "DELETE",
                });
            }

            console.log("MockAPI cleared.");
        } catch (error) {
            console.error("Error clearing MockAPI:", error);
        }
    };

    const addToMockAPI = async (data) => {
        try {
            await fetch(MOCKAPI_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    createdAt: new Date().toISOString(),
                    modifiedAt: new Date().toISOString(),
                }),
            });
            console.log("Data added to MockAPI:", data);
        } catch (error) {
            console.error("Error adding data to MockAPI:", error);
        }
    };

    const initialize = useCallback(async () => {
        if (dataFetched) return;

        try {
            // Clear MockAPI before adding new data
            await clearMockAPI();

            const response = await fetch(API_URL, {
                headers: {
                    "x-nxopen-api-key": API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const rawData = await response.json();
            console.log("Raw API Data:", rawData);

            const notices = rawData.cashshop_notice || [];
            console.log("Notices:", notices);

            for (const notice of notices) {
                const processedData = {
                    title: notice.title || "Untitled",
                    date: notice.date || new Date().toISOString(),
                    date_sale_start: notice.date_sale_start || "N/A",
                    date_sale_end: notice.date_sale_end || "N/A",
                    notice_id: notice.notice_id || "N/A",
                    ongoing_flag: notice.ongoing_flag || "false",
                    url: notice.url || "#",
                };
                await addToMockAPI(processedData);
            }

            setDataFetched(true);
        } catch (error) {
            console.error("Error fetching or processing API data:", error);
        }
    }, [dataFetched]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <BrowserRouter>
            <NavigateButton />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<NoticeSearch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

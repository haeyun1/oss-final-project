import React from "react";
import MyNotices from "./MyNotices";

function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Maple Cash Shop Notices Manager</h1>
            <p>Search, filter, and manage your favorite MapleStory notices!</p>
            <MyNotices />
        </div>
    );
}

export default Home;

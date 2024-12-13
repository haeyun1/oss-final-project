import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트를 import 합니다.

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link> {/* 홈으로 이동하는 링크 */}
                </li>
                <img className="nav-img" src="https://blog.kakaocdn.net/dn/bwbgz6/btsFFXP9Kub/lOQHfqPuNvcxRes1ZAY2Yk/img.png"/>

                <li>
                    <Link to="/search">Search</Link> {/* 검색 페이지로 이동하는 링크 */}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

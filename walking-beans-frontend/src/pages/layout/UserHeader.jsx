import {useEffect, useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/User.css";

import logoImg from "../../images/walkingBeans.svg";
import userIcon from "../../images/user.svg";
import storeIcon from "../../images/store.svg";
import riderIcon from "../../images/rider.svg";
import alarmIcon from "../../images/alarm.svg";
import searchIcon from "../../images/search.svg";
import toggleIcon from "../../images/toggle.svg";
import apiUserService from "../../service/apiUserService";
import AdminAlarmList from "../admin/AdminAlarmList";


const UserHeader = () => {
    const [isToggleOpen, setIsToggleOpen] = useState(false); // 상태 추가
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [showAlarm, setShowAlarm] = useState(false);

    useEffect(() => {
        apiUserService.sessionData(setUser);
    }, []);

    // role에 따라 왼쪽 아이콘 변경
    const getRoleIcon = () => {
        if (!user) return userIcon; // 비회원 (기본 사용자 아이콘)
        switch (user.role) {
            case "store":
                return storeIcon; // 점주 아이콘
            case "rider":
                return riderIcon; // 라이더 아이콘
            default:
                return userIcon; // 기본 사용자 아이콘
        }
    };
    // 토글 버튼 클릭 이벤트
    const handleToggleClick = () => {
        if (!user) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        setIsToggleOpen((prev) => !prev);
    };


    const AlarmClick = () => {
        setShowAlarm(prevState => !prevState);
    }
    return (
        <header className="user-header">
            {/*왼쪽 아이콘*/}
            <div className="left-icons">
                <img src={getRoleIcon()}  className="header-icon" />
            </div>
            {/*메인 로고*/}
            <div className="MainLogo">
                <img src={logoImg}  className="logo-img" />
            </div>

            {/* 오른쪽 아이콘 */}
            <div className="user-right-icons">
                <img
                    src={alarmIcon}
                    className="header-icon"
                    onClick={AlarmClick}  // 알람 클릭 시 상태 토글
                    alt="알람 아이콘"
                />
                {showAlarm && <AdminAlarmList />}
                <img src={searchIcon} className="header-icon"/>
                <img src={toggleIcon} className="header-icon" onClick={handleToggleClick}/>
            </div>


        </header>
    );
};
export default UserHeader;


import React, {useState, useEffect} from 'react';
import axios from 'axios';
import apiUserService from "../../service/apiUserService";
import {useNavigate} from "react-router-dom"; // 또는 다른 HTTP 클라이언트 라이브러리
import '../../css/admin/AdminMypageInfoCorrection.css';
import RiderHeader from "../layout/RiderHeader";


function InfoCorrectionPage() {
    const [userId, setuserId] = useState('null');
    const [userPhone, setUserPhone] = useState('');
    const [Update, setUpdate] = useState(false)
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("user");

    // 페이지 로드 시 사용자 ID 가져오기 (URL 파라미터 또는 세션/로컬 스토리지에서)
    useEffect(() => {
        apiUserService.sessionData((response) => {  //  sessionData() 올바르게 호출
            console.log("현재 유저 role:", response?.user_role);
            if (response && response.user_id) {
                setuserId(response.user_id);  //  userId 설정
                setUserRole(response.user_role || "user");
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");  //  로그인 페이지로 이동
            }
        });
    }, [navigate]);

    useEffect(() => {
        if (Update && userId)
            apiUserService.infoCorrection(
                userId,
                userPhone,
                () => {
                    alert("전화번호가 성공적으로 수정되었습니다.");
                    setUpdate(false);
                },
                () => {
                    alert("전화번호 수정에 실패하였습니다.");
                    setUpdate(false);
                }
            );
    }, [Update, userId, userPhone]);

    return (
        <div className={`info-correction-container  ${userRole}`}>
            <form>
                <div className="info-correction">
                    <label htmlFor="userPhone">변경할 전화번호를 작성해 주세요.</label>
                    <input
                        id="userPhone"
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        pattern="[0-9]{3}[0-9]{3,4}[0-9]{4}"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" onClick={() => setUpdate(true)}>수정하기</button>
            </form>
        </div>
    );
}

export default InfoCorrectionPage;




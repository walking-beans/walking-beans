
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 또는 다른 HTTP 클라이언트 라이브러리

function InfoCorrectionPage() {
    const [userId, setUserId] = useState('');
    const [userPhone, setUserPhone] = useState('');

    // 페이지 로드 시 사용자 ID 가져오기 (URL 파라미터 또는 세션/로컬 스토리지에서)
    useEffect(() => {
        apiUserService.SessionData((response) => {
            if (response && response.userId) {
                setUserId(response.userId); // 로그인한 사용자의 userId 설정
            } else {
                alert("로그인이 필요합니다.");
                window.location.href = "/login";
            }
        });
    }, []);

    // 선택사항: 기존 전화번호 정보 가져오기
    // const fetchUserPhone = async (id) => {
    //   try {
    //     const response = await axios.get(`/api/user/${id}`);
    //     setUserPhone(response.data.userPhone || '');
    //   } catch (error) {
    //     console.error('사용자 정보 가져오기 실패:', error);
    //   }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // PUT 요청으로 전화번호 수정
            await axios.put('/api/infoCorrection', null, {
                params: {
                    userId,
                    userPhone
                }
            });

            alert('전화번호가 성공적으로 수정되었습니다.');
            // 필요한 경우 성공 후 리다이렉트
            // window.location.href = '/mypage';
        } catch (error) {
            console.error('전화번호 수정 중 오류 발생:', error);
            alert('전화번호 수정에 실패했습니다.');
        }
    };

    return (
        <div className="info-correction-container">
            <h2>전화번호 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userPhone">새 전화번호:</label>
                    <input
                        id="userPhone"
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                        required
                    />
                    <small>형식: 010-1234-5678</small>
                </div>
                <button type="submit" className="submit-btn">수정하기</button>
            </form>
        </div>
    );
}

export default InfoCorrectionPage;




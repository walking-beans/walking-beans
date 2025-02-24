import React, { useState, useEffect } from "react";
import axios from "axios";

const UserInsertAddress = () => {
    const [userId, setUserId] = useState(null); // 로그인된 사용자 ID 저장
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [extraAddress, setExtraAddress] = useState("");

    useEffect(() => {
        // 로그인된 사용자 정보 가져오기
        axios
            .get("http://localhost:7070/api/users/login", { withCredentials: true }) // 쿠키 포함 요청
            .then((response) => {
                setUserId(response.data.userId);
            })
            .catch((error) => {
                console.error("로그인 정보 가져오기 실패:", error);
            });

        // 카카오 주소 API 스크립트 추가
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // 카카오 주소 검색 API 실행
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let fullAddress = data.address; // 기본 주소
                let extraAddr = ""; // 참고항목

                if (data.addressType === "R") {
                    if (data.bname) extraAddr += data.bname;
                    if (data.buildingName) extraAddr += (extraAddr ? ", " : "") + data.buildingName;
                }

                setPostcode(data.zonecode);
                setAddress(fullAddress);
                setExtraAddress(extraAddr);

                // 카카오 지도 API를 이용해 좌표 정보 가져오기
                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(fullAddress, function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setLatitude(result[0].y); // 위도 저장
                        setLongitude(result[0].x); // 경도 저장
                    } else {
                        console.error("좌표 변환 실패");
                    }
                });
            },
        }).open();
    };

    // 주소 데이터 백엔드로 전송
    const handleAddressSubmit = async () => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const fullAddress = `${address} ${detailAddress} ${extraAddress}`.trim();

        const addressData = {
            userId: userId, // ✅ 로그인된 사용자 ID 사용
            address: address, // 기본 주소
            addressName: fullAddress, // 주소 + 상세주소 + 참고항목
            addressLatitude: latitude, // ✅ 카카오 API에서 가져온 위도
            addressLongitude: longitude, // ✅ 카카오 API에서 가져온 경도
            addressRole: 1, // 기본 주소 설정 (0: 서브, 1: 메인)
        };

        try {
            const response = await axios.post("http://localhost:7070/api/addresses/UserInsertAddress", addressData, {
                withCredentials: true, // 쿠키 포함
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("주소가 성공적으로 저장되었습니다!");
            }
        } catch (error) {
            console.error("주소 저장 실패", error);
            alert("주소 저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <p>로그인된 사용자 ID: {userId}</p>
            <input type="text" id="sample6_postcode" placeholder="우편번호" value={postcode} readOnly />
            <button onClick={handleSearchAddress}>우편번호 찾기</button>
            <br />
            <input type="text" id="sample6_address" placeholder="주소" value={address} readOnly />
            <br />
            <input type="text" id="sample6_detailAddress" placeholder="상세주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
            <input type="text" id="sample6_extraAddress" placeholder="참고항목" value={extraAddress} readOnly />
            <br />
            <button onClick={handleAddressSubmit}>주소 저장</button>
        </div>
    );
};

export default UserInsertAddress;

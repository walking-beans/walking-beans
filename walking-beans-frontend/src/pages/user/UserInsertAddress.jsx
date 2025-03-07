import {useEffect, useState} from "react";
import axios from "axios";

const UserInsertAddress = ({ user }) => {
    const [address, setAddress] = useState(""); // 주소
    const [addressName, setAddressName] = useState(""); // 주소 별칭
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
            console.log(currentUser);
        }
    }, [user]);

    useEffect(() => {
        // 카카오 주소 API 스크립트 추가
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    //  카카오 주소 검색 함수
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.roadAddress); // 선택한 도로명 주소 저장
            },
        }).open();
    };

    //  주소 저장 API (POST 요청)
    const handleSaveAddress = async () => {
        if (!address || !addressName) {
            alert("주소와 별칭을 입력해주세요!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:7070/api/addresses/UserInsertAddress", { addressName, address }); // 서버에 데이터 전송
            console.log("응답 데이터 : " ,res.data)
            alert("주소가 저장되었습니다!");
            setAddress(""); // 입력 필드 초기화
            setAddressName("");
            user(); // 저장 후 주소 목록 갱신
        } catch (error) {
            console.error("주소 저장 오류:", error);
            alert("주소 저장에 실패했습니다.");
        }
    };

    return (
        <div>
            <button onClick={handleSearchAddress}>주소 검색</button>
            <input
                type="text"
                value={address}
                readOnly
                placeholder="선택한 주소"
            />
            <input
                type="text"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                placeholder="주소 별칭 (예: 우리 집, 회사)"
            />
            <button onClick={handleSaveAddress}>저장</button>
        </div>
    );
};

export default UserInsertAddress;
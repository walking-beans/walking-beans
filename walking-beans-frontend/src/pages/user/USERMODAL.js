import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/User.css";

const UserInsertAddress = ({ user }) => {
    const [address, setAddress] = useState(""); // 주소
    const [detailedAddress, setDetailedAddress] = useState(""); // 상세 주소
    const [addressName, setAddressName] = useState(""); // 주소 별칭
    const [currentUser, setCurrentUser] = useState(user);
    const [savedAddresses,setSavedAddresses] = useState([]); // 저장된 주소 목록
    const [showForm, setShowForm] = useState(false);
    const [addressLatitude, setLatitude] = useState("");
    const [addressLongitude, setLongitude] = useState("");

    useEffect(() => {
        console.log("user props:", user);
        if (user) {
            setCurrentUser(user);
        } else {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setCurrentUser(parsedUser);
                    console.log("로컬스토리지에서 가져온 사용자 정보:", parsedUser);
                    fetchUserAddresses(parsedUser.userId);
                } catch (error) {
                    console.error("로컬스토리지 데이터 파싱 오류:", error);
                }
            }
        }
    }, [user]);

    useEffect(() => {
        // 카카오 주소 API 스크립트 추가
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // 로그인한 유저의 주소 목록 불러오기
    const fetchUserAddresses = (userId) =>{
        if (!userId) return;

        axios
            .get(`http://localhost:7070/api/addresses/${userId}`)
            .then((res) => {
                setSavedAddresses(res.data); // 서버에서 받은 주소 목록 저장
                console.log("불러온 주소 목록:", res.data);
            })
            .catch((error) => {
                console.error("주소 목록 불러오기 오류:", error);
            });
    }
    useEffect(() => {
        const currentUserId = currentUser?.user_id || currentUser?.userId;
        if (currentUserId) {
            fetchUserAddresses(currentUserId);
        }
    }, [currentUser]);

    //  카카오 주소 검색 함수
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.roadAddress); // 선택한 도로명 주소 저장

                // 카카오 주소 -> 좌표 변환 API 호출
                const geocoder = new window.daum.maps.services.Geocoder();
                geocoder.addressSearch(data.roadAddress, function (result, status) {
                    if (status === window.daum.maps.services.Status.OK) {
                        const latitude = result[0].y;  // 위도
                        const longitude = result[0].x; // 경도
                        console.log("위도:", latitude, "경도:", longitude);

                        // 상태 저장 (추가 가능)
                        setLatitude(latitude);
                        setLongitude(longitude);
                    } else {
                        console.error("좌표 변환 실패:", status);
                    }
                });
            },
        }).open();
    };

    //  주소 저장 API (POST 요청)
    const handleSaveAddress = () => {
        if (!address || !addressName) {
            alert("주소와 별칭을 입력해주세요!");
            return;
        }

        axios
            .post("http://localhost:7070/api/addresses/UserInsertAddress", {
                userId: currentUser?.user_id, // 로그인한 유저의 ID 추가
                addressName,
                address,
                detailedAddress,
                addressLatitude,
                addressLongitude,
            })
            .then((res) => {
                alert("주소가 저장되었습니다!");
                setAddress(""); // 입력 필드 초기화
                setAddressName("");
                setDetailedAddress("");
                fetchUserAddresses(currentUser?.user_id); // 저장 후 목록 갱신
            })
            .catch((error) => {
                console.error("주소 저장 오류:", error);
                alert("주소 저장에 실패했습니다.");
            });
    };
    const handleSetPrimaryAddress = (addressId) => {
        axios.put(`http://localhost:7070/api/addresses/updateRole`, {
            userId: currentUser?.user_id,
            addressId: addressId
        })
            .then(() => {

                alert("기본 주소가 변경되었습니다.");

                localStorage.setItem("addressUpdated", "true");
                window.dispatchEvent(new Event("addressUpdated"));  // 다른 컴포넌트에도 알림 전송

                fetchUserAddresses(currentUser?.user_id);  // 목록 갱신
            })
            .catch((error) => {
                console.error("기본 주소 변경 오류:", error);
                console.log("전송할 userId:", currentUser?.user_id);
                console.log("전송할 addressId:", addressId);
            });
    };

    return (
        <div className="user-insert-address-container">
            <div className="address-input">
                {/* 주소 입력 버튼 */}
                {!showForm && (
                    <input placeholder="주소를 입력해주세요"
                           onClick={() => setShowForm(true)}/>


                )}
            </div>
            {/*  모달형 주소 입력 폼 */}
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>주소 입력</h2>
                        <button onClick={handleSearchAddress}>주소 검색</button>
                        <input type="text" value={address} readOnly placeholder="선택한 주소" />
                        <input
                            type="text"
                            value={detailedAddress}
                            onChange={(e) => setDetailedAddress(e.target.value)}
                            placeholder="상세 주소 입력 (예: 101동 202호)"
                        />
                        <input
                            type="text"
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                            placeholder="주소 별칭 (예: 우리 집, 회사)"
                        />
                        <button onClick={handleSaveAddress}>저장</button>
                        <button onClick={() => setShowForm(false)}>닫기</button>
                    </div>
                </div>
            )}

            {/*  저장된 주소 목록 표시 */}
            <h3>저장된 주소 목록</h3>
            <ul>
                {savedAddresses.length > 0 ? (
                    savedAddresses.map((addr) => (
                        <li key={addr.id} onClick={() => handleSetPrimaryAddress(addr.addressId)}>
                            <strong>{addr.addressName}</strong>: {addr.address}
                            <small>{addr.detailedAddress}</small>
                            {addr.addressRole === 1 && <span> (기본 주소) </span>}
                        </li>
                    ))
                ) : (
                    <p>저장된 주소가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default UserInsertAddress;
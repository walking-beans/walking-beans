import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../../css/User.css";


const UserInsertAddress = ({ user }) => {
    const navigate = useNavigate();
    const [address, setAddress] = useState(""); // 주소
    const [detailedAddress, setDetailedAddress] = useState(""); // 상세 주소
    const [addressName, setAddressName] = useState(""); // 주소 별칭
    const [currentUser, setCurrentUser] = useState(user);
    const [savedAddresses,setSavedAddresses] = useState([]); // 저장된 주소 목록
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
    const [addressLatitude, setLatitude] = useState("");
    const [addressLongitude, setLongitude] = useState("");

    const KAKAO_MAP_API_KEY = "5c03e27b386769b61889fd1f0650ec23";

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
        const script1 = document.createElement("script");
        script1.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing`;
        script2.async = true;
        script2.onload = () => {
            setIsKakaoLoaded(true);
            console.log("카카오 지도 API 로드 완료");
        };
        document.body.appendChild(script2);
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

                if (!isKakaoLoaded || !window.kakao || !window.kakao.maps) {
                    console.error("카카오 지도 API가 아직 로드되지 않았습니다.");
                    alert("카카오 지도 api 가 아직 로드 되지않았습니다.")
                    return;
                }

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

    // 대표주소 설정
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
    // 주소 삭제
    const handleDeleteAddress = (addressId) => {
        if (!addressId) {
            alert("삭제할 주소 ID가 없습니다.");
            return;
        }

        axios.delete(`http://localhost:7070/api/addresses/delete/${addressId}`)
            .then(() => {
                alert("주소가 삭제되었습니다.");
                fetchUserAddresses(currentUser?.user_id); // 주소 목록 새로고침
            })
            .catch((error) => {
                console.error("주소 삭제 오류:", error);
                alert("주소 삭제에 실패했습니다.");
            });
    };

    return (
        <div className="user-insert-address-container">
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <h5 className="fw-bold mb-0">주소 설정</h5>
            </div>

            <div className="mt-3">
                <div className="input-group">

                    <input type="text" className="insert-address"
                           placeholder="주소를 입력해 주세요."
                           value={address}
                           readOnly
                           onClick={handleSearchAddress}/>
                </div>
                {address && (
                    <>
                            <input type="text" className="address-alias"
                                   style={{flex: "0 0 60%"}}
                                   placeholder="주소 별칭 (예: 집, 회사)"
                                   value={addressName}
                                   onChange={(e) => setAddressName(e.target.value)}/>

                        <input type="text" className="detailed-address"
                               placeholder="상세 주소 입력"
                               value={detailedAddress}
                               onChange={(e) => setDetailedAddress(e.target.value)}/>
                        <div className="button-container">
                        <button className="save-btn"
                                onClick={handleSaveAddress}>
                            저장
                        </button>

                        <button className="cancel-btn"
                                onClick={() => {
                                    setAddress("");
                                    setAddressName("");
                                    setDetailedAddress("");
                                }}>
                            취소
                        </button>
                        </div>
                    </>
                )
                }


            </div>
            <div className="mt-3">
                {savedAddresses.map((addr) => (
                    <div key={addr.id} onClick={() => handleSetPrimaryAddress(addr.addressId)} className="p-3 border-bottom d-flex justify-content-between">
                        <div>
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-geo-alt-fill me-2"></i> {addr.addressName}
                            </h6>
                            <p className="text-muted small">{addr.address} {addr.detailedAddress}</p>
                            {addr.addressRole === 1 && <span>📌기본 주소</span>}
                        </div>
                        <button
                            className="btn btn-sm"
                            onClick={(e) => {
                                e.stopPropagation(); //  부모 이벤트 전파 방지
                                handleDeleteAddress(addr.addressId);
                            }}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UserInsertAddress;
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../../css/User.css";

const UserInsertAddress = ({user}) => {
    const navigate = useNavigate();
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [currentUser, setCurrentUser] = useState(user);
    const [showModal, setShowModal] = useState(false);
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
    const [address, setAddress] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");
    const [addressName, setAddressName] = useState("");
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
        script2.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_JAVASCRIPT_KEY&libraries=services`;
        script2.async = true;
        script2.onload = () => {
            setIsKakaoLoaded(true);
            console.log("카카오 지도 API 로드 완료");
        };
        document.body.appendChild(script2);
    }, []);

    const fetchUserAddresses = (userId) => {
        if (!userId) return;
        axios
            .get(`http://localhost:7070/api/addresses/${userId}`)
            .then((res) => {
                setSavedAddresses(res.data);
            })
            .catch((error) => {
                console.error("주소 목록 불러오기 오류:", error);
            });
    };

    useEffect(() => {
        const currentUserId = currentUser?.user_id || currentUser?.userId;
        if (currentUserId) {
            fetchUserAddresses(currentUserId);
        }
    }, [currentUser]);

    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.roadAddress);

                if (!isKakaoLoaded || !window.kakao || !window.kakao.maps) {
                    console.error("카카오 지도 API가 아직 로드되지 않았습니다.");
                    return;
                }

                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.addressSearch(data.roadAddress, function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setLatitude(result[0].y);
                        setLongitude(result[0].x);
                        console.log("위도:", result[0].y, "경도:", result[0].x);
                    } else {
                        console.error("좌표 변환 실패:", status);
                    }
                });
            },
        }).open();
    };

    const handleSaveAddress = () => {
        if (!address || !addressName) {
            alert("주소와 별칭을 입력해주세요!");
            return;
        }

        axios
            .post("http://localhost:7070/api/addresses/UserInsertAddress", {
                userId: currentUser?.user_id,
                addressName,
                address,
                detailedAddress,
                addressLatitude,
                addressLongitude,
            })
            .then(() => {
                alert("주소가 저장되었습니다!");
                setAddress("");
                setAddressName("");
                setDetailedAddress("");
                fetchUserAddresses(currentUser?.user_id);
            })
            .catch((error) => {
                console.error("주소 저장 오류:", error);
                alert("주소 저장에 실패했습니다.");
            });
    };

    const handleDeleteAddress = (addressId) => {
        axios.delete(`http://localhost:7070/api/addresses/delete/${addressId}`)
            .then(() => {
                alert("주소가 삭제되었습니다.");
                fetchUserAddresses(currentUser?.user_id);
            })
            .catch((error) => {
                console.error("주소 삭제 오류:", error);
                alert("주소 삭제에 실패했습니다.");
            });
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <i className="bi bi-arrow-left fs-4" onClick={() => navigate(-1)} style={{cursor: "pointer"}}></i>
                <h5 className="fw-bold mb-0">주소 설정</h5>
            </div>

            <div className="mt-3">
                <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                        <i className="bi bi-search text-muted"></i>
                    </span>
                    <input type="text" className="form-control bg-light border-0"
                           placeholder="주소 검색"
                           value={address}
                           readOnly
                           onClick={handleSearchAddress}/>
                </div>
                {address && (
                    <>
                        <div className="d-flex align-items-center mt-2">
                            <input type="text" className="form-control me-2"
                                   style={{flex: "0 0 60%"}}
                                   placeholder="주소 별칭 (예: 집, 회사)"
                                   value={addressName}
                                   onChange={(e) => setAddressName(e.target.value)}/>

                            <button className="btn btn-dark me-2 "
                                    style={{flex: "0 0 19%"}}
                                    onClick={handleSaveAddress}>
                                저장
                            </button>

                            <button className="btn btn-secondary"
                                    style={{flex: "0 0 18%"}}
                                    onClick={() => {
                                        setAddress("");
                                        setAddressName("");
                                        setDetailedAddress("");
                                    }}>
                                취소
                            </button>
                        </div>
                        <input type="text" className="form-control mt-2"
                               placeholder="상세 주소 입력"
                               value={detailedAddress}
                               onChange={(e) => setDetailedAddress(e.target.value)}/>
                    </>
                )
                }


            </div>

            <div className="mt-3">
                {savedAddresses.map((addr) => (
                    <div key={addr.addressId} className="p-3 border-bottom d-flex justify-content-between">
                        <div>
                            <h6 className="fw-bold mb-0">
                                <i className="bi bi-geo-alt-fill me-2"></i> {addr.addressName}
                            </h6>
                            <p className="text-muted small">{addr.address} {addr.detailedAddress}</p>
                        </div>
                        <button className="btn  btn-sm" onClick={() => handleDeleteAddress(addr.addressId)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInsertAddress;

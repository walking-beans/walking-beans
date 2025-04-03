import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../css/User.css";
import groupIcon from "../../assert/svg/Group.svg"
import {useLocation, useNavigate, useParams} from "react-router-dom";

const UserReviewWrite = () => {
    const [reviews, setReviews] = useState([]);
    const [riderReview, setRiderReview] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const location = useLocation();
    const {orderId} = useParams();
    const [userId, setUserId] = useState(null);
    const [storeId, setStoreId] = useState(location.state?.storeId || null);
    const [riderId, setRiderId] = useState(location.state?.riderId || null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    /*  const [newReview, setNewReview] = useState({
          orderId: orderId,
          userId: null,
          storeId: storeId,
          reviewStarRating: 5, // 기본값 5점
          reviewContent: "",
      }); 연결되면 storeId,orderId 작성*/
    const [newReview, setNewReview] = useState({
        orderId: orderId, // 🛠 테스트용 주문 ID (실제 존재하는 order_id로 설정)
        userId: userId, // 🛠 테스트용 유저 ID
        storeId: storeId, // 🛠 테스트용 매장 ID (실제 존재하는 store_id로 설정)
        /*  orderId: 5, // 🛠 테스트용 주문 ID (실제 존재하는 order_id로 설정)
          userId: 1, // 🛠 테스트용 유저 ID
          storeId: 2, // 🛠 테스트용 매장 ID (실제 존재하는 store_id로 설정)*/
        reviewStarRating: 5, // 기본값 5점
        reviewContent: "",
    });
    const [newRiderReview, setNewRiderReview] = useState({
        orderId: orderId,
        riderId: riderId,
        riderReviewRating: 5,
    })
    /*  const [newRiderReview,setNewRiderReview] = useState({
          orderId: 123,
          riderId: 1,
          riderReviewRating: 5,
      })*/


    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 가져오기
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.user_id) {
            setNewReview((prevReview) => ({
                ...prevReview,
                userId: storedUser.user_id,
            }));
        }
    }, []);

    //  매장 별점 선택
    const handleStarClick = (rating) => {
        setNewReview((prevReview) => ({
            ...prevReview,
            reviewStarRating: rating,
        }));
    };

    //  라이더 별점 선택
    const handleRiderStarClick = (rating) => {
        setNewRiderReview((prevReview) => ({
            ...prevReview,
            riderReviewRating: rating,
        }));
    };

    //  파일 선택 핸들러 (여러 개 추가)
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const previewFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file), // 미리보기 URL 생성
        }));

        setSelectedImages((prevImages) => [...prevImages, ...previewFiles]); // 기존 이미지에 추가
    };


    //  개별 이미지 삭제
    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };


    //  리뷰 작성 요청
    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!newReview.reviewContent.trim()) {
            alert("리뷰를 입력해주세요.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("userId", newReview.userId);
        formData.append("storeId", newReview.storeId);
        formData.append("orderId", newReview.orderId);
        formData.append("reviewStarRating", newReview.reviewStarRating);
        formData.append("reviewContent", newReview.reviewContent);

        //  이미지 파일 올바르게 추가
        selectedImages.forEach((img) => {
            formData.append("file", img.file);
        });



        axios.post("http://localhost:7070/api/reviews", formData)
            .then(() => {
                return axios.post("http://localhost:7070/api/riderReview", newRiderReview);
            })
            .then(() => {
                alert("리뷰가 성공적으로 등록되었습니다!");
                navigate("/order");
                setNewReview((prevReview) => ({
                    ...prevReview,
                    reviewStarRating: 5,
                    reviewContent: "",
                }));
                setNewRiderReview((prevReview) => ({
                    ...prevReview,
                    riderReviewRating: 5,
                }));
                setSelectedImages([]);
            })
            .catch((err) => {
                console.error("리뷰 저장 실패", err);
                alert("백엔드에 리뷰를 저장하지 못했습니다.");
            })
            .finally(() => {
                setIsLoading(false); //모든 요청 완료 후 로딩 종료
            });
    };

    //해당되는 주문 정보 가져오기
    useEffect(() => {
        if (orderId) {
            axios.get(`http://localhost:7070/api/orders/${orderId}`)
                .then(res => {
                    setNewReview(prevReview => ({
                        ...prevReview,
                        orderId: orderId,
                        storeId: res.data.storeId, // ✅ storeId 추가
                    }));
                    setNewRiderReview(prevReview => ({
                        ...prevReview,
                        orderId: orderId,
                        riderId: res.data.RiderIdOnDuty || null // ✅ riderId 추가 (없으면 null)
                    }));
                })
                .catch(err => console.error("주문 정보 조회 실패:", err));
        }
    }, [orderId]);

    return (
        <div className="user-review-container">
            <div className="review-all">
                <div className="review-info">
                    <div className="user-title-center">리뷰 작성하기</div>
                    <div className="user-order-hr"></div>

                    {isLoading ? ( // 로딩 중 메시지 추가
                        <div className="loading-container">
                            <p>리뷰를 등록하는 중입니다...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleReviewSubmit}>
                            <div className="star-rating">
                                <p>매장 별점</p>
                                <div className="star-container">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={index < newReview.reviewStarRating ? "star filled" : "star"}
                                            onClick={() => handleStarClick(index + 1)}
                                        >
                                    ★
                                </span>
                                    ))}
                                </div>
                            </div>

                            <div className="star-rating"><p>리뷰 입력하기</p></div>
                            <textarea
                                placeholder="음식의 맛, 양, 포장 상태 등 음식에 대한 솔직한 리뷰를 남겨주세요."
                                value={newReview.reviewContent}
                                onChange={(e) =>
                                    setNewReview((prevReview) => ({
                                        ...prevReview,
                                        reviewContent: e.target.value,
                                    }))
                                }
                            />

                            <div className="file-upload">
                                <label htmlFor="file-input">
                                    <img src={groupIcon} alt="업로드" className="upload-icon"/>
                                </label>
                                <input id="file-input" type="file" accept="image/*" multiple onChange={handleFileChange}/>

                                <div className="image-preview-container">
                                    {selectedImages.map((img, index) => (
                                        <div key={index} className="image-preview-wrapper">
                                            <div className="remove-image" onClick={() => removeImage(index)}>❌</div>
                                            <img src={img.preview} alt={`미리보기 ${index}`} className="image-preview"/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="star-rating">
                                <p>라이더 별점</p>
                                <div className="star-container">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={index < newRiderReview.riderReviewRating ? "star filled" : "star"}
                                            onClick={() => handleRiderStarClick(index + 1)}
                                        >
                                    ★
                                </span>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="submit-button">작성하기</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserReviewWrite;
import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/User.css";
import groupIcon from "../../assert/svg/Group.svg"
import {useNavigate, useParams} from "react-router-dom";

const UserReviewWrite = () => {
    const [reviews, setReviews] = useState([]);
    const [riderReview, setRiderReview] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const { orderId } = useParams();
    const [userId, setUserId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const navigate = useNavigate();

    /*  const [newReview, setNewReview] = useState({
          orderId: orderId,
          userId: null,
          storeId: storeId,
          reviewStarRating: 5, // 기본값 5점
          reviewContent: "",
      }); 연결되면 storeId,orderId 작성*/
    const [newReview, setNewReview] = useState({
      /*  
      orderId: orderId, // 🛠 테스트용 주문 ID (실제 존재하는 order_id로 설정)
        userId: userId, // 🛠 테스트용 유저 ID
        storeId: storeId, // 🛠 테스트용 매장 ID (실제 존재하는 store_id로 설정)
        */
        orderId: 5, // 🛠 테스트용 주문 ID (실제 존재하는 order_id로 설정)
        userId: 1, // 🛠 테스트용 유저 ID
        storeId: 2, // 🛠 테스트용 매장 ID (실제 존재하는 store_id로 설정)

        reviewStarRating: 5, // 기본값 5점
        reviewContent: "",
    });
    /*const [newRiderReview,setNewRiderReview] = useState({
        orderId: orderId,
        riderId: riderId,
        riderReviewRating: 5,
    })*/
    const [newRiderReview,setNewRiderReview] = useState({
        orderId: 123,
        riderId: 1,
        riderReviewRating: 5,
    })


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

        const formData = new FormData();
        formData.append("userId", newReview.userId);
        formData.append("storeId", newReview.storeId);
        formData.append("orderId", newReview.orderId);
        formData.append("reviewStarRating", newReview.reviewStarRating);
        formData.append("reviewContent", newReview.reviewContent);

        selectedImages.forEach((img, index) => {
            formData.append(`file${index}`, img.file);
        });

        // 🖼 여러 개의 이미지 추가
        selectedImages.forEach((file) => {
            formData.append("file", file); // 백엔드에서 `@RequestParam("file") MultipartFile file`으로 받음
        });

        axios
            .post("http://localhost:7070/api/reviews", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                alert("리뷰가 성공적으로 등록되었습니다!");
                navigate("/order")
                setNewReview((prevReview) => ({
                    ...prevReview,
                    reviewStarRating: 5,
                    reviewContent: "",
                }));
                setSelectedImages([]); // 이미지 초기화
            })
            .catch((err) => {
                console.error("리뷰 저장 실패", err);
                alert("백엔드에 리뷰를 저장하지 못했습니다.");
            });

        axios.post("http://localhost:7070/api/riderReview", newRiderReview, {
            headers: { "Content-Type": "application/json" },
        })
            .catch(() => {
                alert("백엔드에서 라이더 별점을 저장하지 못했습니다.");
            });
    };

    //해당되는 주문 정보 가져오기
    useEffect(() => {
        if (orderId) {
            axios.get(`http://localhost:7070/api/orders/${orderId}`)
                .then(res => {
                    setNewReview(orders => ({
                        ...orders,
                        orderId: orderId,
                        storeId: res.data.storeId
                    }));
                })
                .catch(err => console.error("주문 정보 조회 실패:", err));
        }
    }, [orderId]);

    return (
        <div className="user-review-container">
            <form onSubmit={handleReviewSubmit}>
                {/* 매장 별점 */}
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

                {/* 리뷰 입력 */}
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

                {/*  파일 업로드 */}
                <div className="file-upload">
                    <label htmlFor="file-input">
                        <img src={groupIcon} alt="업로드" className="upload-icon" />
                    </label>
                    <input id="file-input" type="file" accept="image/*" multiple onChange={handleFileChange} />

                    {/* 이미지 미리보기 */}
                    <div className="image-preview-container">
                        {selectedImages.map((img, index) => (
                            <div key={index} className="image-preview-wrapper">
                                <div className="remove-image" onClick={() => removeImage(index)}>
                                    ❌
                                </div>
                                <img src={img.preview} alt={`미리보기 ${index}`} className="image-preview" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 라이더 별점 */}
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
        </div>
    );
};

export default UserReviewWrite;
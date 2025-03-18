import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/User.css";
import groupIcon from "../../assert/svg/Group.svg"

const UserReviewWrite = () => {
    const [reviews, setReviews] = useState([]);
    const [riderReview, setRiderReview] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    /*  const [newReview, setNewReview] = useState({
          orderId: orderId,
          userId: null,
          storeId: storeId,
          reviewStarRating: 5, // 기본값 5점
          reviewContent: "",
      }); 연결되면 storeId,orderId 작성*/
    const [newReview, setNewReview] = useState({
        orderId: 123, // 🛠 테스트용 주문 ID (실제 존재하는 order_id로 설정)
        userId: 1, // 🛠 테스트용 유저 ID
        storeId: 10, // 🛠 테스트용 매장 ID (실제 존재하는 store_id로 설정)
        reviewStarRating: 5, // 기본값 5점
        reviewContent: "",
        file: null,
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

    // ⭐ 매장 별점 선택
    const handleStarClick = (rating) => {
        setNewReview((prevReview) => ({
            ...prevReview,
            reviewStarRating: rating,
        }));
    };

    // ⭐ 라이더 별점 선택
    const handleRiderStarClick = (rating) => {
        setNewRiderReview((prevReview) => ({
            ...prevReview,
            riderReviewRating: rating,
        }));
    };

    // 🖼 파일 선택 핸들러 (여러 개 추가)
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    };

    //  개별 이미지 삭제
    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };


    // 📌 리뷰 작성 요청
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

        axios.post("http://localhost:7070/api/reviews", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => {
                alert("리뷰가 성공적으로 등록되었습니다!");
                setNewReview((prevReview) => ({
                    ...prevReview,
                    reviewStarRating: 5,
                    reviewContent: "",
                }));
                setSelectedImages([]);
            })
            .catch((err) => {
                alert("백엔드에 리뷰를 저장하지 못했습니다.");
                console.error(err);
            });

        axios.post("http://localhost:7070/api/riderReview", newRiderReview, {
            headers: { "Content-Type": "application/json" },
        })
            .catch(() => {
                alert("백엔드에서 라이더 별점을 저장하지 못했습니다.");
            });
    };

    return (
        <div className="user-review-container">
            <form onSubmit={handleReviewSubmit}>
                {/* ⭐ 매장 별점 */}
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

                {/* ✍ 리뷰 입력 */}
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

                {/* 🖼 파일 업로드 */}
                <div className="file-upload">
                    <label htmlFor="file-input">
                        <img src={groupIcon} alt="업로드" className="upload-icon" />
                    </label>
                    <input id="file-input" type="file" accept="image/*" multiple onChange={handleFileChange} />

                    {/* 이미지 미리보기 */}
                    <div className="image-preview-container">
                        {selectedImages.map((img, index) => (
                            <div key={index} className="image-preview-wrapper">
                                <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                                    ❌
                                </button>
                                <img src={img.preview} alt={`업로드 ${index}`} className="image-preview" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ⭐ 라이더 별점 */}
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

                <button type="submit" className="submit-button">리뷰 작성</button>
            </form>
        </div>
    );
};

export default UserReviewWrite;
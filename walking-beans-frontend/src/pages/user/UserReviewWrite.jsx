import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/User.css"; // CSS 경로 확인

const UserReviewWrite = () => {
    const [reviews, setReviews] = useState([]);
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

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.user_id) {
            setNewReview((prevReview) => ({
                ...prevReview,
                userId: storedUser.user_id,  // 로그인한 사용자 ID 설정
            }));
        }
    }, []);



    //  별점 클릭 핸들러
    const handleStarClick = (rating) => {
        console.log(`별점 클릭됨: ${rating}점`); // 이벤트 작동 확인용 로그
        setNewReview((prevReview) => ({
            ...prevReview,
            reviewStarRating: rating,
        }));
    };
    // 파일 선택 핸들러
    const handleFileChange = (event) => {
        setNewReview((prevReview) => ({
            ...prevReview,
            file: event.target.files[0],
        }));
    };

    // 📌 리뷰 작성 요청
    const handleReview = (e) => {
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

        if (newReview.file) {
            formData.append("file", newReview.file);
        }

        axios
            .post("http://localhost:7070/api/reviews", formData,{
                headers:{"Content-type": "multipart/form-data"}
            })
            .then((res) => {
                setReviews([...reviews, res.data]); // 새 리뷰 추가
                alert("리뷰가 성공적으로 등록되었습니다!");
                setNewReview((prevReview) => ({
                    ...prevReview,
                    reviewStarRating: 5,
                    reviewContent: "",
                }));
            })
            .catch((err) => {
                console.error("리뷰 저장 실패", err);
                alert("백엔드에 리뷰를 저장하지 못했습니다.");
            });
    };

    return (
        <div className="user-review-container">
            <form onSubmit={handleReview}>
                {/* ⭐ 별점 선택 UI */}
                <div className="star-rating">
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

                {/* ✍ 리뷰 입력 */}
                <textarea
                    placeholder="리뷰를 입력하세요..."
                    value={newReview.reviewContent}
                    onChange={(e) =>
                        setNewReview((prevReview) => ({
                            ...prevReview,
                            reviewContent: e.target.value,
                        }))
                    }
                />
                {/* 🖼 이미지 업로드 */}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">리뷰 작성</button>
            </form>
        </div>
    );
};

export default UserReviewWrite;
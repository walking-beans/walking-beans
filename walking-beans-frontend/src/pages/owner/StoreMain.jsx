import {useEffect, useState} from "react";
import StoreStatus from "../owner/teacherUi/StoreStatus";
import StoreManagement from "../owner/teacherUi/StoreManagement";
import '../owner/teacherUi/StoreMain.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const StoreMain = () => {
    const [weather, setWeather] = useState({ condition: "흐림", temperature: -2 });
    const [orders, setOrders] = useState({ pending: 5, completed: 10 });
    const [storeStatus, setStoreStatus] = useState("준비중");
    const [ownerName, setOwnerName] = useState("");
    const [userId, setUserId] = useState("");
    const [storeId, setStoreId] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            console.log(storedUser)
            setOwnerName(userData.user_name || "사장님");
            setUserId(userData.user_id) // 가게 정보 확인을 위한 id가져오기 , 이동할 페이지마다 storeId 파라미터가 있기 때문에 필요
            console.log(userData.user_id)
            // 가게id 가져오기 > userid가 있으면 그떄 비동기 시작
            if(userId) {
                axios
                    .get(`http://localhost:7070/api/store/valid/${userId}`)
                    .then((res) => {
                        setStoreId(res.data)
                        console.log("유저소유 가게 아이디 : " + res)
                        setIsLoading(false); // 데이터 로드 완료
                    })
                    .catch((err) => {
                        console.log("아이디 확인 실패 : " + err)
                        setIsLoading(false); // 에러 시에도 로딩 해제
                        alert("등록된 매장이 없습니다.")
                    })
            }
        } else {
            alert("회원가입 후 사용가능한 페이지 입니다.")
            navigate("/") // 메인으로 돌아가기
        }


    }, [userId]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="container-fluid p-0">
            <div className="row m-0 p-0">
                <div className="col-12 p-0">
                    <div className="store-main">
                        <StoreStatus weather={weather} orders={orders} storeStatus={storeStatus} storeId={storeId}/>
                        <StoreManagement ownerName={ownerName} storeId={storeId}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreMain;
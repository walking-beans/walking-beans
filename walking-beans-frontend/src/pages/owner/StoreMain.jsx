import {useEffect, useState} from "react";
import StoreStatus from "../owner/teacherUi/StoreStatus";
import StoreManagement from "../owner/teacherUi/StoreManagement";
import '../owner/teacherUi/StoreMain.css';
import axios from "axios";

const StoreMain = () => {
    const [weather, setWeather] = useState({ condition: "흐림", temperature: -2 });
    const [orders, setOrders] = useState({ pending: 5, completed: 10 });
    const [storeStatus, setStoreStatus] = useState("준비중");
    const [ownerName, setOwnerName] = useState("");
    const [userId, setUserId] = useState("");
    const [storeId, setStoreId] = useState("");



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
        console.log(storedUser)
            setOwnerName(userData.user_name || "사장님");
            setUserId(userData.user_id) // 가게 정보 확인을 위한 id가져오기 , 이동할 페이지마다 storeId 파라미터가 있기 때문에 필요
        } else {
            setOwnerName("사장님");
        }
        if (userId){
            axios
                .get(``)
                .then( ()=>{})
                .catch( ()=>{})

        }


    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="row m-0 p-0">
                <div className="col-12 p-0">
                    <div className="store-main">
                        <StoreStatus weather={weather} orders={orders} storeStatus={storeStatus}/>
                        <StoreManagement ownerName={ownerName}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreMain;
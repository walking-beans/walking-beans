import {useEffect, useState} from "react";
import StoreStatus from "../owner/teacherUi/StoreStatus";
import StoreManagement from "../owner/teacherUi/StoreManagement";
import '../owner/teacherUi/StoreMain.css';

const StoreMain = () => {
    const [weather, setWeather] = useState({ condition: "흐림", temperature: -2 });
    const [orders, setOrders] = useState({ pending: 5, completed: 10 });
    const [storeStatus, setStoreStatus] = useState("준비중");
    const [ownerName, setOwnerName] = useState("");



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
        console.log(storedUser)
            setOwnerName(userData.ownerName || "사장님");
        } else {
            setOwnerName("사장님");
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
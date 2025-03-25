import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiOrdersStoresService from "../../service/apiOrdersStoresService";

const RiderOrder = ({user}) => {

    const {orderId} = useParams();
    const [order, setOrder] = useState(null);


    useEffect(() => {
        apiOrdersStoresService.getOrderByOrderId(orderId, setOrder);
    }, [user]);

    return (
        <div>
            <h1>RiderOrder</h1>
        </div>
    )
}

export default RiderOrder;
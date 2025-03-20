import React, {useEffect, useState} from "react";

const RiderMainSelectedStore = ({orders, storeId, setSelectedOrder, setCheckingSelectedOrder}) => {

    const [selectedStore, setSelectedStore] = useState([]);

    useEffect(() => {
        console.log("RiderMainSelectedStore storeId : " + storeId);
        setSelectedStore(orders[String(storeId)]);
    }, [orders, storeId]);

    function handleSelectedOrder (orderId) {
        setCheckingSelectedOrder(true);
        console.log("orderID : " + orderId);
        setSelectedOrder(orders[String(storeId)].find(orderList => orderList.orderId === orderId));
    }

    return (
        <div>
            {
                selectedStore?.map(order => (
                    <li key={order.orderId}>
                        <button onClick={() => {handleSelectedOrder(order.orderId)}}
                        >
                            <strong>매장번호:</strong> {order.storeId} ||
                            <strong>매장:</strong> {order.storeName} ||
                            <strong>storeLatitude:</strong> {order.storeLatitude} ||
                            <strong>storeLongitude:</strong> {order.storeLongitude}
                        </button>
                    </li>
                ))
            }
        </div>

    )

}

export default RiderMainSelectedStore;
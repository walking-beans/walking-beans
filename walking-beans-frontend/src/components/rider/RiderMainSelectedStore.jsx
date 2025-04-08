import React, {useEffect, useState} from "react";
import "../../css/rider/RiderMainSelectedStore.css";

const RiderMainSelectedStore = ({orders, storeId, setSelectedOrder, setCheckingSelectedOrder, checkingSelectedOrder}) => {

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
            <div className="rider-main-selected-store-container">
                <div className="rider-main-selected-store-container-store-name">
                    {selectedStore[0]?.storeName}
                </div>
                <div className="rider-main-selected-store-container-store-address">
                    {selectedStore[0]?.storeAddress}
                </div>
                <hr />

                {
                    selectedStore?.map(order => (
                        <li key={order.orderId}>
                            <div className="rider-main-selected-store-li-div"
                                 onClick={() => {handleSelectedOrder(order.orderId)}}
                            >
                                <p className="rider-main-selected-store-li-delivery-number"><strong>{order.orderNumber}</strong></p>
                                <p className="rider-main-selected-store-li-delivery-address">{order.orderAddress} {order.orderDetailedAddress}</p>
                            </div>
                            <hr />
                        </li>
                    ))
                }
            </div>
            {/*{
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
            }*/}
        </div>

    )

}

export default RiderMainSelectedStore;
const RiderMainSelectedStore = ({selectedStore}) => {

    return (
        <div>
            {
                selectedStore?.map((order, index) => (
                    <li key={index}>
                        <div>{order.storeDeliveryTip}</div>
                        <div>{order.storeName}</div>
                    </li>
                ))
            }
        </div>

    )

}

export default RiderMainSelectedStore;
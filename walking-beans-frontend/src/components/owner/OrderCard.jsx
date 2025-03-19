

const OrderCard = (key,orderNumber,orderStatus) => {

    return (
        <div key={key}>
            <h3>{orderNumber}</h3>
            <p>{orderStatus}</p>
        </div>
    )
}

export default OrderCard;
const RiderOrderCard = ({riderId, number, status, price, date}) => {

    return (
        <div className="-container">
            <div>{riderId}</div>
            <div>{number}</div>
            <div>{status}</div>
            <div>{price}</div>
            <div>{date}</div>
        </div>
    )
};

export default RiderOrderCard;
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const StoreOrder= () => {
    const {id} = useParams();
    const [orders, setOrders] = useState([]);


    // 주문정보리스트 전체 조회
    useEffect(() => {
        axios
            .get(`http://localhost:7070/api/orders/store/${id}`)
            .then( (res)=>{
                setOrders(res.data)
                console.log("전체리스트 로딩 성공 : ",res.data);
            })
            .catch((err)=>{
                console.log("주문정보리스트 전체 조회 로딩에러발생 : ",err);
            })
    }, []);


    // long-polling


    return(
        <>
            {orders.map((order,index)=>(
            <div key={index}>
                <p>{order.orderNumber}</p>
                <p>{order.orderStatus}</p>
            </div>
            ))}
        </>
    )
}

export default StoreOrder;
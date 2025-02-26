import GetAllRiderIncome from "../../components/rider/GetAllRiderIncome";
import {useEffect, useState} from "react";
import apiRiderService from "../../components/rider/apiRiderService";

const RiderOrderList = () => {

    const [incomeList, setIncomeList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);

    // 금일 month 가져오기
    const [todaysMonth, setTodaysMoth] = useState(`${new Date().getMonth() + 1}`);

    // 금일 year 가져오기
    const [todaysYear, setTodaysYear] = useState(`${new Date().getFullYear()}`);

    useEffect(() => {
        apiRiderService.getAllRiderIncomeList(2, setIncomeList, setErrorMessage, todaysMonth, todaysYear);
    }, [todaysMonth]);

    return (
        <div>
            <h5>내 수입</h5>
            <div>{totalPrice}</div>
            <div>{todaysMonth}</div>
            <div>{todaysYear}</div>
            <div className="-container">
                <table>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>날짜</th>
                        <th>수입</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (incomeList.length > 0 && incomeList) ? (
                            incomeList.map((income, index) => {

                                return (
                                    <tr key={income.incomeIndex}>
                                        <td>{income.incomeIndex}</td>
                                        <td>{income.incomeDate}</td>
                                        <td>{(income.incomeAmount).toLocaleString()}원</td>
                                    </tr>

                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>데이터를 불러올 수 없습니다.</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RiderOrderList;
import {useEffect, useState} from "react";
import apiRiderService from "../../components/rider/apiRiderService";

const RiderIncome = () => {
//테스트
    const [incomeList, setIncomeList] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    // 금일 month 가져오기
    const [todaysMonth, setTodaysMoth] = useState(`${new Date().getMonth() + 1}`);

    // 금일 year 가져오기
    const [todaysYear, setTodaysYear] = useState(`${new Date().getFullYear()}`);


    useEffect(() => {
        apiRiderService.getAllRiderIncomeList(2,
            setIncomeList,
            todaysMonth,
            todaysYear,
            setTotalPrice);
    }, [todaysMonth, todaysYear]);

    const MonthUp = () => {
        if (todaysMonth === 12) {
            setTodaysMoth(1);
            setTodaysYear(parseInt(todaysYear) + 1);
            return;
        }
        setTodaysMoth(parseInt(todaysMonth) + 1);
    }

    const MonthDown = () => {
        if (todaysMonth === 1) {
            setTodaysMoth(12);
            setTodaysYear(parseInt(todaysYear) - 1);
            return;
        }
        setTodaysMoth(parseInt(todaysMonth) - 1);
    }

    return (
        <div>
            <div>
                <span onClick={MonthDown}>&lt;  </span><span> {todaysYear}년 {todaysMonth}월 </span><span onClick={MonthUp}>  &gt;</span>

            </div>
            <h5>총 수입</h5>
            <div>{totalPrice} 원</div>
            <div>배달횟수 {incomeList.length}회</div>
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
                                <td colSpan="3" style={{textAlign: 'center'}}>일한 기록이 없습니다.</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RiderIncome;
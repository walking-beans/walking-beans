import {useEffect, useState} from "react";
import apiRiderService from "../../service/apiRiderService";
import "../../css/rider/RiderIncome.css";

const RiderIncome = ({user}) => {
//테스트
    const [incomeList, setIncomeList] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    // 금일 month 가져오기
    const [todaysMonth, setTodaysMoth] = useState(`${new Date().getMonth() + 1}`);

    // 금일 year 가져오기
    const [todaysYear, setTodaysYear] = useState(`${new Date().getFullYear()}`);


    useEffect(() => {
        apiRiderService.getAllRiderIncomeList(user.user_id,
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
        <div className="rider_income_container">
            <div className="rider_income_dates">
                <div className="rider_income_dates_myIncome">내 수입</div>
                <span
                    onClick={MonthDown}
                    className="rider_income_dates_left"
                > &lt; </span>
                <span>
                    {todaysYear}년 {todaysMonth}월
                </span>
                <span
                    onClick={MonthUp}
                    className="rider_income_dates_right"
                >  &gt;</span>
            </div>
            <div className="rider_income_total_container">
                <h5 className="rider_income_total_title">총 수입</h5>
                <div className="rider_income_total_price">{totalPrice.toLocaleString()}원</div>
                <div className="rider_income_total_times">배달횟수 {incomeList.length}회</div>
            </div>
            <div className="-container">
                <table className="rider_income_table row">
                    <thead>
                        <tr className="rider_income_table_thead col-12">
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
                                    <tr
                                        className="rider_income_table_tr col-12"
                                        key={income.incomeIndex}
                                    >
                                        <td className="rider_income_table_tr_income_index">{income.incomeIndex}</td>
                                        <td className="rider_income_table_tr_income_date">{income.incomeDate}</td>
                                        <td className="rider_income_table_tr_income_amount">{(income.incomeAmount).toLocaleString()}원</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr
                                className="rider_income_table_nodata_container"
                            >
                                <td
                                    className ="rider_income_table_nodata col-12"
                                    colSpan="3"
                                >일한 기록이 없습니다.
                                </td>
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
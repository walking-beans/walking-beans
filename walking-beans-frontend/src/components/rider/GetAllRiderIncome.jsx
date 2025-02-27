import {useEffect, useState} from "react";
import apiRiderService from "./apiRiderService";

const GetAllRiderIncome = () => {
    const [incomeList, setIncomeList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        apiRiderService.getAllRiderIncomeList(2, setIncomeList, setErrorMessage);
    }, []);


    return (
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
    )
};

export default GetAllRiderIncome;
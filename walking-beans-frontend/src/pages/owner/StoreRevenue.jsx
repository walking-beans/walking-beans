


const StoreRevenue = () => {

    let today = new Date();
    let month = (today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1); // 월을 항상 두자리로 출력
    console.log("month : "+month)

    // 만단위 콤마 붙이기 함수
    const formatAmount = (amount) => {
        return amount.toLocaleString('ko-KR'); // 예: 4,908,000
    };

    return(
        <>
            <h1>최근 30일간 매출 합계</h1>
            <p>{formatAmount()} 원</p>
        </>
    )
}

export default StoreRevenue;
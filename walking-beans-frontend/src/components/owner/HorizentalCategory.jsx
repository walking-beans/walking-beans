import styles from "./HorizentalCategory.modul.css";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";



const HorizentalCategory = ({gettingValue}) => {

    const sliderRef = useRef(null); // Ref로 슬라이드 요소를 참조
    const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 눌림 상태
    const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
    const [scrollLeft, setScrollLeft] = useState(0); // 초기 스크롤 위치

    const [ value , setValue] = useState("");
    const postingValue = () => {
        gettingValue(value);
        console.log("자식 -> 부모로 보내는 값:", value);
    }
    const handleChange = (e)=> {
        setValue(e.target.value)
        if(value == ""){
            return;
        } else {
            postingValue();
            setValue("");
        }

    }


    // 마우스 누를 때
    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setScrollLeft(sliderRef.current.scrollLeft);
        setStartX(e.pageX - sliderRef.current.offsetLeft);

    };

    // 마우스 뗄 때
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    // 마우스가 요소 밖으로 나갈 때
    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    // 마우스 이동 시
    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1; // 드래그 거리
        sliderRef.current.scrollLeft = scrollLeft - walk; // 스크롤 위치 업데이트

    };
    // styled-components 적용중

    // 필터 작성 필요!!
    /*
    // props = searchResult,menus
    const [select, setSelect] = useState([]); // 유저 입력 검색어

    const handleChange = (e) => {
        setSelect(e.target.value);
        postData();
    }
    // 카테고리 이름으로 필터
    const filterMenus = menus.filter((menus)=>{
        return menus.menuCategory.trim().includes(select.trim());
    });

    const postData = () => {
        searchResult(filterMenus);
    };


 */







    return (
        <>
        <ScrollWrap

            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >

            <ScrollElement onClick={handleChange} value={"신메뉴"}>신메뉴</ScrollElement>
            <ScrollElement onClick={handleChange} value={"추천메뉴"}>추천메뉴</ScrollElement>
            <ScrollElement onClick={handleChange} value={"커피"} >커피</ScrollElement>
            <ScrollElement onClick={handleChange} value={"라떼"}>라떼</ScrollElement>
            <ScrollElement onClick={handleChange} value={"콜드브루"}>콜드브루</ScrollElement>
            <ScrollElement onClick={handleChange} value={"음료"}>음료</ScrollElement>
            <ScrollElement onClick={handleChange} value={"티"}>티</ScrollElement>
            <ScrollElement onClick={handleChange} value={"푸드"}>푸드</ScrollElement>
            <ScrollElement onClick={handleChange} value={"음료"}>상품</ScrollElement>

        </ScrollWrap>
        </>
    );

}

export default HorizentalCategory;
const ScrollWrap = styled.div`
    
    overflow-x:auto; 
    overflow-y: hidden; 
    white-space:nowrap; 
    font-size:0;
    -ms-overflow-style: none;       /* 인터넷 익스플로러 */
    scrollbar-width: none;          /* 파이어폭스 */
    
`;

const ScrollElement = styled.button`
    display:inline-block; 
    width:150px; 
    height:50px; 
    border:2px solid #222;
    border-radius: 10px;
    background:#fff; 
    font-size:16px; 
    line-height:50px; 
    text-align:center;
    margin-left:15px;
    ::-webkit-scrollbar{   /* 크롬, 사파리, 오페라, 엣지 */
        display: none;
    }
    `;
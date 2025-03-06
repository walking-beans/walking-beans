import styles from "./HorizentalCategory.modul.css";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";



const HorizentalCategory = () => {

    const sliderRef = useRef(null); // Ref로 슬라이드 요소를 참조
    const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 눌림 상태
    const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
    const [scrollLeft, setScrollLeft] = useState(0); // 초기 스크롤 위치

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
    return (
        <>
        <ScrollWrap

            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >

            <ScrollElement>신메뉴</ScrollElement>
            <ScrollElement>추천메뉴</ScrollElement>
            <ScrollElement>커피</ScrollElement>
            <ScrollElement>라떼</ScrollElement>
            <ScrollElement>콜드브루</ScrollElement>
            <ScrollElement>음료</ScrollElement>
            <ScrollElement>티</ScrollElement>
            <ScrollElement>푸드</ScrollElement>
            <ScrollElement>상품</ScrollElement>
            <ScrollElement>아이템 1</ScrollElement>
            <ScrollElement>아이템 1</ScrollElement>
            <ScrollElement>아이템 1</ScrollElement>


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

const ScrollElement = styled.div`
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
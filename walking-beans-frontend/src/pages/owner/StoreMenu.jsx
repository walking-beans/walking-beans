import {useEffect, useState, useRef} from "react";
import apiMenu from "../../service/apiMenu";
import {Link, useNavigate, useParams} from "react-router-dom";
import MenuCard from "../../components/owner/MenuCard";
import axios from "axios";
import styled from "styled-components";


const StoreMenu = () => {
    const {id} = useParams();
    const [menus, setMenus] = useState([]);
    const [err, setErr] = useState(null);
    const [barrel, setBarrel] = useState(true); // 1열 3열 변환 버튼용 Ture 일때 1열
    const [selectedCategory, setSelectedCategory] = useState(""); // 필터링용 카테고리 상태

    // 수평 카테고리 슬라이더
    const sliderRef = useRef(null); // Ref로 슬라이드 요소를 참조
    const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 눌림 상태
    const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
    const [scrollLeft, setScrollLeft] = useState(0); // 초기 스크롤 위치

    // 메뉴 데이터 가져오기
    useEffect(() => {
        apiMenu.fetchAllMenu(id, setMenus, setErr)

    }, [id]);

    // 약한 삭제 핸들러
    const handleDelete = async (menuId) => {
        if (window.confirm("이 메뉴를 삭제하시겠습니까?")) {
            try {
                await axios.patch(`http://localhost:7070/api/menu/owner/${id}/menu/delete/${menuId}`,
                            {},
                            { withCredentials: true });
                setMenus(menus.filter((menu) => menu.menuId !== menuId));
            } catch (error) {
                console.error("삭제 실패:", error);
                alert("메뉴 삭제에 실패했습니다.");
            }
        }
    };

    // 1열 3열 변경 핸들러
    const handleRow = () => {
        if (barrel) {
            setBarrel(false)
        } else {
            setBarrel(true)
        }
    }

    // 카테고리 선택
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    /*
    const fixedOrder =["커피","coffee"]
    const uniqueCategories = [...new Set(menus.map((menu) => menu.menuCategory.trim()))];
    const remainCategories = uniqueCategories
        .filter((categories) => !fixedOrder.includes(categories)) // 고정 카테고리에 없는것만 추출
        .sort();// 알파벳순 정렬
    const categories = ["all", ...fixedOrder.filter((categories) => uniqueCategories.includes(categories)), ...remainCategories];
*/
    // 동적 카테고리 생성 ("all" : 전체메뉴 보기)
    // 카테고리 생성 순서
    const customOrder = ["커피", "coffee"];
    const uniqueCategories = [...new Set(menus.map((menu) => menu.menuCategory.trim()))];

    const { ordered, extra } = uniqueCategories.reduce(
        (acc, category) => {
            if (customOrder.includes(category)) {
                acc.ordered.push(category);
            } else {
                acc.extra.push(category);
            }
            return acc;
        },
        { ordered: [], extra: [] }
    );

    // 전체보기는 항상 앞으로 변경필요시 "all" 제거
    const categories = ["all", ...customOrder.filter((category) => ordered.includes(category)), ...extra];

    console.log(categories);


    // 필터링된 메뉴
    const filterMenus = menus.filter((menu) =>
        selectedCategory === "all" ? true : menu.menuCategory.trim().includes(selectedCategory)
    );

    // 슬라이더 이벤트 핸들러 움직임 제어
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


    // 디버깅
    console.log(" 이미지 주소 확인 " + menus.menuPictureUrl);


    return (
        <>
            {/* 슬라이딩 카테고리 */}
            <ScrollWrap
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                {categories.map((category) => (
                    <ScrollElement
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        active={selectedCategory === category} // 활성 상태 스타일
                    >
                        {category === "all" ? "전체메뉴" : category}
                    </ScrollElement>
                ))}
            </ScrollWrap>

            <div>
                <p className="col-1">{filterMenus.length}개</p>
                <button className={"col-2"} onClick={handleRow}>{barrel ? "3열 보기" : "1열 보기"}</button>
                <Link to={`/owner/${id}/menuresister`}>
                    <button className={"col-4 offset-6"}>새로운 메뉴 등록하기</button>
                </Link>
                <div className={"row"}>
                    {filterMenus.map((menu) => (
                        <MenuCard
                            key={menu.menuId}
                            storeId={id}
                            menuId={menu.menuId}
                            menuName={menu.menuName}
                            price={menu.menuPrice}
                            menuPictureUrl={menu.menuPictureUrl}
                            handleDelete={handleDelete}
                            barrel={barrel}
                        />
                    ))}
                </div>
            </div>


        </>
    )
}

export default StoreMenu;




// Styled Components
const ScrollWrap = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  font-size: 0;
  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera, Edge */
  }
`;

const ScrollElement = styled.button`
  display: inline-block;
  width: 150px;
  height: 50px;
  border: 2px solid #222;
  border-radius: 10px;
  background: ${(props) => (props.active ? "#ddd" : "#fff")}; // 활성 시 배경색
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  margin-left: 15px;
  cursor: pointer;
`;
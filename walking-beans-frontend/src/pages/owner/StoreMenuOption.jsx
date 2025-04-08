import MenuOptionForm from "../../components/owner/MenuOptionForm";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import MenuCard from "../../components/owner/MenuCard";
import MenuOptionGroup from "../../components/owner/MenuOptionGroup";


const StoreMenuOption = () => {
    const {menuId} = useParams();
    const [optionData, setOptionData] = useState({});
    // 상태관리
    // 이름저장
    const [optionGroups, setOptionGroups] = useState([
        {option_name: ""} // option_name : 그룹이름, option_content : 옵션설명 혹은 이름
    ]);
    const [newGroupName, setNewGroupName] = useState("");
    // 자식컴포넌트에 작성된 모든 데이터 저장
    const [allOptions, setAllOptions] = useState({})


    // 새로운 그룹 추가
    const handleAddGroup = () => {
        if (!newGroupName) {
            alert("그룹이름은 공란이 될 수 없습니다.");
            return;
        }
        setOptionGroups([...optionGroups, {option_name: newGroupName}]);
        setAllOptions({...allOptions, [newGroupName]: []}); // 새로운 그룹의 빈데이터 추가
        setNewGroupName("");// 추가 후 초기화
    };

    // 그룹 삭제
    const handleRemoveGroup = (index) => {
        /*if (optionGroups.length === 1){ // 하나는 남아야 조작가능
            alert("최소한 하나의 그룹은 남아있어야 합니다.");
            return;
        }*/
        const groupToRemove = optionGroups[index].option_name;
        const updatedGroups = optionGroups.filter((_, i) => i !== index);// 해당인덱스만 제거
        const updatedOptions = {...allOptions};
        setOptionGroups(updatedGroups);
        delete updatedOptions[groupToRemove]; // 삭제된 그룹의 데이터도 제거
        setAllOptions(updatedOptions);
    };

    // 자식에서 데이터 업데이트 시 호출
    const handleOptionsUpdate = useCallback((groupName, options) => {
        setAllOptions(prev => {
            // 이전 값과 동일하면 업데이트 생략
            if (JSON.stringify(prev[groupName]) === JSON.stringify(options)) {
                return prev;
            }
            return {...prev, [groupName]: options,}
        });
        console.log("Updating", groupName, options)
    }, []);

    // 모든 옵션 데이터를 서버에 제출
    const handelSubmitTotal = () => {
        // entries 객체를 배열로 변환해주는 메소드
        // flatMap 중첩된 배열구조를 평탄화 하기 위해서 사용하는 함수 -괄호없애기
        const totalOptions = Object.entries(allOptions).flatMap(([option_name, options]) => {
            return options.map(option => ({
                ...option,
                option_name: option_name,
            }))
        })
        if (totalOptions === 0) {
            alert("저장할 옵션이 없습니다. 옵션을 추가해주세요.")
            return;
        }
        console.log("합친 최종값 제출전 확인: ", totalOptions)
        axios
            .post(`http://localhost:7070/api/option`, totalOptions)
            .then((res) => {
                console.log("성공로그:" + res)
                alert("옵션 그룹이 성공적으로 저장되었습니다.")
                window.location.reload(); // 새로고침. 상태업데이트가 자연스럽지만 시간이 없어서 사용
            })
            .catch((err) => {
                console.log("업로드에러: " + err)
                alert("옵션 저장에 실패했습니다. 잠시후 다시 시도해주세요.")
            })
    }
    // 메뉴에 등록되어있는 옵션 표시
    useEffect(() => {

        axios
            .get(`http://localhost:7070/api/option/optionmenu/${menuId}`)
            .then((res) => {
                const rawData = res.data; // 그룹화 전 받은 데이터
                // forEach 방법과, reduce로 배열을 각 그룹컨텐츠 기준으로 정렬되는 객체로 변환 코드.
                // forEach는 변수에 담아서 변경하기 때문에 부가효과가 있을 수 있다고 한다.(리액트에서 유즈 이팩트쓰는 것처럼 부가효과가 발생할 수 있다는 이야기라는데, 아직 재대로 이해한것은 없음)
                // reduce는 해당 함수 안에서 모든 사항을 변경후에 반환값을 내주기때문에 부가효과가 없다고 함. 사용한 acc같은것은 함수에 포함된 인자. 다만 해당값이 외부 변수를 수정하면 동일하게 부수효과 발생한다고 함.
                /*
                const groupedData = {}; // 객체선언
                rawData.forEach( (item)=>{
                    const groupName = item.option_name; // 그룹이름 설정
                    if (!groupedData[groupName]) groupedData[groupName] = []; //해당 그룹이름이 없으면 배열생성
                    groupedData[groupName].push(item);
                })
                console.log("데이터 그룹화 확인 : ",groupedData);
                */

                const groupedData = rawData.reduce((acc, item) => {
                    const group = item.optionName; // 그룹 이름 결정, 그룹이름은 not null로 널값이 없음. 있는 경우 || 사용해서 기본값 구현
                    if (!acc[group]) acc[group] = []; // 그룹이 없다면 배열 생성 <- 그룹이름을 딴 배열생성
                    acc[group].push(item);  // 그룹에 항목 추가
                    return acc; // 누적된 값 반환하기
                }, {});
                console.log("데이터 그룹화 확인 : ", groupedData);
                setOptionData(groupedData);
            })
            .catch((err) => {
                console.log(err)
            })

    }, []);

    //삭제로직 단일 메뉴옵션 삭제
    const handleDelete = (e, optionId) => {
        if (!window.confirm("메뉴옵션을 삭제하시겠습니까?")) {
            return;
        }
        axios
            .delete(`http://localhost:7070/api/option/${optionId}`)
            .then(() => {
                alert("메뉴옵션 삭제에 성공했습니다.")
                window.location.reload(); // 새로고침. 상태업데이트가 자연스럽지만 시간이 없어서 사용
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div style={{padding: "20px"}}>
            <h2>메뉴 옵션 관리 (Menu ID: {menuId})</h2>
            {/* 기존 메뉴 옵션 보기 UI */}
            {Object.entries(optionData).map(([option_name, opts]) => (
                <div key={option_name} className="menu-group">
                    <h4>{option_name}</h4>

                    {opts.map((opt) => (
                        <MenuOptionGroup key={opt.option_name}
                                         {...opt}
                                         optionId={opt.optionId}
                                         name={opt.optionContent}
                                         modifiedDate={opt.optionModifiedDate}
                                         price={opt.optionPrice}
                                         handleDelete={handleDelete}
                        />

                    ))}

                </div>
            ))}
            {/* 새로운 그룹 추가 UI */}
            <div>
                <input
                    type="text"
                    placeholder="그룹 이름(예: 사이즈, 토핑)"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <button type="button" onClick={handleAddGroup}>
                    그룹 추가
                </button>
            </div>

            {/* 옵션 그룹 렌더링 */}
            {optionGroups.map((group, index) => (
                <div key={index}>

                    {group.option_name}{" "} {/* */}
                    <button
                        type="button"
                        onClick={() => handleRemoveGroup(index)}
                    >
                        그룹 삭제
                    </button>

                    <MenuOptionForm
                        menuId={menuId}
                        optionName={group.option_name}
                        onUpdate={(options) => handleOptionsUpdate(group.option_name, options)} // 실시간 업데이트
                    />
                </div>
            ))}

            {/* 모든 옵션 한꺼번에 저장 버튼 */}
            <button
                type="button"
                onClick={handelSubmitTotal}
            >
                모든 옵션 저장
            </button>
        </div>
    )

}

export default StoreMenuOption;
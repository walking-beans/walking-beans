import MenuOptionForm from "../../components/owner/MenuOptionForm";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useCallback, useState} from "react";


const StoreMenuOption = () => {
    const {id} = useParams();

    // 상태관리
    // 이름저장
    const [optionGroups, setOptionGroups] = useState([
        { option_content: ""}
    ]);
    const [newGroupName, setNewGroupName]=useState("");
    // 자식컴포넌트에 작성된 모든 데이터 저장
    const [allOptions, setAllOptions]= useState({})

    // 새로운 그룹 추가
    const handleAddGroup =() => {
        if(!newGroupName) {
            alert("그룹이름은 공란이 될 수 없습니다.");
            return;
        }
        setOptionGroups([...optionGroups, { option_content: newGroupName}]);
        setAllOptions({...allOptions, [newGroupName]: []}); // 새로운 그룹의 빈데이터 추가
        setNewGroupName("");// 추가 후 초기화
    };

    // 그룹 삭제
    const handleRemoveGroup = (index) => {
        /*if (optionGroups.length === 1){ // 하나는 남아야 조작가능
            alert("최소한 하나의 그룹은 남아있어야 합니다.");
            return;
        }*/
        const groupToRemove = optionGroups[index].option_content;
        const updatedGroups= optionGroups.filter((_, i)=> i !==index);// 해당인덱스만 제거
        const updatedOptions = { ...allOptions };
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
    },[]);
    // 모든 옵션 데이터를 서버에 제출
    const handelSubmitTotal = () => {
        // entries 객체를 배열로 변환해주는 메소드
        // flatMap 중첩된 배열구조를 평탄화 하기 위해서 사용하는 함수 -괄호없애기
        const totalOptions = Object.entries(allOptions).flatMap(([option_content, options]) => {
            return options.map(option => ({
                ...option,
                option_content: option_content,
            }))
        })
        if (totalOptions === 0){
            alert("저장할 옵션이 없습니다. 옵션을 추가해주세요.")
            return;
        }
        console.log(totalOptions)
        axios
            .post(`http://localhost:7070/api/option`,totalOptions)
            .then((res)=>{
                console.log("성공로그:" +res)
                alert("옵션 그룹이 성공적으로 저장되었습니다.")
            })
            .catch( (err)=>{
                console.log("업로드에러: "+err)
                alert("옵션 저장에 실패했습니다. 잠시후 다시 시도해주세요.")
            })
    }




    return (
        <div style={{padding: "20px"}}>
            <h2>메뉴 옵션 관리 (Menu ID: {id})</h2>

            {/* 새로운 그룹 추가 UI */}
            <div>
                <input
                    type="text"
                    placeholder="새로운 그룹 이름 (예: 사이즈, 토핑)"
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

                        {group.option_content}{" "}
                        <button
                            type="button"
                            onClick={() => handleRemoveGroup(index)}
                        >
                            그룹 삭제
                        </button>

                    <MenuOptionForm
                        option_content={group.option_content}
                        onUpdate={(options) => handleOptionsUpdate(group.option_content, options)} // 실시간 업데이트
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
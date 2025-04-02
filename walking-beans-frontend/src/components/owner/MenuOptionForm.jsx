import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const MenuOptionForm = ({menuId ,optionName, onUpdate}) => {
    const {id} = useParams();

    // 입력필드
    const[formField, setFormFields] = useState([{menuId : menuId ,optionName:optionName, optionPrice:'' ,optionContent: ''}]);

    //필드추가기능
    const handleAddFields = () => {
        const values = [...formField, {menuId : menuId, optionName:optionName , optionPrice:'', optionContent:''}];
        setFormFields(values);
    };

    //필드제거시 하나씩 안빠지고 전체 빠짐
    const hanadleRemoveFields = (index) => {
        if(formField.length === 1){
            alert('최소한 하나의 폼은 남아있어야 합니다.')
            return;
        }
        const values = formField.filter((_, i)=> i !== index); // 인덱스가 일치하지 않은 요소만 남김
        setFormFields(values);
        /*
        const values = [...formField]; // 전체 배열 복사
        values.splice(index, 1); // index으로 부터 하나만 제거
        setFormFields(values);*/
    }
    // 인풋 입력시 name, value 값 넣기
    const handleInputChange = (index, e) =>{
        const values= [...formField];

        if(e.target.name === 'name'){
            values[index].optionContent = e.target.value;
        } else {
            values[index].optionPrice = e.target.value;
        }
        setFormFields(values);
    };

    // formField 가 변경될 때마다 부모로 데이터 전달
    useEffect(() => {
        onUpdate(formField);
        console.log('필드값 확인용',formField);
    }, [formField, onUpdate]);

    console.log("Rendering MenuOptionForm for", optionName)

    return (
        <div>
            {formField.map((field,index)=> (
                <div key={index} style={{margin: "10px"}}>
                    <input
                        type='text'
                        placeholder='옵션'
                        name='name'
                        value={field.optionContent}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                    />

                    <input
                        type='number'
                        placeholder='가격'
                        name='value'
                        value={field.optionPrice}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                    />
                    <button type='button' onClick={() => hanadleRemoveFields(index)}>
                        삭제
                    </button>

                </div>
            ))}
            <button type={"button"}
                    onClick={handleAddFields}
                    >
                새로운옵션
            </button>

        </div>
    );
}

export default MenuOptionForm;
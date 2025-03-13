import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const MenuOptionForm = () => {

    const {id} = useParams();
    // 입력필드
    const[formField, setFormFields] = useState([{menuId : id ,name:'',price:''}]);

    //필드추가기능
    const handleAddFields = () => {
        const values = [...formField, {menuId : id , name:'',price:''}];
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
            values[index].name = e.target.value;
        } else {
            values[index].price = e.target.value;
        }
        setFormFields(values);
    };

    //폼 제출시
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formField);
    };

    useEffect(() => {
        console.log('필드값 확인용',formField)
    }, [formField]);

    return (
        <form onSubmit={handleSubmit}>
            {formField.map((field,index)=> (
                <div key={index} style={{margin: "5px"}}>
                    <input
                        type='text'
                        placeholder='옵션'
                        name='name'
                        value={field.name}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                    />

                    <input
                        type='text'
                        placeholder='가격'
                        name='value'
                        value={field.price}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                    />
                    <button type='button' onClick={() => hanadleRemoveFields(index)}>
                        해당옵션삭제
                    </button>

                </div>
            ))}
            <button type={"button"}
                    onClick={handleAddFields}
                    >
                새로운옵션추가
            </button>

            <button type={'submit'}>
                저장하기
            </button>

        </form>
    );
}

export default MenuOptionForm;
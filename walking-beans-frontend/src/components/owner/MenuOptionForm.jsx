import {useEffect, useState} from "react";

const MenuOptionForm = () => {
    // 입력필드
    const[formField, setFormFields] = useState([{name:'',value:''}]);

    //필드추가기능
    const handleAddFields = () => {
        const values = [...formField, { name:'',value:''}];
        setFormFields(values);
    };

    //필드제거시 하나씩 안빠지고 전체 빠짐
    const hanadleRemoveFields = (index) => {
        if(formField.length === 1){
            alert('최소한 하나의 폼은 남아있어야 합니다.')
            return;
        }
        const values = [...formField].splice(index, 1);
        setFormFields(values);
    }
    // 인풋 입력시 name, value 값 넣기
    const handleInputChange = (index, e) =>{
        const values= [...formField];

        if(e.target.name === 'name'){
            values[index].name = e.target.value;
        } else {
            values[index].value = e.target.value;
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
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                    />
                    <button type='button' onClick={() => hanadleRemoveFields(index)}>
                        Remove
                    </button>

                </div>
            ))}
            <button type={"button"}
                    onClick={handleAddFields}
                    >
                필드더하기
            </button>

            <button type={'submit'}>
                제출하기
            </button>

        </form>
    );
}

export default MenuOptionForm;
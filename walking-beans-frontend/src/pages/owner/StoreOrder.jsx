import {useState} from "react";


const StoreOrder= () => {
    //모달창 상태
    const [isOpen, setIsOpen] = useState(false);
    const modalOpen = () => {  // 모달창 열기
        setIsOpen(true);
    };
    const modalClose = () => {  // 모달창 닫기
        setIsOpen(false);
    };
    return(
        <>
            <button modalOpen={modalOpen()}/>

            <modal isOpen={isOpen} modalClose={modalClose()}/>
        </>
    )

}

export default StoreOrder;
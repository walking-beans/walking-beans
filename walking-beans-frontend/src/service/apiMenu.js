import axios from "axios";
const API_MENU_URL = "http://localhost:7070/api/menu";


// navigate , modal , alert 결정해야함.
const apiMenu = {
    //모든 메뉴 불러오기
    fetchAllMenu:
        function (onSuccess,onErr) {
            axios
                .get(API_MENU_URL)
                .then( (res)=>{
                    if(onSuccess) onSuccess(res.data);
                })
                .catch( (err)=>{
                    console.log(err)
                    if(onErr) onErr(err);
                })
        },
    //메뉴 아이디 검색

    //메뉴 검색

    //메뉴 추가하기
    insertMenu:
        function (postdata) {
            axios
                .post(API_MENU_URL, postdata)
                .then((res) => {
                    console.log(res.data)
                    alert("데이터가 성공적으로 업로드 되었습니다.")
                })
                .catch((err) => {
                    console.log(err)
                    alert("데이터 전송에 실패했습니다. 잠시후 다시 시도해주세요.")
                })
        },
    //메뉴 수정하기
    updateMenu:
        function (id,postdata) {
            axios
                .put(`${API_MENU_URL}/${id}`,postdata)
                .then( (res)=>{
                    console.log(res.data)
                    alert("수정완료!")
                } )
                .catch( (err)=>{
                    console.log(err)
                    alert("데이터를 전송하지 못했습니다. 잠시후 다시 시도해주세요.")
                } )
        },
    //메뉴 삭제하기
    deleteMenu:
        function (id){
            axios
                .delete(`${API_MENU_URL}/${id}`)
                .then( ()=>{
                    alert("메뉴가 삭제 완료되었습니다.")
                })
                .catch( (err)=>{
                    console.log(err)
                    alert("요청을 보내지 못했습니다. 잠시후 다시 시도해주세요")
                })
        },

}

export default apiMenu;
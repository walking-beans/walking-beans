import axios from "axios";
const API_MENU_URL = "http://localhost:7070/api/menu";


// navigate , modal , alert 결정해야함.
// restful api 에 맞춰서 endpoint 변경.
const apiMenu = {
    //매장의 모든 메뉴 불러오기
    fetchAllMenu:
        function (id,onSuccess,onErr) {
            axios
                .get(`${API_MENU_URL}/storemenu/${id}`)
                .then( (res)=>{
                    if(onSuccess) onSuccess(res.data);
                })
                .catch( (err)=>{
                    console.log(err)
                    if(onErr) onErr(err);
                })
        },
    //메뉴 검색
    findAllMenuById:
        function (menuId,setMenus,updateFormData){
            axios
                .get(`${API_MENU_URL}/${menuId}`)
                .then((res) => {
                    console.log("findAllMenuById 응답:", res.data);
                    setMenus(res.data);
                    updateFormData(res.data);
                })
                .catch((err) => {
                    console.log("findAllMenuById 오류:", err);
                })
            // setIsLoading(false);
    },
    //메뉴 추가하기
    insertMenu:
        function (storeId,menuId,postdata) {
            axios
                .post(`${API_MENU_URL}/owner/${storeId}/menu/${menuId}`, postdata)
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
        function (storeId,menuId,postData) {
            axios
                .post(`${API_MENU_URL}/owner/${storeId}/menu/${menuId}`,
                    postData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },

                    })
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
        function (storeId,menuId){
            axios
                .delete(`${API_MENU_URL}/owner/${storeId}/menu/${menuId}`)
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
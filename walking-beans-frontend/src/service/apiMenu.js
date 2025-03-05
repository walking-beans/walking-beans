import axios from "axios";
const API_MENU_URL = "http://localhost:7070/api/menu";

const apiMenu = {

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
}

export default apiMenu;
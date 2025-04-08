import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiUserService from "../../service/apiUserService";
import '../../css/admin/AdminMypageUnlink.css';


function AdminMypageUnlink() {
    const [userId, setuserId] = useState('');
    const [isCheck, setCheck] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("user");


    useEffect(() => {
        apiUserService.sessionData((response) => {  //  sessionData() 올바르게 호출
            if (response && response.user_id) {
                setuserId(response.user_id);  //  userId 설정
                setUserRole(response.user_role || "user");
            } else {
                alert("로그인이 필요합니다.");
                navigate("/login");  //  로그인 페이지로 이동
            }
        });
    }, [navigate]);


    useEffect(() => {
        console.log("현재 userId:", userId); // ✅ userId 값 확인용 로그
        if (isDelete && userId) {
            apiUserService.delete(userId,
                (msg) => {
                    alert(msg)
                    setDelete(false);
                    navigate("/")
                },


                (err) => {
                    console.log("회원탈퇴 실패", err)
                    alert("회원탈퇴에 실패하였습니다.");
                    setDelete(false);
                    navigate("/unlink.success")
                }
            )
        }
    }, [isDelete, userId, navigate]);


    const deleteUser = () => {
        if (!isCheck) {
            alert("탈퇴 약관에 동의해야 합니다.")
            return;
        }
        setDelete(true);
    };


    return (
        <div className={`unlink-container ${userRole}`}>
            <h2>탈퇴 약관</h2>
            <div className="Withdrawal Policy">
                <p>1. 약관 내용1</p>
                <p>2. 약관 내용2</p>
                <p>3. 약관 내용3</p>
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={() => setCheck(!isCheck)}
                />
                위 약관에 동의합니다
            </label>
            <button onClick={deleteUser} disabled={!isCheck || isDelete}>
                {isDelete ? "탈퇴 진행 중..." : "탈퇴"}
            </button>
        </div>

    );
};

export default AdminMypageUnlink;

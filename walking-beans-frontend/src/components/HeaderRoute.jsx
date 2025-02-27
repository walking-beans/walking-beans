import UserHeader from "../pages/layout/UserHeader";
import RiderHeader from "../pages/layout/RiderHeader";

const HeaderRoute = () => {

    // session 에 저장되어있는 user 변수명에 저장된 로그인 정보 확인
    const storedUser = localStorage.getItem("users");
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log("HeaderRoute users : " + user);

    if (!user) {
        // return <UserHeader />
        return <RiderHeader/>
    } else {
        switch (user.userRole) {
            case 1, "1" :
                return <UserHeader />
            case 2, "2" :
                return <RiderHeader />
            case 3, "3" :
            default :
                return <UserHeader />
        }
    }
};

export default HeaderRoute;
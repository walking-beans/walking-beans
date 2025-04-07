import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import UserHeader from "../pages/layout/UserHeader";
import RiderHeader from "../pages/layout/RiderHeader";
import SearchHeader from "../pages/layout/SearchHeader";
import OwnerHeader from "../pages/layout/OwnerHeader";

const HeaderRoute = ({user, riderOnDuty, setRiderOnDuty}) => {
    const location = useLocation(); // 현재 URL 확인
    const [currentHeader, setCurrentHeader] = useState(<UserHeader user={user}/>);

    useEffect(() => {
        //   console.log("현재 로그인된 사용자:", user);
        //   console.log("현재 경로:", location.pathname);

        /*if (location.pathname.startsWith("/rider")) {
            setCurrentHeader(<RiderHeader user={user}/>);
        } else if (location.pathname.startsWith("/user/search/map")){
            setCurrentHeader(<SearchHeader user={user}  />);
        }
        // 2. `/`로 돌아오면 UserHeader로 변경
        else {
            setCurrentHeader(<UserHeader user={user}/>);
        }*/
        if (location.pathname.startsWith("/rider")) {
            setCurrentHeader(<RiderHeader user={user}
                                          riderOnDuty={riderOnDuty}
                                          setRiderOnDuty={setRiderOnDuty}/>);
            // /owner
        } else if (location.pathname.startsWith("/owner")) {
            /** 추후 변경 요망 **/
            setCurrentHeader(<UserHeader user={user}/>);
            // /user/search/map
        } else if (location.pathname.startsWith("/user/search/map")) {
            setCurrentHeader(<SearchHeader user={user}/>);
            // /mypage || /chat
        } else if (location.pathname.startsWith("/mypage") ||
            location.pathname.startsWith("/chat") ||
            location.pathname.startsWith("/alarmlist") ||
            location.pathname === "/certification" ||
            location.pathname === "/infoCorrection" ||
            location.pathname === "/unlink" ||
            location.pathname === "/unlink/success") {
            if (user.user_role === "user") {
                setCurrentHeader(<UserHeader user={user}/>);
            } else if (user.user_role === "rider") {
                setCurrentHeader(<RiderHeader user={user}
                                              riderOnDuty={riderOnDuty}
                                              setRiderOnDuty={setRiderOnDuty}/>);
            } else if (user.user_role === "owner") {
                /** 추후 변경 요망 **/
                setCurrentHeader(<UserHeader user={user}/>);
            } else {
                // admin or default
                setCurrentHeader(<UserHeader user={user}/>);
            }
        } else {
            setCurrentHeader(<UserHeader user={user}/>);
        }
    }, [location.pathname, user]); // URL 변경될 때마다 실행


    return currentHeader;
};

export default HeaderRoute;
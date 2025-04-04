import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import UserHeader from "../pages/layout/UserHeader";
import RiderHeader from "../pages/layout/RiderHeader";
import SearchHeader from "../pages/layout/SearchHeader";

const HeaderRoute = ({user, riderOnDuty, setRiderOnDuty}) => {
    const location = useLocation(); // 현재 URL 확인
    const [currentHeader, setCurrentHeader] = useState(null);

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
        const path = location.pathname;

        if (path.startsWith("/rider")) {
            setCurrentHeader(
                <RiderHeader
                    user={user}
                    riderOnDuty={riderOnDuty}
                    setRiderOnDuty={setRiderOnDuty}
                />
            );
        } else if (path.startsWith("/owner")) {
            setCurrentHeader(<UserHeader user={user} />);
        } else if (path.startsWith("/user/search/map")) {
            setCurrentHeader(<SearchHeader user={user} />);
        } else if (path.startsWith("/alarmlist")) {
            if (user?.user_role === "rider") {
                setCurrentHeader(
                    <RiderHeader
                        user={user}
                        riderOnDuty={riderOnDuty}
                        setRiderOnDuty={setRiderOnDuty}
                    />
                );
            } else {
                setCurrentHeader(<UserHeader user={user} />);
            }
        } else {
            setCurrentHeader(<UserHeader user={user} />);
        }
    }, [location.pathname, user]); // URL 변경될 때마다 실행

    return currentHeader;
};

export default HeaderRoute;
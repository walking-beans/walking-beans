import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import UserHeader from "../pages/layout/UserHeader";
import RiderHeader from "../pages/layout/RiderHeader";
import OwnerHeader from "../pages/layout/OwnerHeader";

const HeaderRoute = ({user}) => {
    const location = useLocation();
    const [currentHeader, setCurrentHeader] = useState(<UserHeader user={user}/>);

    useEffect(() => {
        // 현재 경로에 따라 적절한 헤더 설정
        if (location.pathname.startsWith("/owner")) {
            setCurrentHeader(<OwnerHeader user={user} />);
        } else if (location.pathname.startsWith("/rider")) {
            setCurrentHeader(<RiderHeader user={user} />);
        } else {
            setCurrentHeader(<UserHeader user={user} />);
        }
    }, [location.pathname, user]);
    return currentHeader;
};

export default HeaderRoute;

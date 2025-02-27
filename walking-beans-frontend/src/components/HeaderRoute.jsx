import UserHeader from "../pages/layout/UserHeader";
import RiderHeader from "../pages/layout/RiderHeader";

const HeaderRoute = ({ user }) => {
    if (!user) {
        return <UserHeader user={null} />;
    } else {
        switch (parseInt(user.user_role, 10)) {
            case 1:
                return <UserHeader user={user} />;
            case 2:
                return <RiderHeader user={user} />;
            case 3:
            default:
                return <UserHeader user={user} />;
        }
    }
};

export default HeaderRoute;

import {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserHome from "./UserHome";
import StoreMain from "../pages/owner/StoreMain";
import StoreMenuDetail from "../pages/owner/StoreMenuDetail";
import StoreMenuForm from "../pages/owner/StoreMenuForm";
import StoreMenuOption from "../pages/owner/StoreMenuOption";
import StoreMenuOptionDetail from "../pages/owner/StoreMenuOptionDetail";
import StoreMenuOptionForm from "../pages/owner/StoreMenuOptionForm";
import StoreMyStore from "../pages/owner/StoreMyStore";
import StoreRevenue from "../pages/owner/StoreRevenue";
import StoreOrder from "../pages/owner/StoreOrder";
import StoreMenu from "../pages/owner/StoreMenu";
import RiderMain from "../pages/rider/RiderMain";
import RiderOntheway from "../pages/rider/RiderOntheway";
import RiderResult from "../pages/rider/RiderResult";
import RiderOrderList from "../pages/rider/RiderOrderList";
import RiderOrder from "../pages/rider/RiderOrder";
import RiderIncome from "../pages/rider/RiderIncome";
import UserHeader from "../pages/layout/UserHeader";
import ProtectedRoute from "./ProtectedRoute";
import HeaderRoute from "./HeaderRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import UserOrder from "../pages/user/UserOrder";
import UserCart from "../pages/user/UserCart";
import UserOrderDetail from "../pages/user/UserOrderDetail";
import UserPayment from "../pages/user/UserPayment";
import UserOrderList from "../pages/user/UserOrderList";


function AdminChattingroom() {
    return null;
}

function AdminMessage() {
    return null;
}

function PathRoute () {
    const [user,setUser] = useState(null);

    return(
        <BrowserRouter>
            <Routes>
                {/**/}
                <Route path="/" element={<UserHome/>}/>

                {/* 1. user */}
                <Route path="/user/order/:orderid" element={<UserOrder/>}/>
                <Route path="/user/ordercart/:orderid/:cartId" element={<UserCart/>}/>
                <Route path="/user/orderlist" element={<UserOrderList/>}/>
                <Route path="/user/orderlist/:orderid" element={<UserOrderDetail/>}/>
                <Route path="/user/payment" element={<UserPayment/>}/>

                {/* 2. rider  */}
                <Route path="/rider" element={
                    <RiderMain/>}
                /*<ProtectedRoute allowedRoles={[2]}>
                    </ProtectedRoute>*/
                />
                <Route path="/rider/ontheway/:orderId" element={
                    <RiderOntheway/>}
                />
                <Route path="/rider/result" element={
                    <RiderResult/>}
                />
                <Route path="/rider/orderlist" element={
                    <RiderOrderList/>}
                />
                <Route path="/rider/order/:orderId" element={
                    <RiderOrder/>}
                />
                <Route path="/rider/income" element={
                    <RiderIncome/>}
                />

                {/* 3. owner  */}
                <Route path="/owner" element={<StoreMain />}/>
                <Route path="/owner/menu" element={<StoreMenu />}/>
                <Route path="/owner/menudetail" element={<StoreMenuDetail />}/>
                <Route path="/owner/menuform" element={<StoreMenuForm />}/>
                <Route path="/owner/menuoption" element={<StoreMenuOption />}/>
                <Route path="/owner/menuoptiondetail" element={<StoreMenuOptionDetail />}/>
                <Route path="/owner/menuoptiondeform" element={<StoreMenuOptionForm />}/>
                <Route path="/owner/mystore" element={<StoreMyStore />}/>
                <Route path="/owner/order" element={<StoreOrder />}/>
                <Route path="/owner/revenue" element={<StoreRevenue />}/>


                {/* 4. admin  */}
                <Route path="/chattingroom/:userId" element={<AdminChattingroom/>}/>
                <Route path="/message/:roomId" element={<AdminMessage/>}/>
                <Route path="/login" element={<AdminLogin />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default PathRoute;
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
import Login from "../pages/custom-login/Login";



import HeaderRoute from "./HeaderRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminMypageInfoCorrection from "../pages/admin/AdminMypageInfoCorrection";
import AdminMypage from "../pages/admin/AdminMypage";


import UserOrder from "../pages/user/UserOrder";
import UserCart from "../pages/user/UserCart";
import UserOrderDetail from "../pages/user/UserOrderDetail";
import UserPayment from "../pages/user/UserPayment";
import UserOrderList from "../pages/user/UserOrderList";

import "./PathRoute.css";
import AdminMessage from "../pages/admin/AdminMessage";
import AdminChattingroom from "../pages/admin/AdminChattingroom";
import UserSearchMap from "../pages/user/UserSerachMap";


function PathRoute () {
    const [user,setUser] = useState(null);

    return(
        <div className="layout-container">
            <BrowserRouter>
                <HeaderRoute user={user}/>
                <div className="content-wrapper">
                    <div className="container d-flex justify-content-center">
                        {/* <div className="col-md-8 col-12">*/}
                        <div className=" col-12">
                            <Routes>
                                {/* 기본 페이지 및 로그인 */}
                                <Route path="/" element={<UserHome/>}/>
                                <Route path="/login" element={<Login/>}/>

                                {/* 라이더 관련 라우트 */}
                                <Route path="/rider" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderMain/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/ontheway" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderOntheway/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/result" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderResult/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/orderlist" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderOrderList/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/order" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderOrder/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/income" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderIncome/>
                                    </ProtectedRoute>
                                }/>

                                {/* 사장님 관련 라우트 */}
                                <Route path="/owner" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMain/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menu" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenu/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menudetail" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenuDetail/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuform" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenuForm/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoption" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenuOption/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoptiondetail" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenuOptionDetail/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoptiondeform" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMenuOptionForm/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/mystore" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreMyStore/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/order" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreOrder/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/revenue" element={
                                    <ProtectedRoute allowedRoles={["store"]}>
                                        <StoreRevenue/>
                                    </ProtectedRoute>
                                }/>

                                {/* 관리자 관련 라우트 */}
                                <Route path="/chat" element={<AdminChattingroom/>}/>
                                <Route path="/message" element={<AdminMessage/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
                {user?.user_role !== "rider" && <Footer/>}
            </BrowserRouter>
        </div>
    )
}

export default PathRoute;
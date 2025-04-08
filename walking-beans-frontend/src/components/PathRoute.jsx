import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Footer from "../pages/custom-login/Footer";
import HeaderRoute from "./HeaderRoute";
import UserHome from "./UserHome";
import StoreMain from "../pages/owner/StoreMain";
import StoreMenuOption from "../pages/owner/StoreMenuOption";
import StoreMyStore from "../pages/owner/StoreMyStore";
import StoreRevenue from "../pages/owner/StoreRevenue";
import StoreOrder from "../pages/owner/StoreOrder";
import StoreMenu from "../pages/owner/StoreMenu";
import RiderMain from "../pages/rider/RiderMain";
import RiderOntheway from "../pages/rider/RiderOntheway";
import RiderResult from "../pages/rider/RiderResult";
import RiderOrderList from "../pages/rider/RiderOrderList";
import RiderIncome from "../pages/rider/RiderIncome";
import ProtectedRoute from "./ProtectedRoute";
import UserOrder from "../pages/user/UserOrder";

import "./PathRoute.css";
import UserSearchMap from "../pages/user/UserSerachMap";
import AdminChattingroom from "../pages/admin/AdminChattingroom";
import AdminMessage from "../pages/admin/AdminMessage";
import AdminLogin from "../pages/admin/AdminLogin";

import AdminMypage from "../pages/admin/AdminMypage";

import UserInsertAddress from "../pages/user/UserInsertAddress";
import UserOrderCheckout from "../pages/user/UserOrderCheckout";
import AdminMessageTEST from "../pages/admin/AdminMessageTEST";
import AdminChattingroomTest from "../pages/admin/AdminChattingroomTest";
import AdminAlarmList from "../pages/admin/AdminAlarmList";
import UserDeliveryStatus from "../pages/user/UserDeliveryStatus";


import AdminMypageInfoCorrection from "../pages/admin/AdminMypageInfoCorrection";
import AdminMypageUnlink from "../pages/admin/AdminMypageUnlink";
import AdminMypageUnlinkSuccess from "../pages/admin/AdminMypageUnlinkSuccess";
import AdminMypageCertification from "../pages/admin/AdminMypageCertification";


import UserReviewWrite from "../pages/user/UserReviewWrite";
import AdminChangeRole from "../pages/admin/AdminChangeRole";
import StoreMenuDetail from "../pages/owner/StoreMenuDetail";
import UserSuccessPage from "../pages/user/UserSuccessPage";
import {UserFailPage} from "../pages/user/UserFailPage";
import UserCheckoutPage from "../pages/user/UserCheckoutPage";
import UserOrderList from "../pages/user/UserOrderList";
import UserOrderDetail from "../pages/user/UserOrderDetail";
import UserStoreReview from "../pages/user/UserStoreReview";
import RiderOrderStatus from "./rider/RiderOrderStatus";

import StoreRegister from "../pages/owner/StoreRegister";

import UserCart from "../pages/user/UserCart";
import ErrorPage from "../pages/layout/ErrorPage";
import AdminPage from "../pages/admin/AdminPage";
import StoreMenuRegister from "../pages/owner/StoreMenuRegister";

import UserProtectedRoute from './UserProtectedRoute';
import AdminLoginRequiredPage from "../pages/admin/AdminLoginRequiredPage";


function PathRoute() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState();
    const [currentOrderId, setCurrentOrderId] = useState();

    /*** rider ***/
        // 운행 중 or 퇴근
    const [riderOnDuty, setRiderOnDuty] = useState(false);


    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("JSON 파싱 에러:", error);
            return null;
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            try {
                setUser(updatedUser ? JSON.parse(updatedUser) : null);
            } catch (error) {
                console.error("JSON 파싱 에러:", error);
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    return (
        <div className="layout-container">
            <BrowserRouter>
                <HeaderRoute user={user}
                             riderOnDuty={riderOnDuty}
                             setRiderOnDuty={setRiderOnDuty}
                />
                <div className="content-wrapper">

                    {/* <div className="col-md-8 col-12">*/}

                    <Routes>
                        {/* 에러 페이지 */}
                        <Route path="/error" element={<ErrorPage/>}/>

                        {/* 기본 페이지 및 로그인 */}
                        <Route path="/" element={<UserHome/>}/>
                        <Route path="/login" element={<AdminLogin/>}/>
                        <Route path="/updaterole" element={
                            <ProtectedRoute allowedRoles={["noRole"]}>
                                <AdminChangeRole/>
                            </ProtectedRoute>
                        }/>

                        {/*로그인 제한 페이지*/}
                        <Route path="/loginrequired" element={<AdminLoginRequiredPage/>}/>

                        <Route path="/mypage" element={<AdminMypage/>}/>


                        <Route path="/certification" element={<AdminMypageCertification/>}/>


                        <Route path="/infoCorrection" element={<AdminMypageInfoCorrection/>}/>
                        <Route path="/unlink" element={<AdminMypageUnlink/>}/>
                        <Route path="/unlink/success" element={<AdminMypageUnlinkSuccess/>}/>

                        {/* 유저 관련 라우트*/}
                        <Route path="/store/:storeId" element={<UserOrder/>}/>

                        <Route element={<UserProtectedRoute/>}>
                            {/* 주문하기 페이지*/}
                            <Route path="/order/checkout/:userId" element={<UserOrderCheckout/>}/>

                            {/* 결제하기 페이지*/}
                            <Route path="/checkout" element={<UserCheckoutPage/>}/>

                            {/*2. 인증 완료되었을 경우 결제 실행*/}
                            <Route path="/sandbox/success" element={<UserSuccessPage/>}/>

                            {/*3. 인증 실패 결제 실패*/}
                            <Route path="/sandbox/fail" element={<UserFailPage/>}/>

                            {/* 유저 배달현황 */}
                            <Route path="/user/delivery/status/:orderNumber" element={<UserDeliveryStatus/>}/>

                            {/*주문 목록 리스트*/}
                            <Route path="/order" element={<UserOrderList/>}/>

                            {/*주문 상세정보*/}
                            <Route path="/order/:orderNumber" element={<UserOrderDetail/>}/>
                        </Route>

                        <Route path="user/review/:storeId" element={<UserStoreReview/>}/>
                        <Route path="/user/reviewWrite/:orderId"
                               element={<UserReviewWrite storeId={selectedStoreId} orderId={currentOrderId}/>}/>

                        <Route path="/user/search/map"
                               element={<UserSearchMap searchResults={searchResults}/>}/>
                        <Route path="/user/search/map" element={<UserSearchMap/>}/>

                        <Route path="/user/insertAddress" element={<UserInsertAddress/>}/>

                        <Route path="/rider" element={
                            <RiderMain
                                user={user}
                                riderOnDuty={riderOnDuty}
                                setRiderOnDuty={setRiderOnDuty}
                            />
                        }/>
                        <Route path="/rider/ontheway/:orderId" element={
                            <ProtectedRoute allowedRoles={["rider"]}>
                                <RiderOntheway
                                    user={user}
                                />
                            </ProtectedRoute>
                        }/>
                        <Route path="/rider/result/:orderId" element={
                            <ProtectedRoute allowedRoles={["rider"]}>
                                <RiderResult user={user}/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/rider/orderlist" element={
                            <ProtectedRoute allowedRoles={["rider"]}>
                                <RiderOrderList user={user}/>
                            </ProtectedRoute>
                        }/>

                        <Route path="/rider/income" element={
                            <ProtectedRoute allowedRoles={["rider"]}>
                                <RiderIncome user={user}/>
                            </ProtectedRoute>
                        }/>

                        {/* 사장님 관련 라우트 */}
                        <Route path="/owner" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMain/>
                            </ProtectedRoute>
                        }/>
                        {/*id = storeId */}
                        <Route path="/owner/:id/menu" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMenu/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/owner/:storeId/menuresister" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMenuRegister/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/owner/:storeId/menu/:menuId" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMenuDetail/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/owner/:storeId/:menuId/menuoption" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMenuOption/>
                            </ProtectedRoute>
                        }/>
                        {/* id = userId 유저 id, 유저만 신규 가게 등록이 가능하도록 제한*/}
                        <Route path="/user/:id/storeregister/" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreRegister/>
                            </ProtectedRoute>
                        }/>
                        {/* id = storeId 업주 본인 가게 id*/}
                        <Route path="/owner/:id/mystore/" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreMyStore/>
                            </ProtectedRoute>
                        }/>
                        {/* id = storeId 업주 본인 가게 id*/}
                        <Route path="/owner/:id/order" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreOrder/>
                            </ProtectedRoute>
                        }/>
                        {/* id = storeId 업주 본인 가게 id*/}
                        <Route path="/owner/:id/revenue" element={
                            <ProtectedRoute allowedRoles={["owner"]}>
                                <StoreRevenue/>
                            </ProtectedRoute>
                        }/>

                        {/* 관리자 관련 라우트 */}
                        <Route path="/chat/chattingroom" element={<AdminChattingroom user={user}/>}/>
                        <Route path="/chat/message/:roomId" element={<AdminMessage user={user}/>}/>

                        {/*관리자 페이지*/}
                        <Route path="/adminpage" element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <AdminPage/>
                            </ProtectedRoute>
                        }/>


                        {/*알림 리스트 페이지*/}
                        <Route path="/alarmlist" element={
                            <ProtectedRoute allowedRoles={["user", "rider", "owner", "admin"]}>
                                <AdminAlarmList/>
                            </ProtectedRoute>
                        }/>
                    </Routes>


                </div>
                {user?.user_role !== "rider" && <Footer/>}
            </BrowserRouter>
        </div>

    )
}

export default PathRoute;

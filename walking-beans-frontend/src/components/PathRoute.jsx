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
import RiderOrder from "../pages/rider/RiderOrder";
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
import AdminNewAlarm from "../pages/admin/AdminNewAlarm";
import AdminAlarmList from "../pages/admin/AdminAlarmList";
import UserDeliveryStatus from "../pages/user/UserDeliveryStatus";

import AdminResultFindPw from "../pages/admin/AdminResultFindPw";

import AdminMypageInfoCorrection from "../pages/admin/AdminMypageInfoCorrection";
import AdminMypageUnlink from "../pages/admin/AdminMypageUnlink";
import AdminMypageUnlinkSuccess from "../pages/admin/AdminMypageUnlinkSuccess";



import UserReviewWrite from "../pages/user/UserReviewWrite";
import AdminChangeRole from "../pages/admin/AdminChangeRole";
import StoreMenuDetail from "../pages/owner/StoreMenuDetail";
import UserSuccessPage from "../pages/user/UserSuccessPage";
import {UserFailPage} from "../pages/user/UserFailPage";
import UserCheckoutPage from "../pages/user/UserCheckoutPage";
import AdminSignUp from "../pages/admin/AdminSignUp";
import UserOrderList from "../pages/user/UserOrderList";
import UserOrderDetail from "../pages/user/UserOrderDetail";
import UserPayment from "../pages/user/UserPayment";
import UserStoreReview from "../pages/user/UserStoreReview";
import RiderOrderStatus from "./rider/RiderOrderStatus";
import UserCart from "../pages/user/UserCart";

function PathRoute() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStoreId,setSelectedStoreId] = useState();
    const [currentOrderId,setCurrentOrderId] = useState();

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
                    <div className="container d-flex justify-content-center p-0">
                        {/* <div className="col-md-8 col-12">*/}
                        <div className=" col-12">
                            <Routes>
                                {/* 기본 페이지 및 로그인 */}
                                <Route path="/" element={<UserHome/>}/>
                                <Route path="/login" element={<AdminLogin/>}/>
                                <Route path="/updaterole" element={<AdminChangeRole />}/>
                                <Route path="/changeRole" element={<AdminSignUp />}/>{/* 알림 확인용 수동 롤 변경 페이지*/}

                                <Route path="/mypage" element={<AdminMypage/>}/>
                                { /* <Route path="/certification" element={<AdminMypageCertification/>}/> */ }
                                <Route path="/infoCorrection" element={<AdminMypageInfoCorrection/>}/>
                                <Route path="/unlink" element={<AdminMypageUnlink/>}/>
                                <Route path="/unlink/success" element={<AdminMypageUnlinkSuccess/>}/>

                                {/* 유저 관련 라우트*/}
                                <Route path="/store/:storeId" element={<UserOrder />} />

                                {/* 주문하기 페이지*/}
                                <Route path="/order/checkout/:userId" element={<UserOrderCheckout />}/>

                                {/* 결제하기 페이지*/}
                                {/* 1. checkout toss API KEY 인증*/}
                                <Route path="/checkout" element={<UserCheckoutPage />} />

                                {/*2. 인증 완료되었을 경우 결제 실행*/}
                                <Route path="/sandbox/success" element={<UserSuccessPage />} />

                                {/*3. 인증 실패 결제 실패*/}
                                <Route path="/sandbox/fail" element={<UserFailPage />} />

                                {/* 유저 배달현황 */}
                                <Route path="/user/delivery/status/:orderNumber" element={<UserDeliveryStatus/>}/>

                                {/*주문 목록 리스트*/}
                                <Route path="/order" element={<UserOrderList />} />

                                {/*주문 상세정보*/}
                                <Route path="/order/:orderNumber" element={<UserOrderDetail />} />

                                <Route path="/order/test" element={<RiderOrderStatus />} />

                                <Route path="user/review/:storeId" element={<UserStoreReview/>}/>
                                <Route path="/user/reviewWrite/:orderId" element={<UserReviewWrite storeId={selectedStoreId} orderId={currentOrderId}/>}/>

                                <Route path="/user/search/map" element={<UserSearchMap searchResults={searchResults} />} />
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
                                        <RiderOntheway/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/result/:orderId" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderResult/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/orderlist" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderOrderList  user={user}/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/order" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderOrder/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/rider/income" element={
                                    <ProtectedRoute allowedRoles={["rider"]}>
                                        <RiderIncome  user={user}/>
                                    </ProtectedRoute>
                                }/>

                                {/* 사장님 관련 라우트 */}
                                <Route path="/owner" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMain/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menu" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenu/>
                                    </ProtectedRoute>
                                }/>

                                <Route path="/owner/menu/:id" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuDetail/>
                                    </ProtectedRoute>
                                }/>
                                {/* id는 연결되는 메뉴id */}
                                <Route path="/owner/menuoption/:id" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuOption/>
                                    </ProtectedRoute>
                                }/>

                                <Route path="/owner/mystore" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMyStore/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/order" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreOrder/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/revenue" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreRevenue/>
                                    </ProtectedRoute>
                                }/>

                                {/* 관리자 관련 라우트 */}
                                <Route path="/chat/chattingroom" element={user ? <AdminChattingroom user={user} /> : <div>Loading...</div>}/>
                                <Route path="/chat/message/:roomId" element={<AdminMessage user={user} />}/>

                                <Route path="/TEST/message/:roomId" element={<AdminMessageTEST />}/>
                                <Route path="/TEST/chattingroom" element={<AdminChattingroomTest />}/>

                                <Route path="/alarmlist" element={<AdminAlarmList />}/>
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
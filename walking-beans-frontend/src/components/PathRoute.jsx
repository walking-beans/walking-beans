import {useEffect, useState} from "react";
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
import UserOrdering from "../pages/user/UserOrdering";
import AdminMessageTEST from "../pages/admin/AdminMessageTEST";
import AdminChattingroomTest from "../pages/admin/AdminChattingroomTest";
import AdminNewAlarm from "../pages/admin/AdminNewAlarm";
import AdminAlarmList from "../pages/admin/AdminAlarmList";
import UserDeliveryStatus from "../pages/user/UserDeliveryStatus";

import AdminResultFindPw from "../pages/admin/AdminResultFindPw";
import UserReviewWrite from "../pages/user/UserReviewWrite";
import StoreMenuDetail from "../pages/owner/StoreMenuDetail";
import UserSuccess from "../pages/user/UserSuccess";
import {FailPage} from "../pages/user/Failpage";
import CheckoutPage from "../pages/user/CheckoutPage";

function PathRoute() {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStoreId,setSelectedStoreId] = useState();
    const [currentOrderId,setCurrentOrderId] = useState();


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
                <HeaderRoute user={user}/>
                <div className="content-wrapper">
                    <div className="container d-flex justify-content-center p-0">
                        {/* <div className="col-md-8 col-12">*/}
                        <div className=" col-12">
                            <Routes>
                                {/* 기본 페이지 및 로그인 */}
                                <Route path="/" element={<UserHome/>}/>
                                <Route path="/login" element={<AdminLogin/>}/>
                                <Route path="/alarm" element={<AdminNewAlarm/>}/> {/*알람 테스트 페이지1*/}
                                <Route path="/alarmtest" element={<AdminResultFindPw />}/>{/*알람 테스트 페이지2*/}

                                <Route path="/mypage" element={<AdminMypage/>}/>

                                {/* 유저 관련 라우트 */}
                                <Route path="/user/order/:storeId" element={<UserOrder/>}/>
                                {/* 주문하기 페이지 */}
                                <Route path="/user/ordering/:orderId" element={<UserOrdering />}/>
                                {/* 결제하기 페이지 */}
                                {/* 1. checkout toss API KEY 인증*/}
                                <Route path="/checkout" element={<CheckoutPage />} />

                                {/*2. 인증 완료되었을 경우 결제 실행*/}
                                <Route path="/sandbox/success" element={<UserSuccess />} />

                                {/*3. 인증 실패 결제 실패*/}
                                <Route path="/sandbox/fail" element={<FailPage />} />

                                <Route path="/user/reviewWrite" element={<UserReviewWrite storeId={selectedStoreId} orderId={currentOrderId}/>}/>
                                <Route path="/user/search/map" element={<UserSearchMap searchResults={searchResults} />} />
                                <Route path="/user/insertAddress" element={<UserInsertAddress/>}/>

                                <Route path="/user/delivery/status/:orderId" element={<UserDeliveryStatus/>}/>

                                <Route path="/user/search/map" element={<UserSearchMap/>}/>

                                {/* 라이더 관련 라우트 */}
                                <Route path="/rider" element={
                                    <RiderMain/>
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
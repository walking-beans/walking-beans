import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "../pages/custom-login/Footer";
import HeaderRoute from "./HeaderRoute";
import UserHome from "./UserHome";
import StoreMain from "../pages/owner/StoreMain";
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
import ProtectedRoute from "./ProtectedRoute";
import UserOrderDetail from "../pages/user/UserOrderDetail";
import UserPayment from "../pages/user/UserPayment";
import UserOrderList from "../pages/user/UserOrderList";

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
import UserOrder from "../pages/user/UserOrder";
import {CheckoutPage} from "../pages/user/teacherJSX/CheckoutPage";
import {FailPage} from "../pages/user/teacherJSX/Fail";
import Success from "../pages/user/teacherJSX/Success";
import OrderDetail from "../pages/user/teacherJSX/OrderDetail";
import OrderList from "../pages/user/teacherJSX/OrderList";
import AlarmPage from "../pages/owner/teacherUi/AlarmPage";


function PathRoute() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                //  console.log("로컬스토리지에서 가져온 유저:", parsedUser);
                setUser(parsedUser);
            } catch (error) {
                //  console.error("JSON 파싱 에러:", error);
            }
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("userChange", handleStorageChange);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("userChange", handleStorageChange);
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
                                <Route path="/alarm" element={<AdminNewAlarm/>}/>

                                <Route path="/admin/mypage" element={<AdminMypage/>}/>

                                {/* 유저 관련 라우트
                                <Route path="/cart/:userId" element={<UserOrder />} />
                                <Route path="/user/order/:storeId" element={<UserOrder/>}/>
                                */}
                                <Route path="/user/order/:storeId/:userId?" element={<UserOrder />} />

                                {/* 장바구니 담았을 때 페이지
                                <Route path="/user/order/:storeId/:menuId/:orderId/:cartId" element={<UserOrder/>}/>
                                */}
                                {/* 주문하기 페이지 */}
                                <Route path="/user/order/:storeId/:menuId/:orderId/:cartId/:userId/ordering"
                                       element={<UserOrdering/>}/>
                                {/* 결제하기 페이지 */}
                                <Route path="/user/order/:storeId/:menuId/:orderId/:cartId/:userId/payment"
                                       element={<UserPayment/>}/>

                                <Route path="/user/orderlist" element={<UserOrderList/>}/>
                                <Route path="/user/orderlist/:orderId" element={<UserOrderDetail/>}/>
                                <Route path="/user/insertAddress" element={<UserInsertAddress/>}/>
                                <Route path="/user/search/map" element={<UserSearchMap/>}/>
                                <Route path="/order/:orderNumber" element={<OrderDetail />} />


                                <Route path="/owner/alarm" element={<AlarmPage />} />
                                <Route path="/order" element={<OrderList />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/sandbox/success" element={<Success />} />
                                <Route path="/sandbox/fail" element={<FailPage />} />
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
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMain/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menu" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenu/>
                                    </ProtectedRoute>
                                }/>

                                <Route path="/owner/menuform" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuForm/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoption" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuOption/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoptiondetail" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuOptionDetail/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/owner/menuoptiondeform" element={
                                    <ProtectedRoute allowedRoles={["owner"]}>
                                        <StoreMenuOptionForm/>
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
                                <Route path="/chat/chattingroom" element={<AdminChattingroom/>}/>
                                <Route path="/chat/message/:roomId" element={<AdminMessage/>}/>
                                <Route path="/TEST/message/:roomId" element={<AdminMessageTEST/>}/>
                                <Route path="/TEST/chattingroom/:roomId" element={<AdminChattingroomTest/>}/>

                                <Route path="/alarmlist" element={<AdminAlarmList/>}/>
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
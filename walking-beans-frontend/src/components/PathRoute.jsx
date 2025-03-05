import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "../pages/custom-login/Footer";
import HeaderRoute from "./HeaderRoute";
import Login from "../pages/custom-login/Login";
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
import ProtectedRoute from "./ProtectedRoute";


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
import UserSearchMap from "../pages/user/UserSerachMap";

function AdminChattingroom() {
    return null;
}

function AdminMessage() {
    return null;
}


function PathRoute () {
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
                                  
                                {/* 유저 관련 라우트 */}
                                <Route path="/user/order/:orderid" element={<UserOrder/>}/>
                                <Route path="/user/ordercart/:orderid/:cartId" element={<UserCart/>}/>
                                <Route path="/user/orderlist" element={<UserOrderList/>}/>
                                <Route path="/user/orderlist/:orderid" element={<UserOrderDetail/>}/>
                                <Route path="/user/payment" element={<UserPayment/>}/>

                                {/* 유저 관련 라우트 */}
                                <Route path="user/search/map" element={<UserSearchMap/>}/>

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



                {/* 4. admin  */}
                <Route path="/chattingroom/:userId" element={<AdminChattingroom/>}/>
                <Route path="/message/:roomId" element={<AdminMessage/>}/>
                <Route path="/login" element={<AdminLogin />}/>
                <Route path="/infoCorrection" element={<AdminMypageInfoCorrection/>}/>
                <Route path="/admin/mypage" element={<AdminMypage/>}/>

            </Routes>
        </BrowserRouter>


                                {/* 관리자 관련 라우트 */}
                                <Route path="/chattingroom/:userId" element={<AdminChattingroom/>}/>
                                <Route path="/message/:roomId" element={<AdminMessage/>}/>
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
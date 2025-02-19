import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import UserHome from "./UserHome";


function PathRoute () {
    const [user,setUser] = useState(null);

    return(
        <BrowserRouter>
            <Route>
                {/**/}
                <Route path="/" element={<UserHome/>}/>

                {/* 2. rider  */}
                <Route path="/rider" element={<RiderMain/>}/>
                <Route path="/rider/ontheway" element={<RiderOntheway/>}/>
                <Route path="/rider/result" element={<RiderResult/>}/>
                <Route path="/rider/orderlist" element={<RiderOrderList/>}/>
                <Route path="/rider/order" element={<RiderOrder/>}/>
                <Route path="/rider/income" element={<RiderIncome/>}/>

                {/* 4. admin  */}
                <Route path="/chattingroom/:userId" element={<AdminChattingroom/>}/>
                <Route path="/message/:roomId" element={<AdminMessage/>}/>

            </Route>
        </BrowserRouter>
    )
}

export default PathRoute;
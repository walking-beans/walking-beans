import {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import UserHome from "./UserHome";


function PathRoute () {
    const [user,setUser] = useState(null);

    return(
        <BrowserRouter>
            <Route>
                <Route path="/" element={<UserHome/>}/>
            </Route>
        </BrowserRouter>
    )
}

export default PathRoute;
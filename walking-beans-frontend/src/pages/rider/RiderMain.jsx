import RiderMainMap from "../../components/rider/riderMain/RiderMainMap";
import RiderHeader from "../layout/RiderHeader";
import {useState} from "react";
import BeforeKakaoMapStart from "../../components/rider/riderMain/BeforeKakaoMapStart";

const RiderMain = () => {

    const [getReady, setGetReady] = useState(false);


    const status = {
        after : RiderMainMap,
        before : BeforeKakaoMapStart
    }

    const KakaomapStatus = status[getReady ? "after" : "before"];

    return (
        <div>
            {/* Rider Header */}
            <RiderHeader />
            <KakaomapStatus setGetReady={setGetReady}/>
        </div>
    )
}

export default RiderMain;
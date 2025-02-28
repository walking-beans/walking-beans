import KakaoMap from "../../components/rider/riderMain/KakaoMap";
import RiderHeader from "../layout/RiderHeader";
import {useState} from "react";
import BeforeKakaoMapStart from "../../components/rider/riderMain/BeforeKakaoMapStart";

const RiderMain = () => {

    const [getReady, setGetReady] = useState(false);


    const status = {
        show : KakaoMap,
        hide : BeforeKakaoMapStart
    }

    const KakaomapStatus = status[getReady ? "show" : "hide"];

    return (
        <div>
            {/* Rider Header */}
            <RiderHeader />
            <KakaomapStatus setGetReady={setGetReady}/>
        </div>
    )
}

export default RiderMain;
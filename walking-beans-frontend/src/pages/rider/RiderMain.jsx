import RiderMainMap from "../../components/rider/RiderMainMap";
import {useState} from "react";
import BeforeKakaoMapStart from "../../components/rider/BeforeKakaoMapStart";

const RiderMain = ({user, riderOnDuty, setRiderOnDuty}) => {

    const [getReady, setGetReady] = useState(false);


    const status = {
        after : RiderMainMap,
        before : BeforeKakaoMapStart
    }

    const KakaomapStatus = status[riderOnDuty ? "after" : "before"];

    return (
        <div>
            {/* Rider Header */}
            <KakaomapStatus user={user}
                            riderOnDuty = {riderOnDuty}
                            setRiderOnDuty={setRiderOnDuty} />
        </div>
    )
}

export default RiderMain;
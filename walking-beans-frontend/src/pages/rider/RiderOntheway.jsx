import React, {useMemo, useState} from "react"
import {useMap} from "react-kakao-maps-sdk";

// Polyline 컴포넌트
const RiderOntheway =() => {
    const [path, setPath] = useState(null);

    const map = useMap("Polyline")

    const polyLinePath = useMemo(() => {
        if (Array.isArray(path) && Array.isArray(path[0])) {
            return path.map((v) => {
                return v.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))
            })
        }
        return path.map((v) => {
            return new window.kakao.maps.LatLng(v.lat, v.lng)
        })
    }, [path])


    return (
        <div></div>
    )
}

export default RiderOntheway;
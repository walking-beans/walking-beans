import React, { useEffect, useState } from "react";

const AddressModal = ({ show, onClose, setAddress, setLatitude, setLongitude }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!window.daum) {
            const script = document.createElement("script");
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.async = true;
            script.onload = () => setIsLoaded(true);
            document.body.appendChild(script);
        } else {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (show && isLoaded && window.daum) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setAddress(data.roadAddress);

                    const geocoder = new window.daum.maps.services.Geocoder();
                    geocoder.addressSearch(data.roadAddress, function (result, status) {
                        if (status === window.daum.maps.services.Status.OK) {
                            setLatitude(result[0].y);
                            setLongitude(result[0].x);
                        }
                    });

                    onClose();
                },
            }).open();
        }
    }, [show, isLoaded, setAddress, setLatitude, setLongitude, onClose]);

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h5>주소 검색 중...</h5>
                <button className="btn btn-secondary mt-3" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default AddressModal;

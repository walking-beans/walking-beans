import fiveStar from "../../images/star/fiveStar.svg";
import fourHalfStar from "../../images/star/fourHalfStar.svg";
import fourStar from "../../images/star/fourStar.svg";
import threeHalfStar from "../../images/star/threeHalfStar.svg";
import threeStar from "../../images/star/threeStar.svg";
import twoHalfStar from "../../images/star/twoHalfStar.svg";
import twoStar from "../../images/star/twoStar.svg";
import oneHalfStar from "../../images/star/oneHalfStar.svg";
import oneStar from "../../images/star/oneStar.svg";
import halfStar from "../../images/star/halfStar.svg";

const starPath  = {

    getStarPath : function (star, setStarPath) {
        if (star === 0) {
            setStarPath(null);
        } else if (star > 0 && star < 1) {
            setStarPath(halfStar);
        } else if (star === 1) {
            setStarPath(oneStar);
        } else if (star > 1 && star < 2) {
            setStarPath(oneHalfStar);
        } else if (star === 2) {
            setStarPath(twoStar);
        } else if (star > 2 && star < 3) {
            setStarPath(twoHalfStar);
        } else if (star === 3) {
            setStarPath(threeStar);
        } else if (star > 3 && star < 4) {
            setStarPath(threeHalfStar);
        } else if (star === 4 || star === "4") {
            setStarPath(fourStar);
        } else if (star > 4 && star < 5) {
            setStarPath(fourHalfStar);
        } else {
            setStarPath(fiveStar);
        }

    }
};

export default starPath;
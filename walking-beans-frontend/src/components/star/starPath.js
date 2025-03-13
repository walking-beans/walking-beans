import fiveStar from "../../assert/svg/starNav/fiveStar.svg";
import fourHalfStar from "../../assert/svg/starNav/fourHalfStar.svg";
import fourStar from "../../assert/svg/starNav/fourStar.svg";
import threeHalfStar from "../../assert/svg/starNav/threeHalfStar.svg";
import threeStar from "../../assert/svg/starNav/threeStar.svg";
import twoHalfStar from "../../assert/svg/starNav/twoHalfStar.svg";
import twoStar from "../../assert/svg/starNav/twoStar.svg";
import oneHalfStar from "../../assert/svg/starNav/oneHalfStar.svg";
import oneStar from "../../assert/svg/starNav/oneStar.svg";
import halfStar from "../../assert/svg/starNav/halfStar.svg";

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
import TimeLineTop from "../components/TimeLine-top";
import TimeLineCards from "../components/TimeLine-cards"
import TimeLineData from "../DataSources/TimeLine.json";

const TimeLine = () => {



    return (
        <div className="relative bg-black">
            {/* <div className="sectionTitle">TimeLine Title</div> */}
            {/* <TimeLineTop /> */}
            <TimeLineCards/>
            {/* <div className="sectionDes">Academic -- Work ++ Participation -- Awards</div> */}
        </div>
    )
}

export default TimeLine;
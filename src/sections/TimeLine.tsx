import TimeLineTop from "../components/TimeLine-top";
import TimeLineCards from "../components/TimeLine-cards"

const TimeLine = () => {


    return (
        <div className="relative w-full h-full max-w-full ">
            <div className="sectionTitle">TimeLine Title</div>
            <TimeLineTop />
            <div className="sectionDes bg-black">Academic -- Work ++ Participation -- Awards</div>
            <TimeLineCards/>
        </div>
        
    )
}

export default TimeLine;
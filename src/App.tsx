import './App.css'
import TimeLine from "./components/TimeLine";
import TimeLineData from "./DataSources/TimeLine.json";


function App() {
  return (
    <div className="w-full h-screen bg-white-900">
      <TimeLine/>
    </div>
  );
}

export default App;

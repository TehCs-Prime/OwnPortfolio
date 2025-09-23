import './App.css'
import TimeLine from "./sections/TimeLine";
import Header from "./sections/Header";

function App() {
  return (
    <>
      {/* Header always visible */}
      <Header />

      {/* Page sections */}
      <main
        className="
          pt-[calc(var(--header-height)+1rem)] 
          sm:pt-[calc(var(--header-height)+1.5rem)]
          md:pt-[calc(var(--header-height)+2rem)]
        "
      >
        <TimeLine />
      </main>
    </>
  );
}

export default App;

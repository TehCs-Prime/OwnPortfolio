import './App.css'
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import TimeLine from "./sections/TimeLine";


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

      <Footer />
    </>
  );
}

export default App;

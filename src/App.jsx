import Navbar from "./features/common/navbar/Navbar";
import Football from "./features/fields/football/Football";
import About from "./features/common/about/About";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restartPoistions } from "./redux/teamsSlice";
function App() {
  const about = useSelector((state) => state.teams.about);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      dispatch(restartPoistions());
      event.preventDefault();
      event.returnValue = "Are you sure?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [window]);

  return (
    <main onClick={() => clicked && setClicked(false)}>
      <Navbar clicked={clicked} setClicked={setClicked} />
      <div className="relative">
        {about && <About />}
        <Football about={about} />
      </div>
    </main>
  );
}

export default App;

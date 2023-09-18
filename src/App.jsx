import Navbar from "./features/common/navbar/Navbar";
import Football from "./features/fields/football/Football";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { restartPoistions } from "./redux/teamsSlice";
function App() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      dispatch(restartPoistions());
      // event.preventDefault();
      // event.returnValue = "Seguro que quieres reiniciar la app?"; // Algunos navegadores pueden requerir un valor no vacío aquí.
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [window]);
  return (
    <main onClick={() => clicked && setClicked(false)}>
      <Navbar clicked={clicked} setClicked={setClicked} />
      <Football />
    </main>
  );
}

export default App;

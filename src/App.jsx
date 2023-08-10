import Navbar from "./features/common/navbar/Navbar";
import Football from "./features/fields/football/Football";
import { useState } from "react";
function App() {
  const [clicked, setClicked] = useState(false);
  return (
    <main onClick={() => clicked && setClicked(false)}>
      <Navbar clicked={clicked} setClicked={setClicked} />
      <Football />
    </main>
  );
}

export default App;

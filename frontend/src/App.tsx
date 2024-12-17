import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2 className="text-5xl font-bold">If I still bleeeeeeed!</h2>
      <h1>{import.meta.env.VITE_API_URL}</h1>
    </>
  );
}

export default App;

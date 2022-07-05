import { Route, Routes } from "react-router-dom";
import "./App.css";
import Clock from "./pages/Clock";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/clock"} element={<Clock />} />
        <Route path={"*"} element={<h1>not found page</h1>} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Light from "../pages/Light";
import Temp from "../pages/Temp";
const Views = () => {
  return (
    <Routes>
      <Route path = "/" element={<Home/>}></Route>
      <Route path = "/Light" element={<Light/>}></Route>
      <Route path = "/Temp" element={<Temp/>}></Route>
    </Routes>
  )
}

export default Views;
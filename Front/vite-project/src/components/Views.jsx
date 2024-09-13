import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
const Views = () => {
  return (
    <Routes>
      <Route path = "/" element={<Home/>}></Route>
    </Routes>
  )
}

export default Views;
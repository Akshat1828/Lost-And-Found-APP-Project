// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from "./pages/hero.jsx"
import Login from "./pages/login.jsx"
import Sign from "./pages/sign.jsx"
import Mainr from "./pages/mainr.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Hero" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Sign />} />
        <Route path="/Mainr" element={<Mainr />} />
      </Routes>
    </BrowserRouter>
  )
}

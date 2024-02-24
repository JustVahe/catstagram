import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Catlist from "./components/Catlist"

function App() {

  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Catlist />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

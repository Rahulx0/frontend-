import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Profile from "./pages/Profile"
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  )
}

export default App

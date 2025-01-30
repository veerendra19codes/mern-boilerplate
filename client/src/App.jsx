import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Navbar from './pages/Navbar/Navbar'
import Blogs from './pages/Blogs/Blogs'
import TouristProfile from './pages/Tourists/Profile'
import IncidentList from './pages/Incidents/IncidentList'
import QuickGuide from './pages/quickguide/QuickGuide'
import Map from './pages/Zones'
// import IncidentManager from './pages/IncidentManager'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/incidents' element={<IncidentList />} />
        <Route path='/quickguide' element={<QuickGuide />} />
        <Route path='/profile/tourist' element={<TouristProfile />} />
        <Route path='/zones' element={<Map />} />
      </Routes>
    </Router>
  )
}

export default App

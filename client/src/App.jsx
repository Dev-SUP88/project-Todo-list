import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Layout from "./components/layout"
import Todo from "./Todo"
import Profile from "./Profile"
import Login from "./components/login"
import Register from "./components/register"

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Todo />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
   </Router>
  )
}
export default App
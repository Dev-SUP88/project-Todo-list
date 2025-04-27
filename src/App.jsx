import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Layout from "./components/layout"
import Todo from "./Todo"
import Profile from "./Profile"

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Todo />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
   </Router>
  )
}
export default App
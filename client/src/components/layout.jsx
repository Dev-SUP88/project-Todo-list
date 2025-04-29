import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <div className="">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-center ">
        <li className="nav-item nav gap-5 text-light">
          <Link className="nav-link text-light" to='/'>Home</Link>  {' '}
          <Link className="nav-link text-light" to='/profile'>profile</Link>

        </li>
      </nav>
      <Outlet />
    </div>
  )
}
export default Layout
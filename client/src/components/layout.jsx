import axios from "axios";
import { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  const [isLogined, setIslogined] = useState(false);

  const checkLogin = async () => {
    const result = await axios.get('http://127.0.0.1:3000/api/auth/checklogin', {
    withCredentials: true  // ต้องตั้งค่าตัวนี้เพื่อส่งคุกกี้
});
    // console.log(result);
  }
  useEffect( () => {
     const chkLogin = async () =>{
      checkLogin();
     };
     console.log("test")
     chkLogin();
  }, []);
  
  return (
    <div className="">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-between px-4">

        <Link to="/" className="text-light nav-link pt-2"><h6>Logo</h6></Link>

        <div className="nav-item nav gap-5 text-light">
          <Link className="nav-link text-light" to='/'>Home</Link>  {' '}
          <Link className="nav-link text-light" to='/profile'>profile</Link>

        </div>

        {
          isLogined ? (
            <div className="d-flex gap-2">
              <Link className="nav-link text-light">Logout</Link>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link className="nav-link text-light" to='/login' >Login |</Link>
              <Link to='register' className="nav-link text-light">Sign up</Link>
            </div>

          )


        }
      </nav>

      <Outlet />

    </div>
  )
}
export default Layout
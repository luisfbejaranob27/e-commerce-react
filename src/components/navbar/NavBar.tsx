import {NavLink} from "react-router-dom";
import "./NavBar.css"

type NavBarProps = {
  brand: string
}

export const NavBar = ({ brand }: NavBarProps) =>
{
  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2"><a className="navbar-brand" href="#"><h1>{brand}</h1></a></div>
            <div className="col-3">
              <ul className="nav">
                <li className="nav-item">
                  <NavLink className={"nav-link"} to='/'>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#collapseCategories">Categories</a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <form role="search">
                <input className="form-control col-3" type="search" placeholder="Search" aria-label="Search"/>
              </form>
            </div>
            <div className="col-4">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <NavLink className={"nav-link"} to='/my-orders'>
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to='/my-account'>
                    Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to='/my-cart'>
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to='/sign-out'>
                    Sing out
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="collapse" id="collapseCategories">
            <nav className="nav">
              <NavLink className={"nav-link"} to='/electronics'>
                Electronics
              </NavLink>
            </nav>
          </div>
        </div>
      </nav>
    </>
  )
}

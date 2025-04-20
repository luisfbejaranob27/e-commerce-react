import {NavLink} from "react-router-dom";
import "./NavBar.css"

type NavItem = {
  name: string;
  path: string;
};

type renderNavProps = {
  itemsNavMain?: NavItem[];
  itemsNavUser?: NavItem[];
  itemsNavCategories?: NavItem[];
};

const renderNav = ({ itemsNavMain, itemsNavUser, itemsNavCategories }: renderNavProps) => {
  const itemsNav = [...(itemsNavMain || []), ...(itemsNavUser || []), ...(itemsNavCategories || [])];

  return (
    <>
      {itemsNav.map((item, index) => (
        <li className="nav-item" key={index}>
          {item.path.startsWith('#') ? (
            <a className="nav-link" data-bs-toggle="collapse" href={item.path}>
              {item.name}
            </a>
          ) : (
            <NavLink className="nav-link" to={item.path}>
              {item.name}
            </NavLink>
          )}
        </li>
      ))}
    </>
  );
};

type NavBarProps = {
  brand: string
  itemsNavMain: NavItem[]
  itemsNavUser: NavItem[]
  itemsNavCategories: NavItem[]
}

export const NavBar = ({ brand, itemsNavMain, itemsNavUser, itemsNavCategories }: NavBarProps) =>
{
  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2"><a className="navbar-brand" href="#"><h1>{brand}</h1></a></div>
            <div className="col-3">
              <ul className="nav">
                {renderNav({itemsNavMain})}
              </ul>
            </div>
            <div className="col-3">
              <form role="search">
                <input className="form-control col-3" type="search" placeholder="Search" aria-label="Search"/>
              </form>
            </div>
            <div className="col-4">
              <ul className="nav justify-content-end">
                {renderNav({itemsNavUser})}
              </ul>
            </div>
          </div>
          <div className="collapse" id="collapseCategories">
            <ul className="nav">
              {renderNav({itemsNavCategories})}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

import { NavLink } from "react-router-dom";
import { NavItem } from "../../models/NavItem.ts";
import "./NavBar.css"

type renderNavProps = {
  itemsNavMain?: NavItem[];
  itemsNavUser?: NavItem[];
  itemsNavCategories?: NavItem[];
  cartItemCount?: number;
};

const renderNav = ({ itemsNavMain, itemsNavUser, itemsNavCategories, cartItemCount = 0 }: renderNavProps) =>
{
  const itemsNav = [...(itemsNavMain || []), ...(itemsNavUser || []), ...(itemsNavCategories || [])];

  return (
    <>
      {itemsNav.map((item, index) => {
        if (!item?.path || !item?.name) return null;

        const isCollapseLink = item.path.startsWith('#');

        return (
          <li className="nav-item" key={index}>
            {isCollapseLink ? (
              <a className="nav-link" data-bs-toggle="collapse" href={item.path}>
                {item.name === 'Search' ? <i className="bi bi-search"></i> : item.name}
              </a>
            ) : (
              <NavLink className="nav-link" to={item.path}>
                {item.name === 'Cart' ? (
                  <div className="position-relative d-inline-block">
                    <i className="bi bi-cart"></i>
                    {cartItemCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{fontSize: '0.6rem'}}
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                ) : (
                  item.name
                )}
              </NavLink>
            )}
          </li>
        );
      })}
    </>
  );
};

type NavBarProps = {
  brand: string
  itemsNavMain: NavItem[]
  itemsNavUser: NavItem[]
  itemsNavCategories: NavItem[]
  cartItemCount: number;
}

export const NavBar = ({ brand, itemsNavMain, itemsNavUser, itemsNavCategories, cartItemCount }: NavBarProps) =>
{
  return (
    <>
      <nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2"><a className="navbar-brand" href="#"><h1>{brand}</h1></a></div>
            <div className="col-5" id="main-nav">
              <ul className="nav">
                {renderNav({itemsNavMain})}
              </ul>
            </div>
            <div className="col-5">
              <ul className="nav justify-content-end">
                {renderNav({itemsNavUser, cartItemCount})}
              </ul>
            </div>
          </div>
          <div className="collapse" id="collapseCategories">
            <ul className="nav">
              {renderNav({itemsNavCategories})}
            </ul>
          </div>
          <div className="collapse" id="collapseSearch">
            <form role="search">
              <input className="form-control col-3" type="search" placeholder="Search" aria-label="Search"/>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

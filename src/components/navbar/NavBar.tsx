import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { NavItem } from "../../models/NavItem.ts";
import "./NavBar.css"

type renderNavProps = {
  itemsNavMain?: NavItem[];
  itemsNavUser?: NavItem[];
  itemsNavCategories?: NavItem[];
  cartItemCount?: number;
};

const renderNav = ({ itemsNavMain, itemsNavUser, itemsNavCategories, cartItemCount }: renderNavProps) =>
{
  const itemsNav = [...(itemsNavMain || []), ...(itemsNavUser || []), ...(itemsNavCategories || [])];
  const cartCount = cartItemCount || 0;

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
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{fontSize: '0.6rem'}}
                      >
                        {cartCount}
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
}

export const NavBar = ({ brand, itemsNavMain, itemsNavUser, itemsNavCategories }: NavBarProps) =>
{
  const { cartItemCount } = useContext(EcommerceContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const pageRoutes = ["my-account", "my-order", "my-orders", "my-cart", "sign-in", "sign-out"];

  const handleSearchSubmit = (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (currentPath && !pageRoutes.includes(currentPath))
    {
      navigate(`/${currentPath}?search=${encodeURIComponent(searchValue)}`);
    }
    else
    {
      navigate(`/?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const newValue = e.target.value;
    setSearchValue(newValue);

    if (newValue === "")
    {
      if (currentPath && !pageRoutes.includes(currentPath))
      {
        navigate(`/${currentPath}`);
      }
      else
      {
        navigate("/");
      }
    }
  };

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
                {renderNav({itemsNavUser, cartItemCount: cartItemCount})}
              </ul>
            </div>
          </div>
          <div className="collapse" id="collapseCategories">
            <ul className="nav">
              {renderNav({itemsNavCategories})}
            </ul>
          </div>
          <div className="collapse" id="collapseSearch">
            <form role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control col-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

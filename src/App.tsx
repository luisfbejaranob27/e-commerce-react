import { BrowserRouter, useRoutes } from "react-router-dom";
import { ThemeController } from "./components/theme-controller/ThemeController.tsx";
import { EcommerceProvider } from "./contexts/EcommerceProvider.tsx";
import { NavItem } from "./models/NavItem.ts";
import { NavBar } from "./components/navbar/NavBar.tsx";
import { Account } from "./pages/account/Account.tsx";
import { Home } from "./pages/home/Home.tsx";
import { NotFound } from "./pages/not-found/NotFound.tsx";
import { Order } from "./pages/order/Order.tsx";
import { Orders } from "./pages/orders/Orders.tsx";
import { Cart } from "./pages/cart/Cart.tsx";
import { SignIn } from "./pages/sign-in/SignIn.tsx";
import { SignOut } from "./pages/sign-out/SignOut.tsx";
import './App.css'

const AppRoutes = () =>
{
  return useRoutes([
    { path: '/', element: <Home/> },
    { path: '/electronics', element: <Home/> },
    { path: '/my-account', element: <Account/> },
    { path: '/my-order', element: <Order/> },
    { path: '/my-orders', element: <Orders/> },
    { path: '/my-cart/', element: <Cart/> },
    { path: '/sign-in', element: <SignIn/> },
    { path: '/sign-out', element: <SignOut/> },
    { path: '/*', element: <NotFound/> },
  ]);
}

const itemsNavMain: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '#collapseCategories' },
];

const itemsNavUser: NavItem[] = [
  { name: 'Search', path: '#collapseSearch' },
  { name: 'Account', path: '/my-account' },
  { name: 'Orders', path: '/my-orders' },
  { name: 'Cart', path: '/my-cart' },
  { name: 'Sign out', path: '/sign-out' },
];

const itemsNavCategories: NavItem[] = [
  { name: 'Electronics', path: '/electronics' },
  { name: 'Clothes', path: '/clothes' },
]

export const App = () =>
{
  return (
    <EcommerceProvider>
      <BrowserRouter>
        <NavBar brand={"E Commerce"} itemsNavMain={itemsNavMain} itemsNavUser={itemsNavUser} itemsNavCategories={itemsNavCategories} />
        <AppRoutes />
        <ThemeController />
      </BrowserRouter>
    </EcommerceProvider>
  )
}

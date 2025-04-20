import {BrowserRouter, useRoutes} from "react-router-dom";
import {ThemeController} from "./components/theme-controller/ThemeController.tsx";
import {NavBar} from "./components/navbar/NavBar.tsx";
import {Account} from "./pages/account/Account.tsx";
import {Home} from "./pages/home/Home.tsx";
import {NotFound} from "./pages/not-found/NotFound.tsx";
import {Order} from "./pages/order/Order.tsx";
import {Orders} from "./pages/orders/Orders.tsx";
import {Cart} from "./pages/cart/Cart.tsx";
import {SignIn} from "./pages/sign-in/SignIn.tsx";
import {SignOut} from "./pages/sign-out/SignOut.tsx";
import './App.css'

const AppRoutes = () =>
{
  return useRoutes([
    {path: '/', element: <Home/>},
    {path: '/electronics', element: <Home/>},
    {path: '/my-account', element: <Account/>},
    {path: '/my-order', element: <Order/>},
    {path: '/my-orders', element: <Orders/>},
    {path: '/my-orders/last', element: <Order/>},
    {path: '/my-orders/:id', element: <Order/>},
    {path: '/my-cart/', element: <Cart/>},
    {path: '/sign-in', element: <SignIn/>},
    {path: '/sign-out', element: <SignOut/>},
    {path: '/*', element: <NotFound/>},
  ]);
}

export const App = () =>
{
  return (
    <BrowserRouter>
      <NavBar brand={"E Commerce"} />
      <AppRoutes />
      <ThemeController />
    </BrowserRouter>
  )
}

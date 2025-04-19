import './App.css'
import {Home} from "./pages/home/Home.tsx";
import {ThemeController} from "./components/theme-controller/ThemeController.tsx";

export const App = () =>
{
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Home />
          <ThemeController />
        </div>
      </div>
    </div>
  )
}

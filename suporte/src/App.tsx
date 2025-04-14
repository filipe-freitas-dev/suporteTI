import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chamado from "./pages/Chamado";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PrivateRoute from "./routes/Private";
import ChamadoUnico from "./pages/ChamadoUnico";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/chamado',
    element: <Chamado/>
  },
  {
    path: '/chamado/:id',
    element: <PrivateRoute><ChamadoUnico/></PrivateRoute>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <PrivateRoute><Admin/></PrivateRoute>
  },
])
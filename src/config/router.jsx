import { createBrowserRouter } from "react-router-dom";
import { PrivateLayout } from "../layout/PrivateLayout";
import { AuthLayout } from "../layout/AuthLayout";
import { Todo } from "../pages/Todos";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import {ForgotPassword} from '../pages/ForgotPassword'




export const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        {
          index:true,
          element: <Todo />
        }
      ]
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'forgot-password',
          element : <ForgotPassword />
        }
      ]
    }
  ]);

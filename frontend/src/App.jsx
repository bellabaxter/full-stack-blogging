import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../style.scss";


function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
]);

function App() {
  return (
      <div className="app">
        <div className="contanier">
         <RouterProvider router={router} />
        </div>
      </div>
  );
}

export default App;

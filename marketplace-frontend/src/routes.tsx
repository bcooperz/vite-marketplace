import Register from "./pages/Register";
import Login from "./pages/Login";
import Test from "@/pages/Test";

const routes = [
  {
    path: "",
    element: <Test />,
    pageTitle: "Test page",
  },
  {
    path: "test",
    element: <Test />,
    pageTitle: "Test page",
  },
  {
    path: "register",
    element: <Register />,
    pageTitle: "Register",
  },
  {
    path: "login",
    element: <Login />,
    pageTitle: "Login",
  },
];

export default routes;

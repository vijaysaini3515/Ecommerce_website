import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart";
import Category from "./Components/Category";
import ProductByCategory from "./Pages/ProductByCategory";


const routes = [
  {path:"/",element:<Home />},
  {path:"/login",element:<Login />},
  {path:"/signup",element:<Signup />},
  {path:"/login",element:<Login />},
  {path:"/product/:pid",element:<Product />},
  {path:"/cart",element:<Cart />},
  {path:"/category/:cid",element:<ProductByCategory />}


];

export default routes;


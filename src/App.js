import AdminHeader from "./components/Header/AdminDash";
import UserSignIn from "./views/User/SignIn/UserSignIn";
import UserSignUp from "./views/User/SignIn/UserSignup";
import AccountMenu from "./AccountSettingMenu";
import EditProfile from "./views/User/EditProfile";
import Header from "./components/Header/header";
import Categories from "./components/Body/categories";
import Products from "./components/Body/products";
import SingleItem from "./views/ViewSingleItem";
import Footer from "./components/Footer/footer";
import Cart from "./components/Cart/cart";
import CheckOutForm from "./views/User/Checkout";

import AdminSignIn from "./views/Admin/Sign-In/AdminSignIn";
import AdminSignup from "./views/Admin/Sign-In/AdminSignup";
import AdminDashboard from "./views/Admin/Dashboard/AdminDashboard";
import ListOfVendors from "./views/Admin/Dashboard/ListOfVendors";
import ListOfUsers from "./views/Admin/Dashboard/ListOfUsers";
import ListOfAdmins from "./views/Admin/Dashboard/ListOfAdmins";


import VendorSignIn from "./views/Vendor/SignIn/VendorSignIn";
import VendorRegForm from "./views/Vendor/SignIn/VendorRegForm";
import VendorDash from "./views/Vendor/Dashboard/VendorDash";
import ListOfOrders from "./views/Vendor/Dashboard/ListOfOrders";
import OrderDetails from "./views/Vendor/Dashboard/OrderDetails";
import AddProduct from "./views/Vendor/AddProducts";
import ListOfProducts from "./views/Vendor/Dashboard/ListOfProducts";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AdminForgotPassword from "./views/Admin/AdminForgotPassword";
import VendorForgotPassword from "./views/Vendor/VendorForgotPassword";
import UserForgotPassword from "./views/User/SignIn/UserForgotPassword";

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const token = sessionStorage.getItem("token");
  const [isAuth, setAuth] = useState(!(token == null || token == ""));
  const history = useHistory();
  const getCartCount = () => {
    fetch(`http://localhost:3000/api/auth/displayAllItems`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    })
      .then((res) => res.json())
      .then((response) => {
        setCartItemCount(response.response.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = (event) => {
    sessionStorage.removeItem("token");
    window.location.href="http://localhost:3001/";
    console.log('heree');
    if (sessionStorage.token == (undefined || null)) {
      setAuth(false);
      console.log(history);
      // if (history) history.push("/");
      // window.location.href="http://localhost:3001/"
    }
  };
  return (
    <Router>
      <Route exact path="/">
        <AdminHeader />
        <Header cartItemCount={cartItemCount} getCartCount={getCartCount} />
        <div class="container">
          <Categories />
          <Products getCartCount={getCartCount} />
        </div>
        <Footer />
      </Route>

      <Switch>
        {/* ========================Admin Routes===================== */}

        <Route exact path="/AdminSignIn">
          <AdminSignIn cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>
        <Route exact path="/AdminSignup">
          <AdminSignup cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>
        <Route exact path="/Admin/Dashboard">
          <AdminDashboard handleLogout={handleLogout} />
        </Route>
        <Route exact path="/ListOfVendors">
          <ListOfVendors handleLogout={handleLogout}/>
        </Route>
        <Route exact path="/ListOfUsers">
          <ListOfUsers handleLogout={handleLogout}/>
        </Route>
        <Route exact path="/ListOfAdmins">
          <ListOfAdmins handleLogout={handleLogout}/>
        </Route>
        <Route exact path="/AdminForgotPassword">
          <AdminForgotPassword cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>

        {/* ========================User Routes===================== */}
        <Route exact path="/UserSignIn">
          <UserSignIn cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>
        <Route exact path="/UserSignUp">
          <UserSignUp cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>

        <Route exact path="/UserForgotPassword">
          <UserForgotPassword cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>

        <Route exact path="/AccountMenu">
          <AccountMenu />
        </Route>

        <Route exact path="/EditProfile">
          <EditProfile cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>

        <Route path="/ViewSingleItem">
          <SingleItem
            cartItemCount={cartItemCount}
            getCartCount={getCartCount}
          />
        </Route>

        <Route exact path="/cart">
          <Cart cartItemCount={cartItemCount} getCartCount={getCartCount} />
        </Route>

        <Route exact path="/CheckOut">
          <CheckOutForm
            cartItemCount={cartItemCount}
            getCartCount={getCartCount}
          />
        </Route>

        {/* ======================Vendor Routes===================== */}
        <Route exact path="/VendorSignIn">
          <VendorSignIn cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>
        <Route exact path="/VendorSignUp">
          <VendorRegForm cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>
        <Route exact path="/VendorForgotPassword">
          <VendorForgotPassword cartItemCount={cartItemCount} getCartCount={getCartCount}/>
        </Route>

        <Route path="/ListOfOrders">
          <ListOfOrders handleLogout={handleLogout} />
        </Route>

        <Route path="/Order">
          <OrderDetails handleLogout={handleLogout} />
        </Route>
        <Route exact path="/VendorDash">
          <VendorDash handleLogout={handleLogout} />
        </Route>
        <Route exact path="/AddProduct">
          <AddProduct
            handleLogout={
              handleLogout
            } /*cartItemCount={cartItemCount} getCartCount={getCartCount}*/
          />
        </Route>

        <Route path="/ListOfProducts">
          <ListOfProducts handleLogout={handleLogout} />
        </Route>
      </Switch>
    </Router>
    // </div>
  );
}
export default App;

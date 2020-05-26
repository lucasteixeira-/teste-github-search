import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";

import Home from "../Pages/index";
import UserPage from "../Pages/userPage";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:user" component={UserPage}/>
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
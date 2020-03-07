import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import MyTicket from "./pages/myticket";
import MyPayment from "./pages/payment";
import AddTicket from "./pages/admin/addticket";
import AdmTransaction from "./pages/admin/transaction";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/payment">
          <MyPayment />
        </Route>
        <Route path="/transaction">
          <AdmTransaction />
        </Route>
        <Route path="/addticket">
          <AddTicket />
        </Route>
        <Route path="/my-ticket">
          <MyTicket />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

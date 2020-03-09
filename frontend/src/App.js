import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import MyTicket from "./pages/myticket";
import MyPayment from "./pages/payment";
import AddTicket from "./pages/admin/addticket";
import Station from "./pages/admin/station";
import AdmTransaction from "./pages/admin/transaction";
import AdmRoute from "./pages/admin/route";
import AdmTrain from "./pages/admin/train";
import Booking from "./pages/booking";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/train">
          <AdmTrain />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route path="/route">
          <AdmRoute />
        </Route>
        <Route path="/station">
          <Station />
        </Route>
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

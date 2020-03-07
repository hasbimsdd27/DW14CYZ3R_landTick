import React, { useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { getUser } from "../_actions/user";
import { logout } from "../_actions/auth";
import { connect } from "react-redux";
import { getMyTicket } from "../_actions/ticket";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Table
} from "react-bootstrap";

import {
  StatusPembayaran,
  DateArrival,
  DateFormat,
  TimeFormat
} from "../utils/extra";

const MyTicket = props => {
  useEffect(() => {
    props.getUser();
    props.getMyTicket();
  }, []);

  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const tiket = props.ticket;
  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("tiket");
    props.logout();
    window.location.reload();
  };

  return !loginData.isLogin && !token ? (
    <Route>
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    </Route>
  ) : tiket.loading || user.loading || !tiket.data ? (
    <h1>Loading Bos...</h1>
  ) : (
    <div className="App-body-landing">
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            {" "}
            <h3 style={{ color: "#3498db" }}>DO-Line</h3>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <div className="APP-dropdown">
                <h5 className="text-primary">
                  {user.data.name}
                  <i className="fas fa-user ml-2"></i>
                </h5>
                <div className="APP-dropdown-content">
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/my-ticket">
                      <h6>Tiket Saya</h6>
                    </Link>
                  </div>
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/payment">
                      <h6>Payment</h6>
                    </Link>
                  </div>
                  <hr></hr>
                  <div className="mt-2 mb-2">
                    {" "}
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Container className="mt-2">
          <h4>Tiket Saya</h4>
          {!tiket.data ? (
            <h1>Loading...</h1>
          ) : (
            tiket.data.map((item, index) => (
              <Card className="mt-3" key={index}>
                <div style={{ padding: "1rem" }}>
                  <Row>
                    <Col className="text-left" style={{ color: "#3498db" }}>
                      <h5>DO-Line</h5>
                    </Col>
                    <Col className="text-right">
                      <h5>Kereta Api</h5>
                      <small>
                        <DateFormat date={item.departure_date} />
                      </small>
                    </Col>
                  </Row>
                </div>
                <Card.Body style={{ marginTop: "-2rem" }}>
                  <Row>
                    <Col style={{ maxWidth: "13rem" }}>
                      <h5>{item.train.name}</h5>
                      <p>{item.train.class}</p>

                      <StatusPembayaran payment={item.status} />
                    </Col>
                    <Col>
                      <Row>
                        <Col style={{ maxWidth: "2rem" }}>
                          <i className="far fa-circle"></i>
                        </Col>
                        <Col style={{ maxWidth: "10rem" }}>
                          <h5>
                            <TimeFormat time={item.route.departure} />
                          </h5>
                          <small>
                            <DateFormat date={item.departure_date} />
                          </small>
                        </Col>
                        <Col style={{ maxWidth: "15rem" }}>
                          <h5>{item.originStation.code}</h5>
                          <small>{item.originStation.name}</small>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "1rem" }}>
                        <Col style={{ maxWidth: "2rem" }}>
                          <i className="fas fa-circle"></i>
                        </Col>
                        <Col style={{ maxWidth: "10rem" }}>
                          <h5>
                            <TimeFormat time={item.route.arrival} />
                          </h5>
                          <small>
                            <DateArrival
                              date={item.departure_date}
                              departure={item.route.departure}
                              arrival={item.route.arrival}
                            />
                          </small>
                        </Col>
                        <Col style={{ maxWidth: "15rem" }}>
                          <h5>{item.destinationStation.code}</h5>
                          <small>{item.destinationStation.name}</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <h5>Penumpang</h5>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>No. Identitas</th>
                          <th>Nama Pemesan</th>
                          <th>No. Handphone</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item.user.identity}</td>
                          <td>{item.user.name}</td>
                          <td>{item.user.phone}</td>
                          <td>{item.user.email}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Link to="/payment">
                      <Button
                        style={{ float: "right" }}
                        onClick={() => localStorage.setItem("tiket", item.id)}
                      >
                        Bayar Sekarang
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    stations: state.stations,
    login: state.login,
    user: state.user,
    ticket: state.ticket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout()),
    getMyTicket: () => dispatch(getMyTicket())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTicket);

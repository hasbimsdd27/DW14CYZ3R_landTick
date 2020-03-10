import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { Route, Redirect, Link } from "react-router-dom";
import { getUser } from "../_actions/user";
import { logout } from "../_actions/auth";
import { connect } from "react-redux";
import { getMyTicket } from "../_actions/ticket";
import { getAllPassanger } from "../_actions/passanger";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Modal,
  Table
} from "react-bootstrap";

import { DateArrival, DateFormat, TimeFormat } from "../utils/extra";

const MyTicket = props => {
  useEffect(() => {
    props.getMyTicket();
    props.getUser();
  }, []);

  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const tiket = props.ticket;
  const [passanger, setPassanger] = useState(false);
  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("tiket");
    localStorage.removeItem("baby");
    localStorage.removeItem("adult");
    localStorage.removeItem("routeID");
    localStorage.removeItem("departure");
    props.logout();
    window.location.reload();
  };

  const handlePassanger = (e, id_transaction) => {
    e.preventDefault();
    props.getAllPassanger(id_transaction);
    setPassanger(true);
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
          {!props.ticket.myData || props.ticket.loading ? (
            <h1>Loading...</h1>
          ) : (
            props.ticket.myData.map((item, index) => (
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
                    <Col className="col-lg-2">
                      <h5>{item.train.name}</h5>
                      <p>{item.train.class}</p>

                      <StatusPembayaran payment={item.status} />
                    </Col>
                    <Col className="col-lg-7">
                      <Row>
                        <Col className="col-sm-1">
                          <i className="far fa-circle"></i>
                        </Col>
                        <Col className="col-md-3">
                          <h5>
                            <TimeFormat time={item.route.departure} />
                          </h5>
                          <small>
                            <DateFormat date={item.departure_date} />
                          </small>
                        </Col>
                        <Col className="col-md-6">
                          <h5>{item.originStation.code}</h5>
                          <small>{item.originStation.name}</small>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "1rem" }}>
                        <Col className="col-sm-1">
                          <i className="fas fa-circle"></i>
                        </Col>
                        <Col className="col-md-3">
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
                        <Col className="col-md-5">
                          <h5>{item.destinationStation.code}</h5>
                          <small>{item.destinationStation.name}</small>
                        </Col>
                      </Row>
                    </Col>
                    <Col></Col>
                    <Col>
                      <div className="text-right">
                        <QRCode
                          id={item.transaction_code}
                          value={item.transaction_code}
                          size={100}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    {item.status == "Waiting Payment" ? (
                      <>
                        <Link to="/payment">
                          <Button
                            style={{ float: "right" }}
                            onClick={() =>
                              localStorage.setItem("tiket", item.id)
                            }
                          >
                            Bayar Sekarang
                          </Button>
                        </Link>
                        <Button
                          className="mr-2"
                          style={{ float: "right" }}
                          onClick={e =>
                            handlePassanger(e, item.transaction_code)
                          }
                        >
                          Detail Penumpang
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{ float: "right" }}
                        onClick={e => handlePassanger(e, item.transaction_code)}
                      >
                        Detail Penumpang
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Container>
        <Modal show={passanger} onHide={() => setPassanger(false)}>
          <Modal.Header closeButton>
            <Modal.Title>List Penumpang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Identitas</th>
                  <th>Nama</th>
                </tr>
              </thead>
              <tbody>
                {!props.passanger.detail ? (
                  <h1>Hello World</h1>
                ) : (
                  props.passanger.detail.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.identity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setPassanger(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const StatusPembayaran = ({ payment }) => {
  switch (payment) {
    case "Waiting Payment":
      return <p className="badge badge-warning text-white">Waiting Payment</p>;
    case "Paid":
      return <p className="badge badge-primary text-white">Paid</p>;
    case "Approved":
      return <p className="badge badge-success text-white">Approved</p>;

    default:
      break;
  }
};

const mapStateToProps = state => {
  return {
    stations: state.stations,
    login: state.login,
    user: state.user,
    ticket: state.ticket,
    passanger: state.passanger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout()),
    getMyTicket: () => dispatch(getMyTicket()),
    getAllPassanger: id_transaction => dispatch(getAllPassanger(id_transaction))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTicket);

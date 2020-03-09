import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { insertPassanger } from "../_actions/passanger";
import { getUser } from "../_actions/user";
import { logout } from "../_actions/auth";
import { buyTicket } from "../_actions/ticket";
import { detailRoute } from "../_actions/route";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DateArrival, DateFormat, TimeFormat } from "../utils/extra";

import {
  Navbar,
  Nav,
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Table,
  Image,
  Modal
} from "react-bootstrap";

const Booking = props => {
  useEffect(() => {
    const routeID = localStorage.getItem("routeID");
    props.getUser();
    if (routeID) {
      props.detailRoute(routeID);
    }
  }, []);
  const loginData = props.login;
  const token = localStorage.getItem("token");
  const routeID = localStorage.getItem("routeID");
  const user = props.user;
  const route = props.routes;
  const adult = localStorage.getItem("adult");
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [name3, setName3] = useState(null);
  const [name4, setName4] = useState(null);
  const [identity1, setIdentity1] = useState(null);
  const [identity2, setIdentity2] = useState(null);
  const [identity3, setIdentity3] = useState(null);
  const [identity4, setIdentity4] = useState(null);
  const [message, setMessage] = useState(false);
  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("tiket");
    props.logout();
    window.location.reload();
  };

  const handleData = async e => {
    e.preventDefault();
    let data = {
      id_train: route.detail.id_train,
      departure_date: localStorage.getItem("departure"),
      status: "Waiting Payment",
      id_user: user.data.id,
      seats_order: adult,
      destination: route.detail.destination,
      route_id: route.detail.id,
      origin: route.detail.origin,
      total: adult * route.detail.price
    };
    const res = await props.buyTicket(data);
    if (res.action.type == "BUY_TICKET_FULFILLED") {
      let mainData = [];

      let data1 = {
        name: name1,
        identity: identity1,
        id_transaction: props.ticket.data.transaction_code
      };
      let data2 = {
        name: name2,
        identity: identity2,
        id_transaction: props.ticket.data.transaction_code
      };
      let data3 = {
        name: name3,
        identity: identity3,
        id_transaction: props.ticket.data.transaction_code
      };
      let data4 = {
        name: name4,
        identity: identity4,
        id_transaction: props.ticket.data.transaction_code
      };
      if (adult == 1) {
        mainData.push(data1);
      } else if (adult == 2) {
        mainData.push(data1, data2);
      } else if (adult == 3) {
        mainData.push(data1, data2, data3);
      } else {
        mainData.push(data1, data2, data3, data4);
      }
      console.log(props.tiket.data);
    }
  };

  return !loginData.isLogin && !token ? (
    <Route>
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    </Route>
  ) : !routeID ? (
    <Route>
      <Redirect
        to={{
          pathname: "/my-ticket"
        }}
      />
    </Route>
  ) : route.loading || user.loading || !route.detail ? (
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
      <Container>
        <div className="mt-1">
          <h4>Masukkan ID penumpang</h4>
          <Row>
            <Col className="col-lg-8" style={{ padding: "1rem" }}>
              <Card style={{ background: "#ecf0f1" }}>
                <Card.Body>
                  <Row>
                    <Col className="col-1">
                      <Image
                        src="https://3.bp.blogspot.com/-0YAAfhbWbK8/V85bbvTEv7I/AAAAAAAAAhY/kUK836tzsSw6dXdfUtRgngFWJUB3CqExACEw/s1600/Revitlink%2BDamien%2BWArnings.png"
                        width="50px"
                      />
                    </Col>
                    <Col className="col-11">
                      <p className="ml-2">
                        Silahkan isi data penumpang dibawah. Data penumpang
                        harus sesuai dengan identitas yang berlaku
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mt-3">
                <Card.Body>
                  <Row>
                    <Col className="text-left">
                      <h6>Daftar Penumpang</h6>
                    </Col>
                  </Row>
                  <Table hover responsive style={{ border: "none" }}>
                    <thead>
                      <tr>
                        <th>No. Identitas</th>
                        <th>Nama Pemesan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adult == 1 ? (
                        <>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity1(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName1(e.target.value)}
                              />
                            </td>
                          </tr>
                        </>
                      ) : adult == 2 ? (
                        <>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity1(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName1(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity2(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName2(e.target.value)}
                              />
                            </td>
                          </tr>
                        </>
                      ) : adult == 3 ? (
                        <>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity1(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName1(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity2(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName2(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity3(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName3(e.target.value)}
                              />
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity1(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName1(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity2(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName2(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity3(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName3(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No. Identitas"
                                onChange={e => setIdentity4(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nama"
                                onChange={e => setName4(e.target.value)}
                              />
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </Table>
                  <Button
                    style={{ float: "right" }}
                    onClick={e => handleData(e)}
                  >
                    Selesai
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-lg-4">
              <Card className="mt-3">
                <Card.Header>
                  <Row>
                    <Col>
                      <h4>Kereta Api</h4>
                      <p>
                        <DateFormat date={localStorage.getItem("departure")} />
                      </p>
                    </Col>
                    <Col></Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <div>
                    {!route.detail.trainName ? (
                      <h5>Loading</h5>
                    ) : (
                      <h5>
                        {route.detail.trainName.name} (
                        {route.detail.trainName.class})
                      </h5>
                    )}
                  </div>
                  <Row className="mt-2">
                    <Col className="col-sm-1">
                      <small>
                        <i className="far fa-circle"></i>
                      </small>
                    </Col>
                    <Col className="col-sm-4">
                      {!route.detail.arrival ? (
                        <h5>Loading</h5>
                      ) : (
                        <>
                          <h5>
                            <TimeFormat time={route.detail.departure} />
                          </h5>
                          <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                            <DateFormat
                              date={localStorage.getItem("departure")}
                            />
                          </p>
                        </>
                      )}
                    </Col>

                    <Col>
                      <div>
                        {!route.detail.originStation ? (
                          <h5>Loading</h5>
                        ) : (
                          <>
                            <h6>{route.detail.originStation.code}</h6>
                            <p
                              style={{ marginTop: "-0.5rem", fontSize: "12px" }}
                            >
                              {route.detail.originStation.name}
                            </p>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col className="col-sm-1">
                      <small>
                        <i className="fas fa-circle"></i>
                      </small>
                    </Col>
                    <Col className="col-sm-4">
                      {!route.detail.arrival ? (
                        <h5>Loading</h5>
                      ) : (
                        <>
                          <h5>
                            {" "}
                            <TimeFormat time={route.detail.arrival} />
                          </h5>
                          <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                            <DateArrival
                              date={localStorage.getItem("departure")}
                              departure={route.detail.departure}
                              arrival={route.detail.arrival}
                            />
                          </p>
                        </>
                      )}
                    </Col>

                    <Col>
                      {!route.detail.destinationStation ? (
                        <h5>Loading</h5>
                      ) : (
                        <>
                          <h6>{route.detail.destinationStation.code}</h6>
                          <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                            {route.detail.destinationStation.name}
                          </p>
                        </>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <Modal show={message} onHide={() => setMessage(false)}>
        <Modal.Body>Gambar Telah di Unggah</Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.login,
    user: state.user,
    routes: state.routes,
    ticket: state.ticket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout()),
    detailRoute: routeID => dispatch(detailRoute(routeID)),
    buyTicket: data => dispatch(buyTicket(data)),
    insertPassanger: mainData => dispatch(insertPassanger(mainData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Booking);

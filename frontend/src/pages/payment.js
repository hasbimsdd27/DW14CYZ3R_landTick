import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import QRCode from "qrcode.react";
import { getUser } from "../_actions/user";
import { logout } from "../_actions/auth";
import { getDetailTicket, uploadPayment } from "../_actions/ticket";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  DateArrival,
  DateFormat,
  TimeFormat,
  IDRcurrency
} from "../utils/extra";

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

const Payment = props => {
  useEffect(() => {
    props.getUser();
    props.getDetailTicket();
  }, []);
  const loginData = props.login;
  const token = localStorage.getItem("token");
  const idTrx = localStorage.getItem("tiket");
  const user = props.user;
  const tiket = props.ticket.detail;
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(false);
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

  const uploadImage = async e => {
    e.preventDefault();
    const body = { status: "Paid" };
    const res = await props.uploadPayment(image, idTrx, body);
    if (res.action.type === "UPLOAD_PAYMENT_FULFILLED") {
      setMessage(true);
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
  ) : !idTrx ? (
    <Route>
      <Redirect
        to={{
          pathname: "/my-ticket"
        }}
      />
    </Route>
  ) : tiket.loading || user.loading || !tiket.user ? (
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
          <h4>Invoice</h4>
          <Row>
            <Col className="col-lg-8" style={{ padding: "1rem" }}>
              <Card style={{ background: "#ecf0f1" }}>
                <Card.Body>
                  <Row>
                    <Col className="col-sm-3">
                      <Image
                        src="https://3.bp.blogspot.com/-0YAAfhbWbK8/V85bbvTEv7I/AAAAAAAAAhY/kUK836tzsSw6dXdfUtRgngFWJUB3CqExACEw/s1600/Revitlink%2BDamien%2BWArnings.png"
                        width="100px"
                      />
                    </Col>
                    <Col className="col-lg-9">
                      <p>
                        Silahakan melakukan pembayaran melalui M-Bangking,
                        E-Bangking ataupun transfer via ATM dengan tujuan nomor
                        rekening yang tersedia
                      </p>
                      <h6>No.Rek: 1122334455</h6>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mt-3">
                <Card.Body>
                  <Row>
                    <Col className="text-left" style={{ color: "#3498db" }}>
                      <h6>DO-Line</h6>
                    </Col>
                  </Row>
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
                        <td>{tiket.user.identity}</td>
                        <td>{tiket.user.name}</td>
                        <td>{tiket.user.phone}</td>
                        <td>{tiket.user.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              <Row className="mt-3">
                <Col className="col-md-6">
                  <h4>Rincian Harga</h4>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col className="col-7">
                          {tiket.train.name} x {tiket.seats_order}
                        </Col>
                        <Col className="text-right col-5">
                          <IDRcurrency currency={tiket.route.price} />
                        </Col>
                      </Row>
                      <Row style={{ background: "#bdc3c7" }}>
                        <Col>Total</Col>
                        <Col className="text-right">
                          <IDRcurrency currency={tiket.total} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  {image ? (
                    <Button
                      className="btn btn-block btn-primary mt-1"
                      onClick={e => uploadImage(e)}
                    >
                      Bayar Sekarang
                    </Button>
                  ) : null}
                </Col>
                <Col className="col-md-6">
                  <h4>Upload Bukti Transfer</h4>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">
                      Example file input
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      name="image"
                      onChange={e => [
                        setImage(e.target.files[0]),
                        setPreview(URL.createObjectURL(e.target.files[0]))
                      ]}
                    />

                    <img src={preview} alt="-" height="100px" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="col-lg-4">
              <Card className="mt-3">
                <Card.Header>
                  <Row>
                    <Col>
                      <h4>Kereta Api</h4>
                      <p>
                        <DateFormat date={tiket.departure_date} />
                      </p>
                    </Col>
                    <Col>
                      <QRCode
                        id={tiket.transaction_code}
                        value={tiket.transaction_code}
                        size={100}
                      />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <div>
                    <h5>
                      {tiket.train.name} ({tiket.train.class})
                    </h5>
                  </div>
                  <Row className="mt-2">
                    <Col className="col-sm-1">
                      <small>
                        <i className="far fa-circle"></i>
                      </small>
                    </Col>
                    <Col className="col-sm-4">
                      <h5>
                        <TimeFormat time={tiket.route.departure} />
                      </h5>
                      <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                        <DateFormat date={tiket.departure_date} />
                      </p>
                    </Col>

                    <Col>
                      <h6>{tiket.originStation.code}</h6>
                      <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                        {tiket.originStation.name}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col className="col-sm-1">
                      <small>
                        <i className="fas fa-circle"></i>
                      </small>
                    </Col>
                    <Col className="col-sm-4">
                      <h5>
                        {" "}
                        <TimeFormat time={tiket.route.arrival} />
                      </h5>
                      <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                        <DateArrival
                          date={tiket.departure_date}
                          departure={tiket.route.departure}
                          arrival={tiket.route.arrival}
                        />
                      </p>
                    </Col>

                    <Col>
                      <h6>{tiket.destinationStation.code}</h6>
                      <p style={{ marginTop: "-0.5rem", fontSize: "12px" }}>
                        {tiket.destinationStation.name}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <Modal show={message} onHide={() => setMessage(false)}>
        <Modal.Body className="text-center">
          <div>
            <h5>Pembayaran berhasil, silahkan tunggu konfirmasi berikutnya</h5>
          </div>
          <div>
            <Link to="/my-ticket">
              <Button>Ok</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
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
    getDetailTicket: () => dispatch(getDetailTicket()),
    uploadPayment: (image, idTrx, body) =>
      dispatch(uploadPayment(image, idTrx, body))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

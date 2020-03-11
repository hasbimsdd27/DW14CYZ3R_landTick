import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal
} from "react-bootstrap";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getStation } from "../_actions/station";
import { getUser } from "../_actions/user";
import { getAllRoutes, getSpecificRoutes } from "../_actions/route";
import { postLogin, logout, postRegister } from "../_actions/auth";
import { buyTicket } from "../_actions/ticket";
import {
  DurasiPerjalanan,
  GetDate,
  DateArrival,
  DateFormat,
  TimeFormat,
  IDRcurrency
} from "../utils/extra";
import Loading from "../utils/loading";
import RemainingSeats from "../utils/RemainingSeats";

const Landing = (props, action) => {
  useEffect(() => {
    props.getStation();
    props.getAllRoutes();
    props.getUser();
  }, []);

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const token = localStorage.getItem("token");

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [identity, setIdentity] = useState(null);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(GetDate());
  const [confirmation, setConfirmation] = useState(false);
  const [seats, setSeats] = useState(1);
  const [baby, setBaby] = useState(0);

  const stations = props.stations;
  const loginData = props.login;
  const user = props.user;

  const handleSwitch = () => {
    setOrigin(destination);
    setDestination(origin);
    console.log(origin, destination);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let data = {
      email,
      password
    };
    const res = await props.postLogin(data);
    if (res.action.type === "POST_LOGIN_FULFILLED") {
      setLogin(false);
      props.getUser();
    }
  };

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

  const handleSubmitReg = async e => {
    e.preventDefault();
    let data = {
      name,
      email,
      password,
      phone,
      address,
      identity
    };
    const res = await props.postRegister(data);
    if (res.action.type === "REGISTER_FULFILLED") {
      setRegister(false);
      props.getUser();
    }
  };
  const handleSearchTrain = e => {
    e.preventDefault();
    props.getSpecificRoutes(origin, destination, departureDate);
  };

  return loginData.loading || user.loading ? (
    <h1>
      <Loading />
    </h1>
  ) : user.data.level === "admin" ? (
    <Route>
      <Redirect
        to={{
          pathname: "/transaction"
        }}
      />
    </Route>
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
              {user.data ? (
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
              ) : (
                <>
                  <Button variant="primary mr-3" onClick={() => setLogin(true)}>
                    Login
                  </Button>
                  <Button variant="primary" onClick={() => setRegister(true)}>
                    Register
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BlueContainer />
      <div className="Box-Form">
        <Row>
          <Col className="col-lg-2 text-center mt-5">
            <h4>Tiket Kereta Api</h4>
          </Col>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Asal</Form.Label>
                    <Form.Control
                      as="select"
                      value={origin}
                      onChange={e => setOrigin(e.target.value)}
                    >
                      <option value="">-Pilih Stasiun Asal-</option>
                      {stations.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col className="col-sm-2">
                  <Button className="mt-4 ml-4" onClick={handleSwitch}>
                    <i class="fas fa-exchange-alt"></i>
                  </Button>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Tujuan</Form.Label>
                    <Form.Control
                      as="select"
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                    >
                      <option value="">-Pilih Stasiun Tujuan-</option>
                      {stations.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Tanggal Berangkat</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={departureDate}
                      onChange={e => [
                        setDepartureDate(e.target.value),
                        console.log(e.target.value)
                      ]}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Pulang Pergi" />
                  </Form.Group> */}
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Dewasa</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={seats}
                      onChange={e => setSeats(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Bayi</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={baby}
                      onChange={e => setBaby(e.target.value)}
                    >
                      {seats == 1 ? (
                        <>
                          {" "}
                          <option value="0">0</option>{" "}
                          <option value="1">1</option>
                        </>
                      ) : seats == 2 ? (
                        <>
                          {" "}
                          <option value="0">0</option>{" "}
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </>
                      ) : seats == 3 ? (
                        <>
                          {" "}
                          <option value="0">0</option>{" "}
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </>
                      ) : (
                        <>
                          {" "}
                          <option value="0">0</option>{" "}
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="3">4</option>
                        </>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button className="mt-4 btn-lg" onClick={handleSearchTrain}>
                    Cari Tiket
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="ListKereta container-fluid" style={{ padding: "1rem" }}>
        <Card body>
          <Row>
            <Col className="text-center">
              <strong>Nama Kereta</strong>
            </Col>
            <Col className="text-center">
              <strong>Berangkat</strong>
            </Col>
            <Col className="text-center">
              <strong>Tiba</strong>
            </Col>
            <Col className="text-center">
              <strong>Durasi</strong>
            </Col>
            <Col className="text-center">
              <strong>Harga Per Orang</strong>
            </Col>
          </Row>
        </Card>

        {props.routes.loading ? (
          <Card body className="mt-3 cardKereta">
            <h5 style={{ margin: "auto", textAlign: "center" }}>Loading...</h5>
          </Card>
        ) : props.routes.data.length === 0 ? (
          <Card body className="mt-3 cardKereta">
            <h5 style={{ margin: "auto", textAlign: "center" }}>
              Data Tidak Ditemukan... :(
            </h5>
          </Card>
        ) : (
          props.routes.data.map((item, index) => (
            <Card body key={index} className="mt-3 cardKereta">
              <Row>
                <Col>
                  <strong>{item.trainName.name}</strong>
                  <br></br>
                  <small>{item.trainName.class}</small>
                  <br></br>
                  {/* <Button
                    className="btn btn-primary btn-sm mt-1"
                    onClick={e => console.log(item.id_train)}
                  >
                    Cek Jumlah Kursi
                  </Button> */}
                </Col>
                <Col className="text-center">
                  <strong>
                    <TimeFormat time={item.departure} />
                  </strong>
                  <br></br>
                  <small>
                    {departureDate == null || departureDate === "" ? (
                      <DateFormat date={GetDate()} />
                    ) : (
                      <DateFormat date={departureDate} />
                    )}
                  </small>
                  <br></br>
                  {item.originStation.name}
                </Col>
                <Col className="text-center">
                  <strong>
                    <TimeFormat time={item.arrival} />
                  </strong>
                  <br></br>
                  <small>
                    {departureDate == null || departureDate === "" ? (
                      <DateArrival
                        date={GetDate()}
                        departure={item.departure}
                        arrival={item.arrival}
                      />
                    ) : (
                      <DateArrival
                        date={departureDate}
                        departure={item.departure}
                        arrival={item.arrival}
                      />
                    )}
                  </small>
                  <br></br>
                  {item.destinationStation.name}
                </Col>
                <Col className="text-center">
                  <strong>
                    <DurasiPerjalanan
                      departure={item.departure}
                      arrival={item.arrival}
                    />
                  </strong>
                </Col>
                <Col className="text-center">
                  <strong className="text-primary">
                    <IDRcurrency currency={item.price} />
                  </strong>
                  <br></br>
                  {user.data ? (
                    <Link to="/booking" className="mt-2">
                      <Button
                        onClick={() => [
                          localStorage.setItem("routeID", item.id),
                          localStorage.setItem("adult", seats),
                          localStorage.setItem("baby", baby),
                          localStorage.setItem("departure", departureDate)
                        ]}
                      >
                        Beli Tiket
                      </Button>
                    </Link>
                  ) : null}
                </Col>
              </Row>
            </Card>
          ))
        )}
      </div>
      <Modal show={confirmation} onHide={() => setConfirmation(false)}>
        <Modal.Body>
          <div className="text-center">
            <h4>Pesanan Berhasil Dibuat!!</h4>
          </div>
          <div>
            <p>Silahakan cek di my ticket untuk melakukan proses berikutnya</p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={login} onHide={() => setLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginData.error ? (
            <div class="alert alert-danger" role="alert">
              Username atau Password Salah!
            </div>
          ) : (
            <></>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={register} onHide={() => setRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Modal-reg">
            <Form onSubmit={handleSubmitReg} className="need-validations">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Phone Number"
                  onChange={e => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={e => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Identity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your ID Number"
                  onChange={e => setIdentity(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const BlueContainer = () => {
  return (
    <div
      style={{ background: "#3498db", width: "100vw", paddingBottom: "3rem" }}
    >
      <Container>
        <Row>
          <Col>
            <div className="textLanding">
              <h3>Selamat Pagi, Pemburu Tiket</h3>
              <p>Siap untuk mencari tiket murah?</p>
            </div>
          </Col>
          <Col>
            <div
              className="App-img"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <img
                variant="top"
                src="https://cdn2.tstatic.net/style/foto/bank/images/promo-kai_20181014_114809.jpg"
                height="200px"
                alt="123"
              ></img>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    stations: state.stations,
    login: state.login,
    user: state.user,
    routes: state.routes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStation: () => dispatch(getStation()),
    postLogin: data => dispatch(postLogin(data)),
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout()),
    postRegister: data => dispatch(postRegister(data)),
    getAllRoutes: () => dispatch(getAllRoutes()),
    getSpecificRoutes: (origin, destination, departureDate) =>
      dispatch(getSpecificRoutes(origin, destination, departureDate)),
    buyTicket: data => dispatch(buyTicket(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

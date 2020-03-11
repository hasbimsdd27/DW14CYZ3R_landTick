import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { getUser } from "../../_actions/user";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import { logout } from "../../_actions/auth";
import Loading from "../../utils/loading";
const Transaction = props => {
  useEffect(() => {
    props.getUser();
  }, []);
  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const [jamBerangkat, setJamBerngkat] = useState(null);
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

  return loginData.isLogin === false && token == null ? (
    <Route>
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    </Route>
  ) : user.loading ? (
    <Loading />
  ) : user.data.level !== "admin" ? (
    <Route>
      <Redirect
        to={{
          pathname: "/"
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
              <div className="APP-dropdown">
                <h5>{user.data.name}</h5>
                <div className="APP-dropdown-content">
                  {/* <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/addticket">
                      <h6>Tambah Tiket</h6>
                    </Link>
                  </div> */}
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/station">
                      <h6>Stasiun</h6>
                    </Link>
                  </div>
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/train">
                      <h6>Kereta Api</h6>
                    </Link>
                  </div>
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/route">
                      <h6>Rute</h6>
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
      <div className="mt-2">
        <Container>
          <div style={{ width: "600px", margin: "auto" }}>
            <h4 className="mt-2">Tambah Tiket</h4>
            <Form className="mt-2">
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Nama Kereta</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select">
                      <option>-Nama Kereta-</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formKelasKereta">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Kelas Kereta</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select">
                      <option>-Pilih Kelas Kereta-</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Tanggal Berangkat</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="date" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formStasiunKeberangkatan">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Stasiun Keberangkatan</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select">
                      <option>-Stasiun Keberangkatan-</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Jam Keberangkatan</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="time" name="time" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formStasiunKeberangkatan">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Stasiun Tujuan</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select">
                      <option>-Stasiun Tujuan-</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Jam Tiba</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="time" name="time" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Harga Tiket</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTglBerangkat">
                <Row>
                  <Col className="col-md-4">
                    <Form.Label>Jumlah</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.login,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

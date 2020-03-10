import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Table,
  Modal,
  Col,
  Row
} from "react-bootstrap";
import { getUser } from "../../_actions/user";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import { logout } from "../../_actions/auth";
import {
  getAllRoutes,
  detailRoute,
  updateRoute,
  deleteRoute,
  addRoute
} from "../../_actions/route";
import { getTrains } from "../../_actions/train";
import { getStation } from "../../_actions/station";

import { TimeFormat, IDRcurrency } from "../../utils/extra";

const AdmRoutes = props => {
  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const train = props.train;
  const station = props.stations;
  const route = props.routes;
  const [origin, setOrigin] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [id_train, setIdTrain] = useState(null);
  const [price, setPrice] = useState(null);
  const [modalEdit, setmodalEdit] = useState(false);

  useEffect(() => {
    props.getUser();
    props.getAllRoutes();
    props.getTrains();
    props.getStation();
  }, []);

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

  const handleAdd = e => {
    e.preventDefault();
    const data = { origin, departure, destination, arrival, id_train, price };
    props.addRoute(data);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteRoute(id);
  };

  const handleDetail = (e, id) => {
    e.preventDefault();
    props.detailRoute(id);
    setmodalEdit(true);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const data = { origin, departure, destination, arrival, id_train, price };
    console.log(data, id);
    const res = await props.updateRoute(data, id);
    if (res.action.type === "UPDATE_ROUTE_FULFILLED") {
      setmodalEdit(false);
    }
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
    <h1>Loading</h1>
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
                <h5 className="text-primary">
                  {user.data.name}
                  <i className="fas fa-user ml-2"></i>
                </h5>
                <div className="APP-dropdown-content">
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/addticket">
                      <h6>Tambah Tiket</h6>
                    </Link>
                  </div>
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
      <div>
        <Container className="mt-2">
          <Table striped bordered hover style={{ textAlign: "center" }}>
            <thead>
              <tr className="text-center">
                <th className="text-center" style={{ width: "5%" }}>
                  No
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Asal
                </th>
                <th className="text-center" style={{ width: "5%" }}>
                  Jam Keberangkatan
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Tujuan
                </th>
                <th className="text-center" style={{ width: "5%" }}>
                  Jam Kedatangan
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Nama Kereta
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Harga
                </th>
                <th className="text-center" style={{ width: "15%" }}>
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody>
              {!route.data || route.loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <h3>Loading</h3>
                  </td>
                </tr>
              ) : (
                route.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.originStation.name}</td>
                    <td>
                      <TimeFormat time={item.departure} />
                    </td>
                    <td>{item.destinationStation.name}</td>
                    <td>
                      <TimeFormat time={item.arrival} />
                    </td>
                    <td>{item.trainName.name}</td>
                    <td>
                      <IDRcurrency currency={item.price} />
                    </td>
                    <td>
                      <Button
                        className="mr-2 btn btn-warning"
                        onClick={e => handleDetail(e, item.id)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        className="mr-2 btn btn-danger"
                        onClick={e => handleDelete(e, item.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
              <tr>
                <td>#</td>
                <td>
                  <Form.Control
                    as="select"
                    onChange={e => setOrigin(e.target.value)}
                  >
                    <option>-Pilih Stasiun Awal-</option>
                    {!station.data || station.loading ? (
                      <option>-Loading-</option>
                    ) : (
                      station.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </td>
                <td>
                  <input
                    type="time"
                    className="form-control"
                    onChange={e => setDeparture(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    onChange={e => setDestination(e.target.value)}
                  >
                    <option>-Pilih Stasiun Tujuan-</option>
                    {!station.data || station.loading ? (
                      <option>-Loading-</option>
                    ) : (
                      station.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </td>
                <td>
                  <input
                    type="time"
                    className="form-control"
                    onChange={e => setArrival(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    onChange={e => setIdTrain(e.target.value)}
                  >
                    <option>-Pilih Kereta-</option>
                    {!train.data || train.loading ? (
                      <option>-Loading-</option>
                    ) : (
                      train.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </td>
                <td>
                  {" "}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Harga Tiket"
                    onChange={e => setPrice(e.target.value)}
                  />
                </td>
                <td>
                  <Button
                    className="mr-2 btn btn-success btn-block"
                    onClick={e => handleAdd(e)}
                  >
                    <i className="fas fa-plus"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
      <Modal show={modalEdit} onHide={() => setmodalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stations</Modal.Title>
        </Modal.Header>

        {route.loading || route.detail == [] ? (
          <h1>Loading</h1>
        ) : (
          <>
            <Modal.Body>
              <Row className="mt-1">
                <Col className="col-4">Asal</Col>
                <Col className="col-8">
                  <Form.Control
                    as="select"
                    defaultValue={route.detail.origin}
                    onChange={e => setOrigin(e.target.value)}
                  >
                    <option>-Pilih Stasiun Awal-</option>
                    {station.data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Jam Keberangkatan</Col>
                <Col className="col-8">
                  <input
                    type="time"
                    className="form-control"
                    defaultValue={route.detail.departure}
                    onChange={e => setDeparture(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Tujuan</Col>
                <Col className="col-8">
                  <Form.Control
                    as="select"
                    defaultValue={route.detail.destination}
                    onChange={e => setDestination(e.target.value)}
                  >
                    <option>-Pilih Stasiun Tujuan-</option>
                    {!station.data || station.loading ? (
                      <option>-Loading-</option>
                    ) : (
                      station.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Jam Kedatangan</Col>
                <Col className="col-8">
                  <input
                    type="time"
                    defaultValue={route.detail.arrival}
                    className="form-control"
                    onChange={e => setArrival(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Nama Kereta</Col>
                <Col className="col-8">
                  <Form.Control
                    as="select"
                    defaultValue={route.detail.id_train}
                    onChange={e => setIdTrain(e.target.value)}
                  >
                    <option>-Pilih Kereta-</option>
                    {!train.data || train.loading ? (
                      <option>-Loading-</option>
                    ) : (
                      train.data.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Harga</Col>
                <Col className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={route.detail.price}
                    placeholder="Harga Tiket"
                    onChange={e => setPrice(e.target.value)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={e => handleEdit(e, route.detail.id)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.login,
    user: state.user,
    routes: state.routes,
    train: state.train,
    stations: state.stations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser()),
    getAllRoutes: () => dispatch(getAllRoutes()),
    getStation: () => dispatch(getStation()),
    getTrains: () => dispatch(getTrains()),
    addRoute: data => dispatch(addRoute(data)),
    deleteRoute: id => dispatch(deleteRoute(id)),
    detailRoute: id => dispatch(detailRoute(id)),
    updateRoute: (data, id) => dispatch(updateRoute(data, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdmRoutes);

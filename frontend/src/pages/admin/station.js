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
  getStation,
  addStation,
  deleteStation,
  detailStation,
  updateStation
} from "../../_actions/station";

const Station = props => {
  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const stations = props.stations;
  const [name, setName] = useState(null);
  const [code, setCode] = useState(null);
  const [wilayah, setWilayah] = useState(null);
  const [modalEdit, setmodalEdit] = useState(false);

  useEffect(() => {
    props.getUser();
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

  const handleAddStation = e => {
    e.preventDefault();
    const data = { name, code, wilayah };
    props.addStation(data);
    setName(null);
    setCode(null);
    setWilayah(null);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteStation(id);
  };

  const handleDetail = (e, id) => {
    e.preventDefault();
    props.detailStation(id);
    setmodalEdit(true);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const data = { name, code, wilayah };
    const res = await props.updateStation(data, id);
    if (res.action.type === "UPDATE_STATION_FULFILLED") {
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
                    <Link to="/route">
                      <h6>Rute</h6>
                    </Link>
                  </div>
                  <div className="mt-2 mb-2">
                    {" "}
                    <Link to="/train">
                      <h6>Kereta Api</h6>
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
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Nama</th>
                <th>Kode</th>
                <th>Wilayah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {!stations.data || stations.loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <h3>Loading</h3>
                  </td>
                </tr>
              ) : (
                stations.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.wilayah}</td>
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Stasiun"
                    onChange={e => setName(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kode Stasiun"
                    onChange={e => setCode(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wilayah Kab/Kota"
                    onChange={e => setWilayah(e.target.value)}
                  />
                </td>
                <td>
                  <Button
                    className="mr-2 btn btn-success btn-block"
                    onClick={e => handleAddStation(e)}
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

        {stations.loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <Modal.Body>
              <Row className="mt-1">
                <Col className="col-4">Nama Stasiun</Col>
                <Col className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={stations.detail.name}
                    onChange={e => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Kode Stasiun</Col>
                <Col className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={stations.detail.code}
                    onChange={e => setCode(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Wilayah Stasiun</Col>
                <Col className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={stations.detail.wilayah}
                    onChange={e => setWilayah(e.target.value)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={e => handleEdit(e, stations.detail.id)}
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
    stations: state.stations,
    login: state.login,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStation: () => dispatch(getStation()),
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser()),
    addStation: data => dispatch(addStation(data)),
    deleteStation: id => dispatch(deleteStation(id)),
    detailStation: id => dispatch(detailStation(id)),
    updateStation: (data, id) => dispatch(updateStation(data, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);

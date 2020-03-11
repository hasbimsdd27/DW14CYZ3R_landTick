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
  getTrains,
  addTrain,
  deleteTrain,
  detailTrain,
  updateTrain
} from "../../_actions/train";
import Loading from "../../utils/loading";

const AdmTrains = props => {
  const loginData = props.login;
  const user = props.user;
  const token = localStorage.getItem("token");
  const train = props.train;
  const [name, setName] = useState(null);
  const [seats, setSeats] = useState(null);
  const [classData, setClassData] = useState(null);
  const [modalEdit, setmodalEdit] = useState(false);

  useEffect(() => {
    props.getUser();
    props.getTrains();
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
    const data = { name, seat: seats, classData };
    props.addTrain(data);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteTrain(id);
  };

  const handleDetail = (e, id) => {
    e.preventDefault();
    props.detailTrain(id);
    setmodalEdit(true);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const data = { name, seat: seats, classData };
    console.log(data);
    const res = await props.updateTrain(data, id);
    if (res.action.type === "UPDATE_TRAIN_FULFILLED") {
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
      <div>
        <Container className="mt-2">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Nama</th>
                <th>Kapasitas</th>
                <th>Kelas</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {!train.data || train.loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <h3>Loading</h3>
                  </td>
                </tr>
              ) : (
                train.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.seat}</td>
                    <td>{item.class}</td>
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
                    placeholder="Nama Kereta Api"
                    onChange={e => setName(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kapasitas Kereta Api"
                    onChange={e => setSeats(e.target.value)}
                  />
                </td>
                <td>
                  {" "}
                  <Form.Control
                    as="select"
                    onChange={e => setClassData(e.target.value)}
                  >
                    <option>-Pilih Kelas Kereta-</option>
                    <option value="Economy">Economy</option>
                    <option value="Bussiness">Bussiness</option>
                    <option value="Executive">Executive</option>
                  </Form.Control>
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

        {train.loading || train.detail == [] ? (
          <Modal.Body>
            <div className="text-center">
              <h3>Loading</h3>
            </div>
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <Row className="mt-1">
                <Col className="col-4">Nama Kereta</Col>
                <Col className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={train.detail.name}
                    onChange={e => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Kapasitas Kereta</Col>
                <Col className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={train.detail.seat}
                    onChange={e => setSeats(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-4">Kelas Kereta</Col>
                <Col className="col-8">
                  <Form.Control
                    as="select"
                    defaultValue={train.detail.class}
                    onChange={e => setClassData(e.target.value)}
                  >
                    <option>-Pilih Kelas Kereta-</option>
                    <option value="Economy">Economy</option>
                    <option value="Bussiness">Bussiness</option>
                    <option value="Executive">Executive</option>
                  </Form.Control>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={e => handleEdit(e, train.detail.id)}
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
    train: state.train
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser()),
    getTrains: () => dispatch(getTrains()),
    addTrain: data => dispatch(addTrain(data)),
    deleteTrain: id => dispatch(deleteTrain(id)),
    detailTrain: id => dispatch(detailTrain(id)),
    updateTrain: (data, id) => dispatch(updateTrain(data, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdmTrains);

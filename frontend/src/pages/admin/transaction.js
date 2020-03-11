import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Modal,
  Row,
  Col,
  Image,
  Table
} from "react-bootstrap";
import { getUser } from "../../_actions/user";
import { connect } from "react-redux";
import { logout } from "../../_actions/auth";
import {
  getAllTransaction,
  getDetailTransaction,
  patchTransaction
} from "../../_actions/transaction";
import { Link, Redirect, Route } from "react-router-dom";
import { baseUrl } from "../../config/constants";
import Loading from "../../utils/loading";
import {
  DateArrival,
  DateFormat,
  TimeFormat,
  IDRcurrency
} from "../../utils/extra";

const AddTicket = props => {
  useEffect(() => {
    props.getUser();
    props.getAllTransaction();
  }, []);
  const loginData = props.login;
  const transaction = props.transaction;
  const user = props.user;
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState(false);
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(null);
  const [trxid, setTrxid] = useState(null);

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.logout();
    window.location.reload();
  };

  const loadData = id => {
    console.log(id);
    props.getDetailTransaction(id);
    setTrxid(id);
    setDetail(true);
  };

  const loadEditData = id => {
    setEdit(true);
    props.getDetailTransaction(id);
  };

  const updateTransaction = async e => {
    e.preventDefault();
    let data = { status };
    let id = trxid;
    console.log(data, id);
    const res = await props.patchTransaction(data, id);
    if (res.action.type === "PATCH_TRANSACTION_FULFILLED") {
      setDetail(false);
      props.getAllTransaction();
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
  ) : user.loading || transaction.loading ? (
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
          <h4 className="mt-2">List Payment</h4>
          <Table striped bordered hover size="sm" className="mt-2 text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Tiket</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>
                    {item.originStation.code} - {item.destinationStation.code}
                  </td>
                  <td>
                    {item.image_name === null ? (
                      <h5>Unpaid</h5>
                    ) : (
                      <Image
                        src={baseUrl + "images/" + item.image_name}
                        height="80px"
                        rounded
                      />
                    )}
                  </td>
                  <td>
                    {!item.status ? (
                      <></>
                    ) : (
                      <StatusPembayaran payment={item.status} />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => loadData(item.id)}
                    >
                      <i className="fas fa-info"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal show={detail} onHide={() => setDetail(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">DO-Line</Modal.Title>
          </Modal.Header>
          {transaction.loading || !transaction.detail ? (
            <Modal.Body>
              <div className="text-center">
                <h3>Loading</h3>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <h5>Invoice</h5>
              <Row className="mt-3">
                <Col className="col-lg-7">
                  <div>
                    <h6>Kereta Api</h6>
                    <label></label>
                  </div>
                  <div className="mb-3">
                    {!transaction.detail.train ? (
                      <h6>Loading...</h6>
                    ) : (
                      <h6>
                        {transaction.detail.train.name} (
                        {transaction.detail.train.class})
                      </h6>
                    )}
                  </div>
                  <Row>
                    <Col className="col-sm-2">
                      <i className="far fa-circle"></i>
                    </Col>
                    <Col>
                      {!transaction.detail.route ? (
                        <>
                          <h6>Loading...</h6>
                          <label>Loading...</label>
                        </>
                      ) : (
                        <>
                          <h6>
                            {" "}
                            <TimeFormat
                              time={transaction.detail.route.departure}
                            />
                          </h6>
                          <label>
                            <DateFormat
                              date={transaction.detail.departure_date}
                            />
                          </label>
                        </>
                      )}
                    </Col>
                    <Col>
                      {!transaction.detail.originStation ? (
                        <>
                          <h6>Loading...</h6>
                          <label>Loading...</label>
                        </>
                      ) : (
                        <>
                          <h6>{transaction.detail.originStation.code}</h6>
                          <label>{transaction.detail.originStation.name}</label>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-sm-2">
                      <i className="fas fa-circle"></i>
                    </Col>
                    <Col>
                      {!transaction.detail.train ? (
                        <>
                          <h6>Loading...</h6>
                          <label>Loading...</label>
                        </>
                      ) : (
                        <>
                          <h6>
                            <TimeFormat
                              time={transaction.detail.route.arrival}
                            />
                          </h6>
                          <label>
                            <DateArrival
                              date={transaction.detail.departure_date}
                              departure={transaction.detail.route.departure}
                              arrival={transaction.detail.route.arrival}
                            />
                          </label>
                        </>
                      )}
                    </Col>
                    <Col>
                      <h6>Surabaya (SBI)</h6>
                      <label>Surabaya Pasar Turi</label>
                    </Col>
                  </Row>
                </Col>
                <Col className="col-md-5">
                  <img
                    src={baseUrl + "images/" + transaction.detail.image_name}
                    height="175px"
                    alt="123"
                  />
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
                  {!transaction.detail.user ? (
                    <>
                      <td colSpan="4">Loading...</td>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td>{transaction.detail.user.identity}</td>
                        <td>{transaction.detail.user.name}</td>
                        <td>{transaction.detail.user.phone}</td>
                        <td>{transaction.detail.user.email}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
              <Row className="border mt-3">
                <Col>Total</Col>

                <Col className="text-right">
                  {" "}
                  {!transaction.detail.route ? (
                    <>Loading...</>
                  ) : (
                    <IDRcurrency currency={transaction.detail.total} />
                  )}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <h6>Status Pembayaran</h6>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId="formSTatus">
                    <Form.Control
                      as="select"
                      defaultValue={transaction.detail.status}
                      onChange={e => [setStatus(e.target.value)]}
                    >
                      <option value="">-Pilih Status-</option>
                      <option value="Waiting Payment">Waiting Payment</option>
                      <option value="Paid">Paid</option>
                      <option value="Approved">Approved</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
          )}

          <Modal.Footer>
            <Button variant="primary" onClick={updateTransaction}>
              Save
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
    login: state.login,
    user: state.user,
    transaction: state.transaction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser()),
    getAllTransaction: () => dispatch(getAllTransaction()),
    getDetailTransaction: id => dispatch(getDetailTransaction(id)),
    patchTransaction: (data, id) => dispatch(patchTransaction(data, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);

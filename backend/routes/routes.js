const express = require("express");
const router = express.Router();
const { coba } = require("../controller/coba");
const { getTrain } = require("../controller/train");
const { login, register } = require("../controller/auth");
const {
  addStation,
  getAllStation,
  deleteStation,
  detailStation,
  updateStation
} = require("../controller/station");
const { auth, authAdmin } = require("../middleware/auth");
const { detailUser } = require("../controller/user");
const {
  getAllTrainRoute,
  getSpecificTrainRoute,
  updateRoute,
  addRoute,
  deleteRoute,
  detailRoute
} = require("../controller/route");

const {
  getAllTrain,
  detailTrain,
  updateTrain,
  deleteTrain,
  addTrain
} = require("../controller/train");
const { BulkInsert } = require("../controller/passanger");

const { uploadPayment } = require("../controller/upload");
const {
  getAllTransaction,
  getDetailTransaction,
  buyTicket,
  UpdatePayment,
  userUpdatePayment
} = require("../controller/transaction");
const { getTicket, getDetailTiket } = require("../controller/ticket");

//login register
router.post("/login", login);
router.post("/register", register);

//route
// router.get("/train", auth, getTrain);
router.get("/routes", getAllTrainRoute);
router.get("/route/:origin/:destination/:date", getSpecificTrainRoute);
router.get("/route/detail/:id", auth, detailRoute);
router.post("/route", auth, addRoute);
router.delete("/route/:id", auth, deleteRoute);
router.patch("/route/:id", auth, updateRoute);

//train
router.post("/train", auth, addTrain);
router.get("/trains", getAllTrain);
router.delete("/train/:id", auth, deleteTrain);
router.get("/train/:id", auth, detailTrain);
router.patch("/train/:id", auth, updateTrain);

//add station
router.post("/station", auth, addStation);
router.get("/stations", getAllStation);
router.delete("/station/:id", auth, deleteStation);
router.get("/station/:id", auth, detailStation);
router.patch("/station/:id", auth, updateStation);

router.get("/user", auth, detailUser);

//buy ticket
router.post("/buyticket", auth, buyTicket);
router.get("/getmyticket", auth, getTicket);
router.get("/getdetailtiket/:id", auth, getDetailTiket);

//transactions
router.get("/transactions", auth, getAllTransaction);
router.patch("/transaction/:id", auth, UpdatePayment);
router.patch("/user/transaction/:id", auth, userUpdatePayment);
router.get("/transaction/:id", auth, getDetailTransaction);

//upload
router.post("/uploadfile/:id", uploadPayment);

//passanger
router.post("/passanger", BulkInsert);

module.exports = router;

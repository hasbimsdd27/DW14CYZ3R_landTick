const express = require("express");
const router = express.Router();
const { coba } = require("../controller/coba");
const {
  getTrain,
  getAllTrain,
  getSpecificTrain
} = require("../controller/train");
const { login, register } = require("../controller/auth");
const { addStation, getAllStation } = require("../controller/station");
const { auth, authAdmin } = require("../middleware/auth");
const { detailUser } = require("../controller/user");

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

//get train
// router.get("/train", auth, getTrain);
router.get("/trains", getAllTrain);
router.get("/train/:origin/:destination/:date", getSpecificTrain);

//add station
router.post("/station", authAdmin, addStation);
router.get("/stations", getAllStation);

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

module.exports = router;

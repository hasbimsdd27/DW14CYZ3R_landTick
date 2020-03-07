const multer = require("multer");
const models = require("../models");
const Station = models.station;
const Train = models.train;
const User = models.user;
const Route = models.route;
const Transaction = models.transaction;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (req, file, callback) => {
    console.log("file", file);
    callback(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

exports.uploadPayment = async (req, res) => {
  try {
    const { id } = req.params;
    let status = false;
    let statusUpdate = null;
    upload.single("image")(req, res, err => {
      if (err || !req.file) {
        throw new err();
      }
      statusUpdate = Transaction.update(
        {
          image_name: req.file.filename,
          updatedAt: new Date()
        },
        { where: { id } }
      );
      status = true;
      res.status(200).send({
        message: "Your image successfully uploaded"
      });
    });
  } catch (err) {
    res.status(400).send({
      message: "an error occured"
    });
  }
};

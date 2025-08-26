// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 8090;

// app.get("/", (req, res) => {
//   res.json({ message: "server is running 8090" });
// });

// const studentSchema = mongoose.Schema(
//   {
//     image: String,
//     name: String,
//     address: String,
//     Semester: Number,
//     class: String,
//     homeMobile: String,
//     motherName: String,
//     fatherName: String,
//     motherMobile: String,
//     fatherMobile: String,
//     isMotherEmployed: Boolean,
//     motherEmployerName: String,
//     motherJobPosition: String,
//     isFatherEmployed: Boolean,
//     fatherEmployerName: String,
//     fatherJobPosition: String,
//     hasSiblings: Boolean,
//     sibling1Name: String,
//     sibling2Name: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const studentModel = mongoose.model("student", studentSchema);

// // create data // save data to MongoDB
// app.post("/create", async (req, res) => {
//   console.log(req.body);
//   const data = new studentModel(req.body);
//   await data.save();

//   res.json({ success: true, message: "data saved successfully", data: data });
// });
// // Read - Fetch all data
// app.get("/getData", async (req, res) => {
//   try {
//     const data = await studentModel.find({});
//     res.json({ success: true, data: data });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch data." });
//   }
// });

// // update data
// app.put("/update", async (req, res) => {
//   console.log(req.body);
//   const { _id, ...rest } = req.body;

//   console.log(rest);
//   const data = await studentModel.updateOne({ _id: _id }, rest);

//   res.send({ success: true, message: "data updated successfully", data: data });
// });

// // delete data
// app.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const data = await studentModel.deleteOne({ _id: id });
//   res.send({ success: true, message: "data deleted successfully", data: data });
// });

// // mongoose
// //   .connect(
// //     "mongodb+srv://root:1234@cluster0.hp2dlnp.mongodb.net/?retryWrites=true&w=majority"
// //   )
// mongoose.connect(
//   "mongodb+srv://gopijanga:DB45db45@45@studentdb.um767dk.mongodb.net/?retryWrites=true&w=majority&appName=studentDB"
// )
//   .then(() => {
//     console.log("Connected to DB");
//     app.listen(PORT, () => console.log("Server is running on port " + PORT));
//   })
//   .catch((err) => console.log(err));





const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();   // ⬅️ Make sure this line is at the TOP

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8090;

// Simple route to confirm server is working
app.get("/", (req, res) => {
  res.json({ message: "Server is running on port " + PORT });
});

// Student schema
const studentSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    address: String,
    Semester: Number,
    class: String,
    homeMobile: String,
    motherName: String,
    fatherName: String,
    motherMobile: String,
    fatherMobile: String,
    isMotherEmployed: Boolean,
    motherEmployerName: String,
    motherJobPosition: String,
    isFatherEmployed: Boolean,
    fatherEmployerName: String,
    fatherJobPosition: String,
    hasSiblings: Boolean,
    sibling1Name: String,
    sibling2Name: String,
  },
  { timestamps: true }
);

const studentModel = mongoose.model("student", studentSchema);

// CREATE
app.post("/create", async (req, res) => {
  try {
    const data = new studentModel(req.body);
    await data.save();
    res.json({ success: true, message: "Data saved successfully", data });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});

// READ
// app.get("/getData", async (req, res) => {
//   try {
//     const data = await studentModel.find({});
//     res.json({ success: true, data });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ success: false, message: "Error fetching data" });
//   }
// });
app.get("/api/students", async (req, res) => {
  try {
      // const allStudents = await Student.find();
      const allStudents = await studentModel.find();

    // res.json(allStudents);
    res.json({ success: true, data: allStudents });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }   
});


// UPDATE
app.put("/update", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const data = await studentModel.updateOne({ _id }, rest);
    res.json({ success: true, message: "Data updated successfully", data });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ success: false, message: "Error updating data" });
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentModel.deleteOne({ _id: id });
    res.json({ success: true, message: "Data deleted successfully", data });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Error deleting data" });
  }
});

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server is running on port " + PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

    
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bfhl", (req, res) => {
  // send 200 status code as json
  res.status(200).json({ response_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { full_name, dob, college_email, college_roll_number, input } =
      req.body;

    if (
      !full_name ||
      !dob ||
      !college_email ||
      !college_roll_number ||
      !Array.isArray(input)
    ) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input data" });
    }

    const user_id = `${full_name.replace(/\s+/g, "_").toLowerCase()}_${dob}`;

    const numbers = input.filter((item) => !isNaN(item));
    const alphabets = input.filter((item) => isNaN(item));
    const highest_alphabet =
      alphabets.length > 0 ? alphabets.sort().reverse()[0] : null;

    res.json({
      is_success: true,
      user_id,
      college_email,
      college_roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

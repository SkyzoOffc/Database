const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
}

const NumberSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Number = mongoose.models.Number || mongoose.model("Number", NumberSchema);

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { phone } = req.body;
      if (!phone) return res.status(400).json({ message: "Nomor tidak boleh kosong" });

      const existingNumber = await Number.findOne({ phone });
      if (existingNumber) return res.status(400).json({ message: "Nomor sudah ada" });

      const newNumber = new Number({ phone });
      await newNumber.save();

      res.json({ message: "Nomor berhasil ditambahkan", number: newNumber });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "GET") {
    try {
      const numbers = await Number.find();
      res.json(numbers);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

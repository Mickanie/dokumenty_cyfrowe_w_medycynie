const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
let patientID = "12345";
const client = new MongoClient(
  "mongodb+srv://dokumenty-cyfrowe:kardiologia@dokumentycyfrowe-ck4e6.gcp.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

/*BAZA DANYCH - POLECENIA
const db = client.db('DokumentyCyfrowe')
const collection = db.collection('nazwaKolekcji')
-------------------------------
collection.find(filters).toArray()
collection.findOne(filters)
collection.insertOne(record)
collection.updateOne(
    filters, { $set: newData },
)
collection.deleteOne(filters)
*/

const app = express();
app.use(cors());
app.use(express.json()); //żeby móc pracować z jsonem
app.use(bodyParser.urlencoded({ extended: true })); //do czytania formularzy
app.use(bodyParser.json());
app.use(router);

//test połączenia z bazą
router.get("/database-test", async (req, res) => {
  const db = client.db("DokumentyCyfrowe");
  const doctors = await db
    .collection("Lekarz")
    .find({})
    .toArray();
  res.send(doctors);
 
});
//test dodawania do bazy
router.post("/database", (req, res) => {
  const { name, surname } = req.body;
  const db = client.db("DokumentyCyfrowe");
  const collection = db.collection("Lekarz");
  newDoctor = {
    name,
    surname
  };
  collection.insertOne(newDoctor);
  res.status(200).send("Added a doctor");
});

router.get("/documentation", async (req, res) => {
  const db = client.db("DokumentyCyfrowe");
  if (patientID !== "") {
    documents = await db
      .collection("Badanie")
      .find({ patientID })
      .toArray();

    labResults = await db
      .collection("BadanieLaboratoryjne")
      .find({ patientID })
      .toArray();

    const allDocuments = [...documents, ...labResults];
    res.send(allDocuments);
    return documents;
  }
});

router.get("/recommendations", async (req, res) => {
  const db = client.db("DokumentyCyfrowe");
  if (patientID !== "") {
    recommendations = await db
      .collection("Zalecenie")
      .find({ patientID })
      .toArray();

    res.send(recommendations);
    return recommendations;
  }
});

router.get("/medical-process", async (req, res) => {
  const db = client.db("DokumentyCyfrowe");
  if (patientID !== "") {
    tasks = await db
      .collection("Zadanie")
      .find({ patientID })
      .toArray();

    res.send(tasks);
    return tasks;
  }
});

router.get("/patient", async (req, res) => {
  const db = client.db("DokumentyCyfrowe");
  if (patientID !== "") {
    patient = await db.collection("Pacjent").findOne({ ID: patientID });
  }
  res.send(patient);
  return patient;
});

//LOGOWANIE
router.post("/", (req, res) => {
  const { login, password } = req.body;

  //hashowanie hasła, sprawdzenie poprawności hasła i loginu

  //do testowania w Postmanie:
  res.status(200).send(login);
});

//REJESTRACJA
router.post("/register", (req, res) => {
  const accountType = req.body.accountType;
  if (accountType == "doctor") {
    const { name, surname, pesel, PWZ, specialization, password } = req.body;
  } else {
    //pacjent i laborant
    const { name, surname, dob, pesel, password } = req.body;
  }

  //Generacja loginu (P12345, D12345, L12345), dodanie do Mongo

  //test
  res.status(200).send(accountType);
});

client.connect(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});

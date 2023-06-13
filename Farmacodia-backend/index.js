//Importando todos los modulos necesarios para este index.js
import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Termina codigo para exportar los modulos

// Codigo para conectarse a la base de datos y que te diga si se conecto
// correctamente
const uri = "mongodb+srv://Admin:KtghN6rkEQ8xFOrx@cluster0.1rlqnk6.mongodb.net/FarmacodiaDB";

const JWT_SECRET = "hasdkea019293129(){sajjadj7ad662ubs77d87a97hhaang87327mela8278a09as799873ser81272g123a";


const dbName = "miBasedeDatos";

async function connectToMongo() {
  const client = await mongoose.connect(uri, { useUnifiedTopology: true });
  console.log("Conectado exitosamente a MongoDB");
}

connectToMongo().catch((err) =>
  console.log("Error al conectarse a MongoDB:", err)
); //Termina el codigo para conectarse a la base de datos

//Codigo para crear un modelo en mongoDB con los parametros del usuario
const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    subscriptionPlan: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);

const User = mongoose.model("UserInfo"); //Fin del codigo para crear el modelo.

//Codigo para que desde el FrontEnt mande los datos hasta aqui
//y haga especificas acciones
app.post("/register", async (req, res) => {
  //Codigo para que se registre un usuario en la base de datos
  //con un token JWT encritado y unico
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
}); //Fin del codigo para registrar un usuario nuevo

app.post("/Login", async (req, res) => {
  //Codigo para que se logee un usuario ya existente
  //en la pagina y un sistema de busqueda si es que existe o no
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '30m'
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
}); //Fin del codigo para logearse

app.post("/userData", async (req, res) => {
 const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
}); //Fin del codigo para traer los datos del usuario al FrontEnd de la pagina
//Principal o HomePage.

// Definición del modelo de datos
const EspecialidadSchema = new mongoose.Schema(
  {
    nombre: String,
  },
  { collection: "Especialidad" }
);

const SintomaSchema = new mongoose.Schema(
  {
    nombre: String,
    especialidadId: mongoose.Schema.Types.ObjectId,
  },
  { collection: "Sintomas" }
);

const Especialidad = mongoose.model("Especialidad", EspecialidadSchema);
const Sintoma = mongoose.model("Sintoma", SintomaSchema);

// Ruta para buscar la especialidad médica
app.post("/buscar-especialidad", async (req, res) => {
  const { sintomas } = req.body;

  try {
    // Buscar los síntomas en la base de datos
    const sintomasEncontrados = await Sintoma.find({
      nombre: { $in: sintomas },
    });

    // Obtener las especialidades relacionadas con los síntomas encontrados
    const especialidadesEncontradas = await Especialidad.find({
      _id: {
        $in: sintomasEncontrados.map((sintoma) => sintoma.especialidadId),
      },
    });

    res.json({ especialidades: especialidadesEncontradas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al buscar la especialidad médica" });
  }
});

//Ruta para la api de subscripcion de la pagina
const stripe = new Stripe(
  "sk_test_51NBf40K9ExXi2sPZM29nnZSfrsRl6HQwEwACslF4P8iYQeIkArjbP3VBu1cecaTNK2O3gEIr0e72qNCnuXuU29Mc00SfGB8tkF"
);

app.post("/api/subscribirse", async (req, res) => {
  try {
    const { id, amount, plan, token } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });

    // Obtén el email del usuario desde el token JWT
    const { email } = jwt.verify(token, JWT_SECRET);

    // Actualiza el plan de suscripción del usuario en la base de datos
    await User.updateOne({ email }, { subscriptionPlan: plan });

    console.log(payment);

    res.send({ message: "Pago exitoso" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});

// Ruta para actualizar los datos del usuario logeado
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { fname, lname, email } = req.body;

  // Verificar que el usuario logeado coincida con el usuario a actualizar
  if (req.headers.authorization !== userId) {
    return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
  }

  // Actualizar los datos del usuario
  User.findByIdAndUpdate(userId, { fname, lname, email }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json(updatedUser);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error en el servidor.', error });
    });
});

app.post('/enviar-mensaje', (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 9002,
    secure: false,
    logger: true,
    secureConnection: false,
    auth: {
      user: "angelde9919@gmail.com",
      pass: "wundrnfqjzwwcxhh"
    },
    tls: {
      rejectUnauthorized: true
    }
  })

  const mailOptions = {
    from: correo,
    to: 'angelde9919@gmail.com', // Cambia esto por tu dirección de correo
    subject: nombre,
    text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el mensaje');
    } else {
      console.log('Mensaje enviado: ' + info.response);
      res.send('Mensaje enviado');
    }
  });
});


//Configurando el servidor
app.listen(9002, () => {
  console.log("BE iniciado en puerto", 9002);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responderIA } from "./ai.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  try {
    const mensaje = req.body.message || req.body.mensaje;

    if (!mensaje) {
      return res.status(400).json({ error: "Mensaje requerido" });
    }

    const respuesta = await responderIA(mensaje);

    res.json({ respuesta });
  } catch (error) {
    console.error("ERROR /chat:", error);
    res.status(500).json({ respuesta: "Hubo un error procesando tu solicitud." });
  }
});


app.listen(3000, () => {
  console.log("InnovVentas AI funcionando en http://localhost:3000");
});

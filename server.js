import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/frete", async (req, res) => {
  const cep = (req.query.cep || "").replace(/\D/g, "");

  if (cep.length !== 8) {
    return res.json({ erro: "CEP inválido" });
  }

  const payload = {
    from: { postal_code: "62860000" },
    to: { postal_code: cep },
    products: [
      {
        weight: 0.3,
        width: 10,
        height: 5,
        length: 15,
      },
    ],
  };

  try {
    const response = await fetch("https://api.superfrete.com/v1/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzE2MzI4MTksInN1YiI6InVvSk54cERXS21aZzNMRWhtQnhSNVNaNEVXVzIifQ.0F8OY7G0mo3ZzBaJD5OqyscELsChWFWaVWks3LCHfPc"
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    res.status(response.status).send(text);

  } catch (error) {
    res.json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

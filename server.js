const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/frete", async (req, res) => {
  try {
    const cep = (req.query.cep || "").replace(/\D/g, "");

    if (cep.length !== 8) {
      return res.status(400).json({ erro: "CEP inválido" });
    }

    const response = await axios.post(
      "https://api.superfrete.com/v1/quote",
      {
        from: { postal_code: "62860000" },
        to: { postal_code: cep },
        products: [
          {
            weight: 0.3,
            width: 10,
            height: 5,
            length: 15
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzE2MzI4MTksInN1YiI6InVvSk54cERXS21aZzNMRWhtQnhSNVNaNEVXVzIifQ.0F8OY7G0mo3ZzBaJD5OqyscELsChWFWaVWks3LCHfPc"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      erro: "Erro ao calcular frete",
      detalhe: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});

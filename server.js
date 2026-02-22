const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 10000;

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Melhor Envio rodando 🚀");
});

// Rota para calcular frete
app.post("/calcular-frete", async (req, res) => {
  try {
    const { cep } = req.body;

    if (!cep) {
      return res.status(400).json({ erro: "CEP não informado" });
    }

    const response = await axios.post(
      "https://api.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        from: {
          postal_code: "01001000" // SEU CEP DE ORIGEM
        },
        to: {
          postal_code: cep
        },
        products: [
          {
            id: "1",
            width: 15,
            height: 10,
            length: 20,
            weight: 1,
            insurance_value: 100,
            quantity: 1
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const frete = response.data[0];

    res.json({
      valor: frete.price,
      prazo: frete.delivery_time
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ erro: "Erro ao calcular frete" });
  }
});

app.listen(PORT, () => {
  console.log("API rodando na porta " + PORT);
});

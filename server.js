app.get("/frete", async (req, res) => {
  try {
    const cep = (req.query.cep || "").replace(/\D/g, "");

    if (cep.length !== 8) {
      return res.status(400).json({ erro: "CEP inválido" });
    }

    const response = await fetch("https://api.superfrete.com/v1/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzE2MzI4MTksInN1YiI6InVvSk54cERXS21aZzNMRWhtQnhSNVNaNEVXVzIifQ.0F8OY7G0mo3ZzBaJD5OqyscELsChWFWaVWks3LCHfPc"
      },
      body: JSON.stringify({
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
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ erro: "Erro interno no servidor", detalhe: error.message });
  }
});

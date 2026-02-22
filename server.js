const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWNhZmQ2OTMzY2I5Mjg1NzhmOTFiYzgyOGUxMzUzOGQxYjU1YzEwYjEyOWZlNjczNGM4NGZhNDdlMmRkOTMxYjA5ODExNjViNTVkYmJlYzMiLCJpYXQiOjE3NzE3Nzc3OTUuMzkzOTQ1LCJuYmYiOjE3NzE3Nzc3OTUuMzkzOTQ3LCJleHAiOjE4MDMzMTM3OTUuMzgzMDg3LCJzdWIiOiJhMTI0NjY2NS1hMTcyLTQ2YzQtOGY3NS01ZDBjYzllYzdhOGMiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.tmJ6Bb9w_ciYGiaTRAVILPYKr4vyESU59dh17GgXFbW43t4JaF7U3_uIN5l2rjjM7C8AevYgeatHY9JIYamBOI2wo_w2kMAON1K0AYU7aANOx8aByZ25hvEjXJAUmcakzb-8LqoO-Qp547OU_JZ46glMBZ5ccl_c5fRp8Oq3Ns0_eexq5bFVjy67YXRod2A0d3vdL9r13gUxDV-0dobsayILQkePi9KWjAvsJTVqR7jeJMRRKEJit_HXYPUw_uvuqSBcOEg3c0xt8vN_n6_5RShdwjwwGbWc2MZGjcoKIvCexeiN79lcnvI1JM-0sqep-HdmyniVhPofawhDcVpa7sd3cCvBxUo0Pl4a6us4gG1F-LgmI5hA1708FLqEQXzylSgit_h2HO-cG46CbwBsoruBoXeBjeaiJcPKyNNXmOA1Oq9487raIk_rWp7uGSuvkSXlCJTMqtxnV3HrPJdhj90KGvxzjImX-UpXRM4lL1-NOnILhzlFr-OiPEen6Q52MjCZGqqLXrttKUt4JfL1nX-eL9LRyYBcDGoD_YDeWffDi0lweKKRU7XC5_5gwB0PBMoSn11T3BulvyTuT3v0q8jyL0RzL21b5zzDSFOrxd_9PTsRBLs5VtCUGLFGJhaMUYhAhSkHzZh2LcK5gjyqWMNek9-dYSli0P792YuDTlk";
const CEP_ORIGEM = "62860000";

app.post("/calcular-frete", async (req, res) => {

    const { cep } = req.body;

    if (!cep) {
        return res.status(400).json({ erro: "CEP obrigatório" });
    }

    try {

        const response = await axios.post(
            "https://api.melhorenvio.com.br/api/v2/me/shipment/calculate",
            {
                from: { postal_code: CEP_ORIGEM },
                to: { postal_code: cep },
                products: [
                    {
                        id: "1",
                        width: 11,
                        height: 16,
                        length: 11,
                        weight: 0.3,
                        insurance_value: 120,
                        quantity: 1
                    }
                ]
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ erro: "Erro ao calcular frete" });
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API rodando na porta " + PORT));

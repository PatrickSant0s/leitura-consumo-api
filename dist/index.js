"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/upload', [
    (0, express_validator_1.body)('image').isString(),
    (0, express_validator_1.body)('customer_code').isString(),
    (0, express_validator_1.body)('measure_datetime').isISO8601(),
    (0, express_validator_1.body)('measure_type').isIn(['WATER', 'GAS'])
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: errors.array() });
    }
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    // Verifique se já existe uma leitura no mês para esse tipo de medida.
    // Por simplicidade, essa parte será omitida. Em um caso real, consultaríamos o banco de dados.
    try {
        // Integração com a API do Google Gemini
        const response = yield axios_1.default.post('https://api.google-gemini.com/vision', {
            image
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
            }
        });
        const measure_value = response.data.value; // Exemplo de resposta da API
        const measure_uuid = (0, uuid_1.v4)();
        return res.status(200).json({
            image_url: 'https://link-temporario-da-imagem.com',
            measure_value,
            measure_uuid
        });
    }
    catch (error) {
        return res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Erro ao processar a imagem.' });
    }
}));
// Código para rodar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

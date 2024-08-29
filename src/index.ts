import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/upload', [
  body('image').isString(),
  body('customer_code').isString(),
  body('measure_datetime').isISO8601(),
  body('measure_type').isIn(['WATER', 'GAS'])
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error_code: 'INVALID_DATA', error_description: errors.array() });
  }

  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Verifique se já existe uma leitura no mês para esse tipo de medida.
  // Por simplicidade, essa parte será omitida. Em um caso real, consultaríamos o banco de dados.

  try {
    // Integração com a API do Google Gemini
    const response = await axios.post('https://api.google-gemini.com/vision', {
      image
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      }
    });

    const measure_value = response.data.value; // Exemplo de resposta da API
    const measure_uuid = uuidv4();

    return res.status(200).json({
      image_url: 'https://link-temporario-da-imagem.com',
      measure_value,
      measure_uuid
    });
  } catch (error) {
    return res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Erro ao processar a imagem.' });
  }
});

// Código para rodar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

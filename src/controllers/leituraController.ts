import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { Leitura } from '../models/Leitura';
import { User } from '../models/User';
import { Meter } from '../models/Meter';

dotenv.config();

export const uploadLeitura = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: errors.array() });
    }

    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Verifique se já existe uma leitura para o mês e tipo
    const existingLeitura = await Leitura.findOne({
        where: {
            user_id: customer_code,
            date: new Date(measure_datetime).getMonth(),
            type: measure_type,
        }
    });

    if (existingLeitura) {
        return res.status(409).json({ error_code: 'ALREADY_EXISTS', error_description: 'Leitura já existe para este mês.' });
    }

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

        const leitura = await Leitura.create({
            id: measure_uuid,
            user_id: customer_code,
            meter_id: uuidv4(),
            value: measure_value,
            type: measure_type,
            date: new Date(measure_datetime),
            image_url: 'https://link-temporario-da-imagem.com',
        });

        return res.status(200).json({
            image_url: leitura.image_url,
            measure_value: leitura.value,
            measure_uuid: leitura.id
        });
    } catch (error) {
        return res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Erro ao processar a imagem.' });
    }
};

export const confirmLeitura = async (req: Request, res: Response) => {
    const { measure_uuid, confirm } = req.body;

    try {
        const leitura = await Leitura.findOne({ where: { id: measure_uuid } });

        if (!leitura) {
            return res.status(404).json({ error_code: 'NOT_FOUND', error_description: 'Leitura não encontrada.' });
        }

        if (confirm) {
            leitura.confirmed = true;
            await leitura.save();
            return res.status(200).json({ message: 'Leitura confirmada com sucesso.' });
        } else {
            await leitura.destroy();
            return res.status(200).json({ message: 'Leitura rejeitada e removida.' });
        }
    } catch (error) {
        return res.status(500).json({ error_code: 'INTERNAL_ERROR', error_description: 'Erro ao confirmar a leitura.' });
    }
};


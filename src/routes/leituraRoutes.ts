import { Router } from 'express';
import { uploadLeitura, confirmLeitura, listLeituras } from '../controllers/leituraController';
import { body, param } from 'express-validator';

const router = Router();

router.post('/upload', [
    body('image').isString(),
    body('customer_code').isString(),
    body('measure_datetime').isISO8601(),
    body('measure_type').isIn(['WATER', 'GAS'])
], uploadLeitura);

router.post('/confirm', [
    body('measure_uuid').isUUID(),
    body('confirm').isBoolean()
], confirmLeitura);

router.get('/:customer_code/list', [
    param('customer_code').isString()
], listLeituras);

export default router;

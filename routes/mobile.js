import express from 'express';
import {configureMobile} from "../controllers/mobile.js";

const router = express.Router();

router.post('/', configureMobile);

export default router;
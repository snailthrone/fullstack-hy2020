"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const data = patientService_1.getPatients();
    res.send({ data });
});
exports.default = router;

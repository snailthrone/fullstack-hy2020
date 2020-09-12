"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./src/routes/diagnoses"));
const patients_1 = __importDefault(require("./src/routes/patients"));
const ping_1 = __importDefault(require("./src/routes/ping"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.use('/ping', ping_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

"use strict";
// server/routes.ts
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
const SearchTerm_1 = __importDefault(require("./models/SearchTerm"));
const router = express_1.default.Router();
// Save search term to MongoDB
router.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { term } = req.body;
    try {
        const searchTerm = new SearchTerm_1.default({ term });
        yield searchTerm.save();
        res.status(201).json({ message: 'Search term saved successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Get all search terms from MongoDB
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerms = yield SearchTerm_1.default.find();
        res.json(searchTerms);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = router;

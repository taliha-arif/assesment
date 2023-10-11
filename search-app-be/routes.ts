// server/routes.ts

import express from 'express';
import SearchTerm from './models/SearchTerm';

const router = express.Router();

// Save search term to MongoDB
router.post('/search', async (req: any, res: any) => {
    const { term } = req.body;
    try {
        const searchTerm = new SearchTerm({ term });
        await searchTerm.save();
        res.status(201).json({ message: 'Search term saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all search terms from MongoDB
router.get('/search', async (req: any, res: any) => {
    try {
        const searchTerms = await SearchTerm.find();
        res.json(searchTerms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;

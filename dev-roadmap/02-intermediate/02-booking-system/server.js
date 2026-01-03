/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Local Experience Booking System
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Allow frontend to call APIs
app.use(express.static('.')); // Serve the frontend files statically

// Mock Database
const experiences = [
    {
        id: 1,
        title: "Pottery Workshop in Downtown",
        rating: 4.9,
        reviews: 120,
        price: 45,
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee335696e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Art"
    },
    {
        id: 2,
        title: "Hidden Jazz Club Tour",
        rating: 4.8,
        reviews: 85,
        price: 30,
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Music"
    },
    {
        id: 3,
        title: "Sunset Kayaking",
        rating: 5.0,
        reviews: 210,
        price: 65,
        image: "https://images.unsplash.com/photo-1544551763-46a87c343d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Outdoors"
    },
    {
        id: 4,
        title: "Authentic Pasta Making",
        rating: 4.9,
        reviews: 300,
        price: 55,
        image: "https://images.unsplash.com/photo-1556910113-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Food"
    }
];

// Routes
app.get('/api/experiences', (req, res) => {
    // Optional query param filter
    const { category } = req.query;
    if(category && category !== 'All') {
        return res.json(experiences.filter(e => e.category === category));
    }
    res.json(experiences);
});

app.post('/api/book', (req, res) => {
    const { experienceId, date, guests } = req.body;
    
    if(!experienceId || !date || !guests) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    const exp = experiences.find(e => e.id === parseInt(experienceId));
    if(!exp) return res.status(404).json({ error: "Experience not found" });

    // Mock Booking Logic
    const bookingRef = "BKG-" + Math.floor(Math.random() * 100000);
    const total = exp.price * guests;

    console.log(`New Booking: ${bookingRef} for ${exp.title} on ${date}`);

    res.status(201).json({
        success: true,
        message: "Booking confirmed successfully!",
        bookingRef,
        total,
        experience: exp.title
    });
});

app.listen(PORT, () => {
    console.log(`Booking System Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the app`);
});

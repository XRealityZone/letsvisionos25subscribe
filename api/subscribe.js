require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/subscribe/post', async (req, res) => {
    try {
        const email = req.body.MERGE0;
        
        // Generating the current time in the specified format
        const currentTime = new Date();
        const name = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()},${currentTime.getHours()}:${currentTime.getMinutes()}`;

        const response = await axios.post('https://api.typlog.com/v3/subscribers', {
            name: name,
            email: email
        }, {
            headers: {
                'X-Site-Id': '4108',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
            }
        });

        res.status(200).json({ success: true, message: "Subscription successful" });
    } catch (error) {
        console.error('Error forwarding subscription to Typlog:', error);
        res.status(500).json({
            success: false,
            message: error.response.data.errors[0] || "An unexpected error occurred"
        });
    }
});

module.exports = (req, res) => {
    app(req, res);
};

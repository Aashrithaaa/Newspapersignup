const express = require('express');
const bodyParser = require('body-parser');
const sgClient = require('@sendgrid/client');
sgClient.setApiKey('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'); // Replace with your actual SendGrid API key

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
    try {
        const email = req.body.email;

        // Add contact to SendGrid contacts
        const response = await sgClient.request({
            method: 'PUT',
            url: '/v3/marketing/contacts',
            body: [{
                email: email,
            }],
        });

        console.log('Contact added:', response.body);
        res.send('Contact added successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(8080, function() {
    console.log('Server is running on port 8080');
});

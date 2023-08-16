const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Pico y Placa Predictor Backend');
});

app.post('/predict', (req, res) => {
    
    const { licensePlate, date, time } = req.body;

    const lastDigit = licensePlate.slice(-1);
    const dateObject = new Date(date);
    const dayOfWeek = dateObject.getDay();

    const restrictedMorningStart = new Date('1970-01-01T07:00:00');
    const restrictedMorningEnd = new Date('1970-01-01T09:30:00');
    const restrictedEveningStart = new Date('1970-01-01T16:00:00');
    const restrictedEveningEnd = new Date('1970-01-01T19:30:00');

    const timeObject = new Date(`1970-01-01T${time}:00`);

    const isRestrictedTime =
    (timeObject >= restrictedMorningStart && timeObject <= restrictedMorningEnd) ||
    (timeObject >= restrictedEveningStart && timeObject <= restrictedEveningEnd);

    let isRestrictedDay = false;

    switch (dayOfWeek) {
        case 0: // Monday
            isRestrictedDay = ['1', '2'].includes(lastDigit);
            break;
        case 1: // Tuesday
            isRestrictedDay = ['3', '4'].includes(lastDigit);
            break;
        case 2: // Wednesday
            isRestrictedDay = ['5', '6'].includes(lastDigit);
            break;
        case 3: // Thursday
            isRestrictedDay = ['7', '8'].includes(lastDigit);
            break;
        case 4: // Friday
            isRestrictedDay = ['9', '0'].includes(lastDigit);
            break;
        default:
            isRestrictedDay = false; // No restrictions on weekends
    }

    if (isRestrictedDay && isRestrictedTime) {
        res.json({ result: 'Car cannot be on the road'})
    } else {
        res.json({ result: 'Car can be on the road'})
    }
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

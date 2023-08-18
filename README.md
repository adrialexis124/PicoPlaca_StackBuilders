
## Pico y Placa Predictor

### Project Description:
The Pico y Placa Predictor is a simple tool to predict if a car can be on the road based on its license plate number, date, and time, following the Pico y Placa regulations in Quito.

### Features:
- Predicts if a car can be on the road based on the Pico y Placa regulations.
- Accepts license plate, date, and time as inputs.
- Provides user-friendly alerts for predictions and validations.

### Installation:

#### 1. Clone the repository:
```bash
git clone https://github.com/adrialexis124/PicoPlaca_StackBuilders.git
cd PicoPlaca_StackBuilders
```

#### 2. Backend Setup:

Navigate to the backend directory:
```bash
cd backend
```

Install the necessary dependencies:
```bash
npm init -y
npm install express body-parser cors
```

Run the backend server:
```bash
node server.js
```

The backend server should now be running on `http://localhost:3000/`.

#### 3. Frontend Setup:

Navigate to the frontend directory:
```bash
cd frontend
```

Install the necessary dependencies:
```bash
npm install @vue/cli axios sweetalert2
```

Run the frontend:
```bash
npm run serve
```

The frontend should now be accessible at `http://localhost:8080/`.

### Testing:

The backend contains tests to validate the functionality of the Pico y Placa predictor. To run the tests, navigate to the backend directory and execute:
```bash
npm install mocha chai chai-http --save-dev
npm run test
```

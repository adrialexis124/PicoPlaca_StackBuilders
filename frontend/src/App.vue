<template>
  
    <h1>Pico y Placa Predictor</h1>
    <form @submit.prevent="submitForm">
      <label for="license-plate">License Plate:</label>
      <input type="text" id="license-plate" v-model="licensePlate" @input="handleInput" />
      <br />
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="date" />
      <br />
      <label for="time">Time:</label>
      <input type="time" id="time" v-model="time" />
      <br />
      <button type="submit">Predict</button>
    </form>
  
</template>


<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      licensePlate: '',
      date: '',
      time: ''
    };
  },
  methods: {
  async submitForm() {

    if (!this.licensePlate || !this.date || !this.time || this.licensePlate.length !== 8) {
        Swal.fire({
            title: 'Error',
            text: 'Please ensure all fields are complete and the license plate is correctly formatted.',
            icon: 'error'
        });
        return;
    }

    const data = {
      licensePlate: this.licensePlate,
      date: this.date,
      time: this.time
    };

    try {
      const response = await axios.post('http://localhost:3000/predict', data);
      
      let alertIcon = 'success';

      if (response.data.result === 'Car cannot be on the road') {
          alertIcon = 'error';
      }

      Swal.fire({
          title: 'Prediction Result',
          text: response.data.result,
          icon: alertIcon
      });

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while predicting.',
        icon: 'error'
      });
      console.error(error);
    }
  },
  
  handleInput() {
    this.licensePlate = this.formatLicensePlate(this.licensePlate);
  },

  formatLicensePlate(value) {
    let formatted = value.toUpperCase();

    // Ensure only letters for the first 3 characters
    if (formatted.length <= 3) {
      formatted = formatted.replace(/[^A-Z]/g, '');
    }
    
    // Add hyphen after third character
    if (formatted.length === 3) {
      formatted += '-';
    }

    // Ensure only numbers for the next 4 characters
    if (formatted.length > 3) {
      formatted = formatted.slice(0, 4) + formatted.slice(4).replace(/[^0-9]/g, '');
    }

    // Ensure total length does not exceed 8 (3 letters, 1 hyphen, 4 numbers)
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8);
    }

    return formatted;
  }
}

};
</script>


<style>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #F7F7F7;
  color: #333333;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#app {
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  border: none;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 20px auto;
}

button:hover {
  background-color: #0056b3;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #007BFF;
}

</style>


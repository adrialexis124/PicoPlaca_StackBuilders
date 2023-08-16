<template>
  <div id="app">
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
  </div>
</template>


<script>
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
    const data = {
      licensePlate: this.licensePlate,
      date: this.date,
      time: this.time
    };

    try {
      const response = await axios.post('http://localhost:3000/predict', data);
      alert(`Prediction result: ${response.data.result}`);
    } catch (error) {
      alert('An error occurred while predicting.');
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
#app {
  text-align: center;
  margin: 40px;
}
input {
  margin: 10px 0;
}
</style>


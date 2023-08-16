<template>
  <div id="app">
    <h1>Pico y Placa Predictor</h1>
    <form @submit.prevent="submitForm">
      <label for="license-plate">License Plate:</label>
      <input type="text" id="license-plate" v-model="licensePlate" />
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


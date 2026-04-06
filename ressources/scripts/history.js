import {Chart} from "chart.js";

export class TemperatureHistory{

    chart;
    value_history = [];
    ctx;
    I_max_data;

    constructor(ElementID, I_max_data = 20){
        this.ctx = document.getElementById(ElementID);
        this.chart = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [{
              label: 'History of Temperature',
              data: [],
            }]
          }
        });
        this.max_data = I_max_data;
    }

    // add_to_history(A_dummy_data, I_temp){
    //     let I_value = A_dummy_data[(I_temp - 1 + 20) % 20];
    //     this.value_history.push(I_value);
    // }

    add_to_history(value){
        this.value_history.push(value);
        this.refreshChart();
    }

    refreshChart() {
      let val = this.value_history.slice(Math.max(this.value_history.length - this.max_data, 1));
      this.chart.data.labels = val.map((_, i) => i + 1);
      this.chart.data.datasets[0].data = val;
      this.chart.data.datasets[0].backgroundColor =
        val.map(v => this.getBarColor(v));
      this.chart.update();
    }

    getBarColor(value) {
      if (value <= 0) return '#4FC3F7';
      if (value <= 20) return '#81C784';
      if (value <= 30) return '#FFB74D';
      return '#E57373';
    }
}
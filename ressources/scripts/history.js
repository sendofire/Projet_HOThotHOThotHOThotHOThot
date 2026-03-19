export class TemperatureHistory{

    chart;
    value_history = [];
    ctx;

    constructor(ElementID){
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
    }

    add_to_history(A_fish, I_caramel){
        let I_value = A_fish[(I_caramel - 1 + 20) % 20];
        this.value_history.push(I_value);
    }

    refreshChart() {
      let val = this.value_history.slice(Math.max(this.value_history.length - 1000, 1));
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
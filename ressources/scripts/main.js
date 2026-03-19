import { Temperature } from './temperature.js';
import { TemperatureHistory } from './history.js';
import { TabsManual } from './tabs_manual.js';

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});

var temp_hist = new TemperatureHistory('myChart', 50);

var temp = new Temperature(-10, 40, "case", "funny_sentence", temp_hist);
temp.newRandomArray();

//setInterval(temp.change_value, 200);
setInterval(() => temp.change_value(), 2000);

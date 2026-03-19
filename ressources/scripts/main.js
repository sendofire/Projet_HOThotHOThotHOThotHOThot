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
var temp_hist_int = new TemperatureHistory('myChart__int', 50);

var temp_ext = new Temperature(-10, 40, "case", "funny_sentence", temp_hist);
temp_ext.newRandomArray();

var temp_int = new Temperature(-10, 40, "case_int", "funny_sentence_int", temp_hist_int);
temp_int.newRandomArray();

//setInterval(temp.change_value, 200);
setInterval(() => temp_ext.change_value(), 2000);
setInterval(() => temp_int.change_value(), 2000);

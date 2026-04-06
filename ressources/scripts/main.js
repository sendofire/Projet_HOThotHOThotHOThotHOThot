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
var O_temp_hist_int = new TemperatureHistory('myChart__int', 50);

var temp = new Temperature(
  -10, 40,
  "case_ext", "temp_desc_ext", temp_hist,
  "case_int", "temp_desc_int", O_temp_hist_int
);

setInterval(() => temp.get_data(), 100);

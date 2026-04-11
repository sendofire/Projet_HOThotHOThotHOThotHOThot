import { Temperature } from './temperature.js';
import { TemperatureHistory } from './history.js';
import { TabsManual } from './tabs_manual.js';
import { AlertNotifications } from './notification.js';

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});

var temp_hist = new TemperatureHistory('myChart', 50);
var temp_hist_int = new TemperatureHistory('myChart__int', 50);
var notifications = new AlertNotifications({
  historyElement: document.getElementById('alertList'),
  dialogElement: document.getElementById('alertDialog'),
  toastContainer: document.getElementById('toastContainer')
});

var temp = new Temperature(
-10, 40,
"case", "funny_sentence", temp_hist,
"case_int", "funny_sentence_int", temp_hist_int,
"minJourExt", "maxJourExt",
"minJourInt", "maxJourInt",
notifications
);

//setInterval(temp.change_value, 200);
temp.newRandomArray();
setInterval(() => temp.change_value(), 2000);

notifications.bindDialogControls({
  openButton: document.getElementById('btnAlertes'),
  closeButton: document.getElementById('btnCloseAlertes')
});

var btnNotifications = document.getElementById('btnNotifications');
if (btnNotifications) {
  btnNotifications.addEventListener('click', async () => {
    await notifications.init();
  });
}

var btnStopNotifications = document.getElementById('btnStopNotifications');
if (btnStopNotifications) {
  btnStopNotifications.addEventListener('click', () => {
    notifications.disableBrowserNotifications();
  });
}

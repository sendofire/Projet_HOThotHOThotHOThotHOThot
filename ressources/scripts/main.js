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

var O_temp_hist_ext = new TemperatureHistory('myChart', 50);
var O_temp_hist_int = new TemperatureHistory('myChart__int', 50);
var notifications = new AlertNotifications({
  historyElement: document.getElementById('alertList'),
  dialogElement: document.getElementById('alertDialog'),
  toastContainer: document.getElementById('toastContainer')
});

var temp = new Temperature(
  "case_ext", "temp_desc_ext", O_temp_hist_ext,
  "case_int", "temp_desc_int", O_temp_hist_int,"minJourExt", "maxJourExt",
  "minJourInt", "maxJourInt",
  notifications
);

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

//setInterval(temp.change_value, 200);
setInterval(() => temp.get_data(), 1500);

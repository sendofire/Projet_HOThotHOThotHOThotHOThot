import { Temperature } from './temperature.js';
import { TemperatureHistory } from './history.js';
import { TabsManual } from './tabs_manual.js';

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service_worker.js')
      .then(reg => {
        console.log('[PWA] Service Worker enregistré :', reg.scope);

        // Notifie l'utilisateur si une mise à jour est disponible
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateBanner();
            }
          });
        });
      })
      .catch(err => console.error('[PWA] Échec de l\'enregistrement SW :', err));
  });
}

let deferredInstallPrompt = null;

function createInstallButton() {
  if (document.getElementById('btn-install')) return;

  const btn = document.createElement('button');
  btn.id = 'btn-install';
  btn.className = 'button btn-install';
  btn.textContent = 'Installer l\'application';
  btn.setAttribute('aria-label', 'Installer l\'application sur cet appareil');

  btn.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      // Chrome/Edge : prompt native disponible
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      console.log('[PWA] Choix utilisateur :', outcome);
      deferredInstallPrompt = null;
      btn.remove();
    } else {
      showManualInstallTip();
    }
  });

  const headerDiv = document.querySelector('header > div > div');
  if (headerDiv) {
    headerDiv.insertAdjacentElement('afterend', btn);
  } else {
    document.querySelector('header').appendChild(btn);
  }
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  console.log('[PWA] beforeinstallprompt reçu — prompt native disponible');
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('btn-install');
  if (btn) btn.remove();
  deferredInstallPrompt = null;
  console.log('[PWA] Application installée avec succès.');
});

function showManualInstallTip() {
  if (document.getElementById('install-tip')) return;
  const tip = document.createElement('div');
  tip.id = 'install-tip';
  tip.setAttribute('role', 'dialog');
  tip.setAttribute('aria-modal', 'true');
  tip.innerHTML = `
    <div id="install-tip-box">
      <strong>Installer l'application</strong>
      <ul>
        <li><b>Chrome (bureau) :</b> bouton <i>« Install »</i> avec une icône ↓ à droite de la barre d'adresse</li>
        <li><b>Edge (bureau) :</b> bouton <i>« App available »</i> avec une icône + à droite de la barre d'adresse</li>
        <li><b>Chrome (Android) :</b> menu ⋮ → "Ajouter à l'écran d'accueil"</li>
        <li><b>Safari (iOS) :</b> bouton Partager → "Sur l'écran d'accueil"</li>
      </ul>
      <button class="button" id="install-tip-close">Fermer</button>
    </div>
  `;
  document.body.appendChild(tip);
  document.getElementById('install-tip-close').addEventListener('click', () => tip.remove());
}

window.addEventListener('DOMContentLoaded', createInstallButton);

function showUpdateBanner() {
  if (document.getElementById('update-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'update-banner';
  banner.setAttribute('role', 'status');
  banner.innerHTML = `
    <span>Une mise à jour est disponible.</span>
    <button id="btn-update" class="button">Recharger</button>
  `;
  document.body.prepend(banner);

  document.getElementById('btn-update').addEventListener('click', () => {
    window.location.reload();
  });
}

function sendTempDataToSW(extValue, intValue) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_TEMP_DATA',
      payload: {
        capteurs: [
          {
            type: 'Thermique',
            Nom: 'Exterieur',
            Valeur: String(extValue),
            Timestamp: Math.floor(Date.now() / 1000)
          },
          {
            type: 'Thermique',
            Nom: 'Interieur',
            Valeur: String(intValue),
            Timestamp: Math.floor(Date.now() / 1000)
          }
        ]
      }
    });
  }
}

var temp_hist     = new TemperatureHistory('myChart', 50);
var temp_hist_int = new TemperatureHistory('myChart__int', 50);

var temp = new Temperature(
  -10, 40,
  'case',     'funny_sentence',     temp_hist,
  'case_int', 'funny_sentence_int', temp_hist_int
);

temp.newRandomArray();

let swSyncCounter = 0;
setInterval(() => {
  temp.change_value();
  swSyncCounter++;

  if (swSyncCounter % 5 === 0) {
    const extVal = temp.A_dummy_data[temp.I_temp];
    const intVal = temp.A_dummy_data_int[temp.I_temp_int];
    sendTempDataToSW(extVal, intVal);
  }
}, 10000);
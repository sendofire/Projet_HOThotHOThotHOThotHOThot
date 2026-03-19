// exo 1

class RapportMeteoObservable {
    constructor() {
        this.temperature = [];
        this.classesObservateurs = [];
    }

    ajouterObservateur(observateur) {
        this.classesObservateurs.push(observateur);
    }

    addTemperature(newTemperature) {
        this.temperature.push(newTemperature);
    }

    sendNewTemperature(newTemperature) {
        this.addTemperature(newTemperature);
        this.classesObservateurs.forEach(observateur => {
            observateur.update(this.temperature);
        });

    }
}


class TemperatureTempsReel {
    constructor(temperatureElement) {
        this.temperatureElement = temperatureElement;
    }

    update(temperature) {
        this.temperatureElement.textContent = temperature[temperature.length - 1] + "°C";
    }
}

class HistoriqueTemperatures {
    constructor(historiqueElement, TemperaturesElements) {
        this.historiqueElement = historiqueElement;
        this.jsonData = null;
        this.loadTemperatures();
    }

    async loadTemperatures() {
        try {
            const response = await fetch('ressources/scripts/temps.json');
            this.jsonData = await response.json();
            this.temperatures = [];

            this.jsonData.capteurs.forEach(capteur => {
                this.temperatures.push(parseInt(capteur.Valeur));
            });
            this.historiqueElement.textContent = this.temperatures.join("°C, ") + "°C, ";
        } catch (error) {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        }
    }

    update(temperature) {
        this.displayHistorique(temperature);
    }
    displayHistorique(temperature) {
        this.historiqueElement.textContent += temperature[temperature.length - 1] + "°C, ";
    }
}

class AlerteTemperature {
    constructor(messageElement, temperatureElement) {
        this.messageElement = messageElement;
        this.temperatureElement = temperatureElement;
    }

    update(temperature) {
        this.checkAlerte(temperature);
    }

    checkAlerte(temperature) {
        const temp = temperature[temperature.length - 1];
        this.temperatureElement.removeAttribute("class");
        if (temp <= 0) {
            this.temperatureElement.setAttribute("class", "bleu");
            this.messageElement.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        } else if (temp <= 20) {
            this.temperatureElement.setAttribute("class", "vert");
            this.messageElement.textContent = "";
        } else if (temp <= 30) {
            this.temperatureElement.setAttribute("class", "orange");
            this.messageElement.textContent = "";
        } else {
            this.temperatureElement.setAttribute("class", "rouge");
            this.messageElement.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
    }
}


const rapportMeteo = new RapportMeteoObservable();

const O_temp = document.getElementById("temperature");
const O_message = document.getElementById("message");
const O_liste = document.getElementById("listeHistorique");

const temperatureTempsReel = new TemperatureTempsReel(O_temp);
const historiqueTemperatures = new HistoriqueTemperatures(O_liste);
const alerteTemperature = new AlerteTemperature(O_message, O_temp);

rapportMeteo.ajouterObservateur(temperatureTempsReel);
rapportMeteo.ajouterObservateur(historiqueTemperatures);
rapportMeteo.ajouterObservateur(alerteTemperature);
setInterval(() => {
    rapportMeteo.sendNewTemperature(Math.floor(Math.random() * 50) - 10);
}, 2000)

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');
function switchTab(oldTab, newTab) {
    oldTab.setAttribute('aria-selected', 'false');
    oldTab.setAttribute('tabindex', '-1');
    oldTab.classList.remove('active');

    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.classList.add('active');
    newTab.focus();

    panels.forEach(panel => {
        if (panel.id === newTab.getAttribute('aria-controls')) {
            panel.classList.remove('hidden');
            panel.removeAttribute('hidden');
        } else {
            panel.classList.add('hidden');
            panel.setAttribute('hidden', '');
        }
    });
}

tabs.forEach(tab => {

    tab.addEventListener('click', (e) => {
        const currentTab = document.querySelector('[role="tab"][aria-selected="true"]');
        if (currentTab !== e.target) {
            switchTab(currentTab, e.target);
        }
    });

    tab.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabs).indexOf(e.target);
        let targetTab = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetTab = tabs[currentIndex + 1] || tabs[0];
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
        }
        else if (e.key === 'Home') {
            e.preventDefault();
            targetTab = tabs[0];
        }
        else if (e.key === 'End') {
            e.preventDefault();
            targetTab = tabs[tabs.length - 1];
        }

        if (targetTab) {
            switchTab(e.target, targetTab);
        }
    });
});



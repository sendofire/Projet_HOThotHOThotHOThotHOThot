export class Temperature{
    I_val_min;
    I_val_max;
    
    A_dummy_data = [];
    A_value_history = [];
    O_temp;
    I_temp = 0;
    O_sentence;
    hist_temp;
    O_min_temp;
    O_max_temp;
    notifier;
    lastAlertKey = null;

    A_dummy_data_int = [];
    A_value_history_int = [];
    O_temp_int;
    I_temp_int = 0;
    O_sentence_int;
    hist_temp_int;
    O_min_temp_int;
    O_max_temp_int;


    constructor(min, max,
            temp_box,     alert_box,     history_temp,
            temp_box_int, alert_box_int, history_temp_int,
            min_box = null, max_box = null,
            min_box_int = null, max_box_int = null,
            notifier = null){
        this.I_val_min = min;
        this.I_val_max = max;

        this.O_temp = document.getElementById(temp_box);
        this.O_sentence = document.getElementById(alert_box);
        this.hist_temp = history_temp;
        this.O_min_temp = min_box ? document.getElementById(min_box) : null;
        this.O_max_temp = max_box ? document.getElementById(max_box) : null;

        this.O_temp_int = document.getElementById(temp_box_int);
        this.O_sentence_int = document.getElementById(alert_box_int);
        this.hist_temp_int = history_temp_int;
        this.O_min_temp_int = min_box_int ? document.getElementById(min_box_int) : null;
        this.O_max_temp_int = max_box_int ? document.getElementById(max_box_int) : null;
        this.notifier = notifier;
    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    newRandomArray(){
        this.A_dummy_data = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
        this.A_dummy_data_int = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    }

    check_color(){
        let I_value = this.A_dummy_data[this.I_temp];
        let I_value_int = this.A_dummy_data_int[this.I_temp_int];

        if (I_value < 0){
            this.O_temp.setAttribute("class", "un");
            this.O_sentence.textContent = "banquise en vue !";
        }
        else if (I_value > 35){
            this.O_temp.setAttribute("class", "four");
            this.O_sentence.textContent = "Hot Hot Hot!";
        } else {
            this.O_temp.removeAttribute("class");
            this.O_sentence.textContent = "";
        }


        
        if (I_value_int < 0){
            this.O_temp_int.setAttribute("class", "un");
            this.O_sentence_int.textContent = "canalisations gelées, appelez SOS plombier et mettez un bonnet !";
        }
        else if (I_value_int < 12 && I_value_int >= 0){
            this.O_temp_int.setAttribute("class", "deux");
            this.O_sentence_int.textContent = "montez le chauffage ou mettez un gros pull !";
        }
        else if (I_value_int > 22 && I_value_int <= 50){
            this.O_temp_int.setAttribute("class", "tres");
            this.O_sentence_int.textContent = "Baissez le chauffage !";
        }
        else if (I_value_int > 50){
            this.O_temp_int.setAttribute("class", "four");
            this.O_sentence_int.textContent = "Appelez les pompiers ou arrêtez votre barbecue !";
        } else {
            this.O_temp_int.removeAttribute("class");
            this.O_sentence_int.textContent = "";
        }

        this.updateDailyBounds();
        this.emitAlertIfNeeded(I_value, "exterieur", "funny_sentence");
        this.emitAlertIfNeeded(I_value_int, "interieur", "funny_sentence_int");
    }

    updateDailyBounds(){
        if (this.O_min_temp) {
            this.O_min_temp.textContent = `Min du jour: ${Math.min(...this.A_dummy_data)}°C`;
        }

        if (this.O_max_temp) {
            this.O_max_temp.textContent = `Max du jour: ${Math.max(...this.A_dummy_data)}°C`;
        }

        if (this.O_min_temp_int) {
            this.O_min_temp_int.textContent = `Min du jour: ${Math.min(...this.A_dummy_data_int)}°C`;
        }

        if (this.O_max_temp_int) {
            this.O_max_temp_int.textContent = `Max du jour: ${Math.max(...this.A_dummy_data_int)}°C`;
        }
    }

    emitAlertIfNeeded(value, label, source){
        const key = `${label}:${value}`;

        if (value < 0 || value > 35) {
            if (this.lastAlertKey !== key) {
                this.lastAlertKey = key;

                if (this.notifier) {
                    this.notifier.addAlert({
                        value,
                        label,
                        source,
                    });
                }
            }
        }
    }

    change_value(){
        if (this.hist_temp && this.hist_temp_int){
            this.hist_temp.add_to_history(this.A_dummy_data, this.I_temp);
            this.hist_temp.refreshChart();
            this.hist_temp_int.add_to_history(this.A_dummy_data_int, this.I_temp_int);
            this.hist_temp_int.refreshChart();
        }

        this.O_temp.textContent = this.A_dummy_data[this.I_temp];
        this.O_temp_int.textContent = this.A_dummy_data_int[this.I_temp_int];
        this.check_color();

        const endReached = this.I_temp >= 19 || this.I_temp_int >= 19;

        this.I_temp = (this.I_temp + 1) % 20;
        this.I_temp_int = (this.I_temp_int + 1) % 20;

        if (endReached) {
            this.newRandomArray();
        }
    }
}
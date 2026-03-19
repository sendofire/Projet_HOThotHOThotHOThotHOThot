export class Temperature{
    A_dummy_data = []; 
    A_value_history = [];
    I_val_min;
    I_val_max;
    O_temp;
    I_temp = 0;
    O_sentence;
    hist_temp;

    constructor(min, max, temp_box, alert_box, history_temp){
        this.I_val_min = min;
        this.I_val_max = max;
        this.O_temp = document.getElementById(temp_box);
        this.O_sentence = document.getElementById(alert_box);
        this.hist_temp = history_temp;

    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    newRandomArray(){
        this.A_dummy_data = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    }

    check_color(){
        let I_value = this.A_dummy_data[this.I_temp];
        if (I_value <= 0){
            this.O_temp.setAttribute("class", "un");
            this.O_sentence.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        }
        else if (I_value <= 20){
            this.O_temp.setAttribute("class", "deux");
            this.O_sentence.textContent = "ㅤ";
        }
        else if (I_value <= 30){
            this.O_temp.setAttribute("class", "tres");
            this.O_sentence.textContent = "ㅤ";
        }
        else if (I_value <= 40){
            this.O_temp.setAttribute("class", "four");
            this.O_sentence.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
    }

    change_value(){
      if (this.hist_temp != null){
        this.hist_temp.add_to_history(this.A_dummy_data, this.I_temp);
        this.hist_temp.refreshChart();
      }
      this.O_temp.textContent = this.A_dummy_data[this.I_temp];
      this.check_color();
      if (this.I_temp >= 19){
        this.newRandomArray();
      }
      this.I_temp = (this.I_temp + 1) % 20;
    }
}
export class Temperature{
    A_fish = []; 
    A_value_history = [];
    I_val_min;
    I_val_max;
    O_element;
    I_caramel = 0;
    O_element2;
    hist_temp;

    constructor(min, max, temp_box, alert_box, history_temp){
        this.I_val_min = min;
        this.I_val_max = max;
        this.O_element = document.getElementById(temp_box);
        this.O_element2 = document.getElementById(alert_box);
        this.hist_temp = history_temp;

    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    newRandomArray(){
        this.A_fish = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    }

    check_color(){
        let I_value = this.A_fish[this.I_caramel];
        if (I_value <= 0){
            this.O_element.setAttribute("class", "un");
            this.O_element2.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        }
        else if (I_value <= 20){
            this.O_element.setAttribute("class", "deux");
            this.O_element2.textContent = "ㅤ";
        }
        else if (I_value <= 30){
            this.O_element.setAttribute("class", "tres");
            this.O_element2.textContent = "ㅤ";
        }
        else if (I_value <= 40){
            this.O_element.setAttribute("class", "four");
            this.O_element2.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
    }

    change_value(){
      if (this.hist_temp != null){
        this.hist_temp.add_to_history(this.A_fish, this.I_caramel);
        this.hist_temp.refreshChart();
      }
      this.O_element.textContent = this.A_fish[this.I_caramel];
      this.check_color();
      if (this.I_caramel >= 19){
        this.newRandomArray();
      }
      this.I_caramel = (this.I_caramel + 1) % 20;
    }
}
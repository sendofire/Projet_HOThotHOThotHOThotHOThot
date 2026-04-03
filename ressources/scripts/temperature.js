export class Temperature{
    I_val_min;
    I_val_max;
    
    A_dummy_data = [];
    A_value_history = [];
    O_temp;
    I_temp = 0;
    O_sentence;
    hist_temp;

    A_dummy_data_int = [];
    A_value_history_int = [];
    O_temp_int;
    I_temp_int = 0;
    O_sentence_int;
    hist_temp_int;

   S_websocket = "wss://ws.hothothot.dog:9502 ";
   O_socket = new WebSocket(this.S_websocket);


    /**
     * Constructor of the temperature class.
     * @param min
     * @param max
     * @param temp_box
     * @param alert_box
     * @param history_temp
     * @param temp_box_int
     * @param alert_box_int
     * @param history_temp_int
     */
    constructor(min, max,
            temp_box,     alert_box,     history_temp,
            temp_box_int, alert_box_int, history_temp_int){
        this.I_val_min = min;
        this.I_val_max = max;

        this.O_temp = document.getElementById(temp_box);
        this.O_sentence = document.getElementById(alert_box);
        this.hist_temp = history_temp;

        this.O_temp_int = document.getElementById(temp_box_int);
        this.O_sentence_int = document.getElementById(alert_box_int);
        this.hist_temp_int = history_temp_int;

        this.get_data();
    }

    get_data(){
        this.O_socket.onopen = () => {
            // the "send" method is mandatory because the socket will close the connection if it doesn't receive any message from the client within a certain time frame.
            this.O_socket.send("FIFTY THOUSAND FISH!!!!!!!!");
            console.log("WebSocket connection established.");
        };

        this.O_socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // get the temperature from the interior sensor
            console.log("int : " + data.capteurs[0].Valeur);

            //get the temperature from the exterior sensor
            console.log("ext : " + data.capteurs[1].Valeur);

            // NOTE : see the file "temp.json" for the structure of the data sent by the socket.

            // if (data.Nom === "interieur") {
            //     // this.A_dummy_data = data.values;
            //     // this.change_value();
            //     console.log("ext : " + data)
            // } else if (data.Nom === "exterieur") {
            //     // this.A_dummy_data_int = data.values;
            //     // this.change_value();
            //     console.log("int : " + data)
            // }

        };

        this.O_socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.O_socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };
    }

    /**
     * Returns a random integer between min (inclusive) and max (exclusive).
     * @param min The minimum value (inclusive).
     * @param max The maximum value (exclusive).
     * @returns {number} A random integer between min and max.
     */
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Generates two new random arrays of 20 integers each, with values between
     * I_val_min and I_val_max, and assigns them to A_dummy_data and A_dummy_data_int.
     */
    newRandomArray(){
        this.A_dummy_data = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
        this.A_dummy_data_int = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    }

    /**
     * Checks the current temperature values in A_dummy_data and A_dummy_data_int
     * at indices I_temp and I_temp_int, and updates the class of O_temp and O_temp_int,
     * as well as the text content of O_sentence and O_sentence_int, based on the temperature thresholds.
     */
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
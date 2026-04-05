export class Temperature{
  // variables set for random temperature value generation
  I_val_min;
  I_val_max;

  // variables set for the exterior temperature
  A_dummy_data = [];
  A_value_history = [];
  O_temp_ext;
  I_temp_ext = 0;
  O_sentence;
  O_hist_temp_ext;
  // variables set for the interior temperature
  A_dummy_data_int = [];
  A_value_history_int = [];
  O_temp_int;
  I_temp_int = 0;
  O_sentence_int;
  O_hist_temp_int;

  // variable for the websocket connection
  S_websocket = "wss://ws.hothothot.dog:9502";
  O_socket = new WebSocket(this.S_websocket);


  /**
   * Constructor of the temperature class.
   * @param min
   * @param max
   * @param temp_box_ext
   * @param alert_box
   * @param history_temp
   * @param temp_box_int
   * @param alert_box_int
   * @param history_temp_int
   */
  constructor(min, max, temp_box_ext,     alert_box,     history_temp,
          temp_box_int, alert_box_int, history_temp_int){
    this.I_val_min = min;
    this.I_val_max = max;

    // get the elements for exterior temp from the DOM
    this.O_temp_ext = document.getElementById(temp_box_ext);
    this.O_sentence = document.getElementById(alert_box);
    this.O_hist_temp_ext = history_temp;
    // get the elements for interior temp from the DOM
    this.O_temp_int = document.getElementById(temp_box_int);
    this.O_sentence_int = document.getElementById(alert_box_int);
    this.O_hist_temp_int = history_temp_int;
    // call the method to connect to the websocket and set up event handlers
    this.connect_socket();
    //this.get_data();
  }

  /**
   * Set up the connection to the WebSocket and define the event handlers for
   * open, error, and close events.
   */
  connect_socket(){
    this.O_socket.onopen = () => {
      // the "send" method is mandatory because the socket will close the
      // connection if it doesn't receive any message from the client within
      // a certain time frame.
      // The content of the message is arbitrary.
      this.O_socket.send("FIFTY THOUSAND FISH!!!!!!!!");
      console.log("WebSocket connection established.");
    };

    this.O_socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.O_socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  /**
  * Define event handlers for message, error, and close events.
  * When the connection is opened, it sends a message to the server.
  * TODO : update the desc for the message sent by the socket.
  * When a message is received, it parses the data and logs the temperature values from the interior and
  * exterior sensors.
  * It also handles errors and logs when the connection is closed.
  */
  get_data(){
    this.O_socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // get the temperature from the interior sensor
      console.log("int : " + data.capteurs[0].Valeur);
      this.change_int_temp_value(data.capteurs[0].Valeur)

      //get the temperature from the exterior sensor
      console.log("ext : " + data.capteurs[1].Valeur);
      this.change_ext_temp_value(data.capteurs[1].Valeur)

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
   * Checks the current temperature values in A_dummy_data and A_dummy_data_int
   * at indices I_temp and I_temp_int, and updates the class of O_temp and O_temp_int,
   * as well as the text content of O_sentence and O_sentence_int, based on the temperature thresholds.
   */
  check_color(){
      let I_value_ext = this.O_temp_ext.textContent;
      let I_value_int = this.O_temp_int.textContent;

      // TODO : make it use case statements
      if (I_value_ext < 0){
          this.O_temp_ext.setAttribute("class", "un");
          this.O_sentence.textContent = "banquise en vue !";
      }
      else if (I_value_ext > 35){
          this.O_temp_ext.setAttribute("class", "four");
          this.O_sentence.textContent = "Hot Hot Hot!";
      } else {
          this.O_temp_ext.removeAttribute("class");
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

  change_int_temp_value(int_temp){
    this.I_temp_int = int_temp;
    this.O_temp_int.textContent = this.I_temp_int;
  }

  change_ext_temp_value(ext_temp){
    this.I_temp_ext = ext_temp;
    this.O_temp_ext.textContent = this.I_temp_ext;
  }

/*  /!**
   * Returns a random integer between min (inclusive) and max (exclusive).
   * @param min The minimum value (inclusive).
   * @param max The maximum value (exclusive).
   * @returns {number} A random integer between min and max.
   *!/
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }*/

/*  /!**
   * Generates two new random arrays of 20 integers each, with values between
   * I_val_min and I_val_max, and assigns them to A_dummy_data and A_dummy_data_int.
   *!/
  newRandomArray(){
    this.A_dummy_data = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    this.A_dummy_data_int = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
  } */

  /*
  change_value(){
    if (this.O_hist_temp_ext && this.O_temp_hist_int){
      this.O_hist_temp_ext.add_to_history(this.A_dummy_data, this.I_temp_ext);
      this.O_hist_temp_ext.refreshChart();
      this.O_temp_hist_int.add_to_history(this.A_dummy_data_int, this.I_temp_int);
      this.O_temp_hist_int.refreshChart();
    }

    this.O_temp_ext.textContent = this.A_dummy_data[this.I_temp_ext];
    this.O_temp_int.textContent = this.A_dummy_data_int[this.I_temp_int];
    this.check_color();

    const endReached = this.I_temp_ext >= 19 || this.I_temp_int >= 19;

    this.I_temp_ext = (this.I_temp_ext + 1) % 20;
    this.I_temp_int = (this.I_temp_int + 1) % 20;

    if (endReached) {
      this.newRandomArray();
    }
  }
  */
}
export class Temperature{
  // variables set for the exterior temperature
  /**
   * The DOM element where the exterior temperature value will be displayed.
   */
  O_temp_ext;
  /**
   * The DOM element where the sentence related to the exterior temperature will be displayed.
   */
  O_sentence_ext;
  /**
   * The chart where the history of exterior temperature values will be displayed.
   */
  O_hist_temp_ext;
  // variables set for the interior temperature
  O_temp_int;
  /**
   * The DOM element where the sentence related to the interior temperature will be displayed.
   */
  O_sentence_int;
  /**
   * The chart where the history of interior temperature values will be displayed.
   */
  O_hist_temp_int;

  O_min_temp;
  O_max_temp;

  O_min_temp_int;
  O_max_temp_int;

  notifier;
  lastAlertKey = null;

  /**
   * The WebSocket URL for receiving temperature data from the server.
   * @type {string}
   */
  S_websocket = "wss://ws.hothothot.dog:9502";
  /**
   * The WebSocket object used to establish a connection with the server and receive temperature data.
   * @type {WebSocket}
   */
  O_socket = new WebSocket(this.S_websocket);


  /**
   * Constructor of the temperature class.
   * The constructor initializes the DOM elements for both interior and exterior temperatures,
   * sets up the WebSocket connection, and prepares the class to receive and display temperature data.
   * @param temp_box_ext The ID of the DOM element for displaying the exterior temperature.
   * @param alert_box_ext The ID of the DOM element for displaying the exterior temperature alert sentence.
   * @param history_temp_ext The chart where the history of exterior temperature values will be displayed.
   * @param temp_box_int The ID of the DOM element for displaying the interior temperature.
   * @param alert_box_int The ID of the DOM element for displaying the interior temperature alert sentence.
   * @param history_temp_int The chart where the history of interior temperature values will be displayed.
   */
  constructor(temp_box_ext,     alert_box_ext,     history_temp_ext,
          temp_box_int, alert_box_int, history_temp_int, min_box = null, max_box = null,
              min_box_int = null, max_box_int = null,
              notifier = null){

    // get the elements for exterior temp from the DOM
    this.O_temp_ext = document.getElementById(temp_box_ext);
    this.O_sentence_ext = document.getElementById(alert_box_ext);
    this.O_hist_temp_ext = history_temp_ext;

    this.O_min_temp = min_box ? document.getElementById(min_box) : null;
    this.O_max_temp = max_box ? document.getElementById(max_box) : null;

    // get the elements for interior temp from the DOM
    this.O_temp_int = document.getElementById(temp_box_int);
    this.O_sentence_int = document.getElementById(alert_box_int);
    this.O_hist_temp_int = history_temp_int;

    this.O_min_temp_int = min_box_int ? document.getElementById(min_box_int) : null;
    this.O_max_temp_int = max_box_int ? document.getElementById(max_box_int) : null;
    this.notifier = notifier;

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

      this.give_server_info("Fetching data from the server...");
    };

    this.O_socket.onerror = (error) => {
      console.error("WebSocket error:", error);

      this.give_server_info("Error connecting to the server. Please try again later.");
    };

    this.O_socket.onclose = () => {
      console.log("WebSocket connection closed.");
      this.give_server_info("Connection to the server closed. Please refresh the page to reconnect.");
    };
  }

  /**
  * Define event handlers for message, error, and close events.
  * When the connection is opened, it sends a message to the server.
  * When a message is received, it parses the data and updates the interior and
  * exterior temperature values accordingly.
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

      this.check_color();
    };

    this.O_socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.give_server_info("Error connecting to the server. Please try again later.");
    };

    this.O_socket.onclose = () => {
      console.log("WebSocket connection closed.");
      this.give_server_info("Connection to the server closed. Please refresh the page to reconnect.");
    };
  }

  /**
   * Check the current temperature values for both interior and exterior sensors
   * and update the class of the DOM elements and the corresponding sentences
   * based on the temperature thresholds.
   * For the exterior temperature:
   * - If the temperature is below 0, it sets the class to "un" and displays "banquise en vue !".
   * - If the temperature is above 35, it sets the class to "four" and displays "Hot Hot Hot!".
   * - Otherwise, it removes any class and clears the sentence.
   */
  check_color(){
    // get the current temperature values from the DOM elements
    let I_value_ext = this.O_temp_ext.textContent;
    let I_value_int = this.O_temp_int.textContent;

    // check the exterior temperature and update the class and sentence accordingly.
    if (I_value_ext < 0){
      this.O_temp_ext.setAttribute("class", "un");
      this.O_sentence_ext.textContent = "banquise en vue !";
    }
    else if (I_value_ext > 35){
      this.O_temp_ext.setAttribute("class", "four");
      this.O_sentence_ext.textContent = "Hot Hot Hot!";
    } else {
      this.O_temp_ext.removeAttribute("class");
      this.O_sentence_ext.textContent = "";
    }
    // check the interior temperature and update the class and sentence accordingly.
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

  /**
   * Update the interior temperature value in the DOM and add it to the history,
   * then refresh the chart to display the updated data.
   * @param I_int_temp The new interior temperature.
   */
  change_int_temp_value(I_int_temp){
    this.O_temp_int.textContent = I_int_temp;

    this.O_hist_temp_int.add_to_history(I_int_temp);
    this.O_hist_temp_int.refreshChart();
  }

  /**
   * Update the exterior temperature value in the DOM and add it to the history,
   * then refresh the chart to display the updated data.
   * @param I_ext_temp The new exterior temperature.
   */
  change_ext_temp_value(I_ext_temp){
    this.O_temp_ext.textContent = I_ext_temp;

    this.O_hist_temp_ext.add_to_history(I_ext_temp);
    this.O_hist_temp_ext.refreshChart();
  }

  /**
   * Print the information received from the server in the corresponding DOM
   * elements for both interior and exterior temperatures.
   * @param S_info
   */
  give_server_info(S_info){
    this.O_sentence_int.textContent = S_info;
    this.O_sentence_ext.textContent = S_info;
  }
}
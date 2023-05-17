import { Component } from '@angular/core';
import { GlobalModel } from './model/global.model';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // flag to check default status of state=AZ
  global: boolean;

  // Default state set as AZ
  state: string = 'Arizona';
  // State paramter used for POST request, keeping it separate from the GET API call
  state1: string;

  // // From global.model.ts, Object of our custom class
  data: GlobalModel;

  // Array of states useful in storing all states of US
  states: any[];
  
  // Array of states useful in storing all states of US (for POST API)
  states2: any[];

  // POST API Variables

  // Stores the start date input by user
  startDate: number;

  // Stores the end date input by user
  endDate: number;

  // Stores the state input by user
  stateSelect: string;

  // Total positive cases for the start date
  posStartDate: number = 0;
  // Total positive cases for the end date
  posEndDate: number = 0;
  // Total negative cases for the start date
  negStartDate: number = 0;
  // Total negative cases for the start date
  negEndDate: number = 0;

  // Positive cases for the start date
  posCasesStartDate: number = 0;
  // Positive cases for the end date
  posCasesEndDate: number = 0;
  // Negative cases for the start date
  negCasesStartDate: number = 0;
  // Negative cases for the start date
  negCasesEndDate: number = 0;

  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchStates();
  }
  
  // Fetches data on start of app, for AZ
  fetchData() {
    this.api.fetchData().subscribe((res: any) => {
      this.data.date = res[0]['date'];

      // Variables for finding the 7 day cases for Arizona (default)
      this.data.poscases = 0;
      this.data.negcases = 0;
      this.data.deathcases = 0;

      for(var i = 0; i<7; i++){

          // Loop through latest 7days (1st March 2021 to 7th March 2021)
          this.data.poscases += res[i]['positiveIncrease'];
          this.data.negcases += res[i]['negativeIncrease'];
          this.data.deathcases += res[i]['deathIncrease'];
        }
    });
  }

  // Function which is run at the start of app, initialising states array, for the dropdown option for States
  fetchStates() {
    this.states = ["Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    this.states2 = ["Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
}

  // Fetches data for the state chosen by user
  fetchDataByState(state: string){
    this.api.fetchDataByState(state).subscribe((res: any) => {
      this.data.date = res[0]['date'];

      // Variables for finding the 7 day cases for chosen state
      this.data.poscases = 0;
      this.data.negcases = 0;
      this.data.deathcases = 0;

      for(var i = 0; i<7; i++){
          // Loop through latest 7days (1st March 2021 to 7th March 2021)
          this.data.poscases += res[i]['positiveIncrease'];
          this.data.negcases += res[i]['negativeIncrease'];
          this.data.deathcases += res[i]['deathIncrease'];
        }

    });
  }

  // Function called when state is changed from default AZ to any other
  stateChanged(value: string){
    this.state = value;
    if(value == "Arizona"){
      // Default (no change)
      this.fetchData();
      this.global = true;
    }
    else{
      // Call function which fetches data for chosen state
      this.fetchDataByState(value);
      this.global = false;
    }
  }

  // POST API function, which calls functions to fetch data for the appropriate state and dates
  postData() {

    // Finding the total positive and negative cases for the start date input by user
    this.startDateData(this.stateSelect);
    // Finding the total positive and negative cases for the end date input by user
    this.endDateData(this.stateSelect);

    // "Div" element which is hidden until Request button is clicked
    document.getElementById("Results").style.display = "block";
  }

  // Function which fetches total positive cases data for the given date and state
  startDateData(state1: string){
    this.api.fetchStateDataByDates(state1, this.startDate).subscribe((res: any) => {

      // In case value is NA, equate it to 0
      if(res["positive"]>0)
        this.posStartDate = res["positive"] - res["positiveIncrease"];
      else
        this.posStartDate = 0
      
      // In case value is NA, equate it to 0
      if(res["negative"]>0)
        this.negStartDate = res["negative"] - res["negativeIncrease"];
      else
        this.negStartDate = 0

      this.posCasesStartDate = res["positiveIncrease"];
      this.negCasesStartDate = res["negativeIncrease"];

    });
  }

  // Function which fetches total negative cases data for the given date and state
  endDateData(state1: string){
    this.api.fetchStateDataByDates(state1, this.endDate).subscribe((res: any) => {
      console.log("2nd Call");

      // In case value is NA, equate it to 0
      if(res["positive"]>0)
        this.posEndDate = res["positive"];
      else
        this.posEndDate = 0
      
      // In case value is NA, equate it to 0
      if(res["negative"]>0)
        this.negEndDate = res["negative"];
      else
        this.negEndDate = 0
      
      this.posCasesEndDate = res["positiveIncrease"];
      this.negCasesEndDate = res["negativeIncrease"];

    });
  }

}

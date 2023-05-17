import { Component } from '@angular/core';
import { GlobalModel } from './model/global.model';
import { ApiService } from './api/api.service';

// npm install --save --legacy-peer-deps ng2-charts for charts
// npm install --save --legacy-peer-deps chart.js for additional charts

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

  // // From global.model.ts, Object of our custom class
  data: GlobalModel;

  // Array of states useful in storing all states of US
  states: any[];

  // For line chart
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp Label Line'
    }
  ];
  lineChartType: string = 'line'
  lineChartLabels: any[] = [
    'Label01', 'Label02', 'Label03'
  ];

  barChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp Label Line'
    }
  ];
  barChartType: string = 'bar'
  barChartLabels: any[] = [
    'Label01', 'Label02', 'Label03'
  ];

  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchStates();
    this.fetchDailyData(this.state);
  }
  
  // Fetches data on start of app, for AZ
  fetchData() {
    this.api.fetchData().subscribe((res: any) => {
      this.data.cases = res[0]['positiveIncrease'];
      this.data.date = res[0]['date'];
      this.data.totcases = res[0]['positive'];
      this.data.deaths = res[0]['death'];

      // For displaying chart at the start of app
      var cases = res.map((poscases: number) => poscases['positiveIncrease'])
      
      this.lineChartData = [
        {
          data: cases,
          label: 'Daily Cases'
        }
      ]
    });
  }

  // Function which is run at the start of app, initialising states array, for the dropdown option for States
  fetchStates() {
    this.states = ["Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  }

  // Fetches data for the state chosen by user
  fetchDataByState(state: string){
    this.api.fetchDataByState(state).subscribe((res: any) => {
      this.data.cases = res[0]['positiveIncrease'];
      this.data.date = res[0]['date'];
      this.data.totcases = res[0]['positive'];
      this.data.deaths = res[0]['death'];

      var cases = res.map((poscases: number) => poscases['positiveIncrease'])
      
      this.lineChartData = [
        {
          data: cases,
          label: 'Daily Cases'
        }
      ]

      this.barChartData = [
        {
          data: cases,
          label: 'Daily Cases'
        }
      ]

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

  // Function which maps and initialises labels for the charts according to state
  fetchDailyData(state: string) {
    this.api.fetchDailyData(state).subscribe((res: any) => {
  
      var labelnames = res.map((date: number) => date['date'])

      this.lineChartLabels = labelnames;
      this.barChartLabels = labelnames;


      var cases = res.map((poscases: number) => poscases['positiveIncrease']);

      this.barChartData = [
        {
          data: cases,
          label: 'Daily Cases'
        }
      ]

      this.lineChartData = [
        {
          data: cases,
          label: 'Daily Cases'
        }
      ]
    });
  }

}

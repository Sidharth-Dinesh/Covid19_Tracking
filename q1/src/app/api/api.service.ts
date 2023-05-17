import { Injectable } from "@angular/core";
import { HttpClient } from  "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    // Base URL

    baseurl = 'https://api.covidtracking.com/v1/states/';

    // Mapping States with their codes
    statenames = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "North Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "US Virgin Islands", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    statecodes = ["al", "ak", "as", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "gu", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "mp", "oh", "ok", "or", "pa", "pr", "ri", "sc", "sd", "tn", "tx", "vi", "ut", "vt", "va", "wa", "wv", "wi", "wy"];

    // Object to store the mapping
    obj = {}

    constructor(private http: HttpClient) {

        // Mapping (Eg: {"Arizona": "az"})
        for(var i = 0; i<this.statenames.length; i++){
            this.obj[this.statenames[i]] = this.statecodes[i]
        }
    }

    // Getting default data for Arizona on start of application
    fetchData(){
        return this.http.get(this.baseurl+ 'az/daily.json');
    }

    // Getting data for appropriate state as per selection
    fetchDataByState(state: string){

        return this.http.get(this.baseurl + this.obj[state] + '/daily.json');
    }

    // Data for graph which loads Arizona data by default on start of application
    fetchDailyData(state: string){

        return this.http.get(this.baseurl + this.obj[state] + '/daily.json');
    }

}
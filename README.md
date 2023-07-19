# Covid19_Tracking

The following is an API for data regarding the no of COVID cases in Arizona.
https://api.covidtracking.com/v1/states/az/daily.json

1. Using the live data from the above API, designed a user interface to show the daily rise and fall of the number of COVID cases in Arizona, using Angular for client-side programming. 

2. On the server-side, application had rest API which does the following actions:
    1.	On the get API call, return the number of positive, negative cases for Arizona in the last 7 days.
    2.	On post API, the user inputs the name of the state, the start date, and the end date.
  API gets data from the below COVID tracking API and returns the number of positive and negative cases for the state at that particular date.

Also created a filter to represent the data for different states.

Summary:
• Designed a user interface to show daily COVID cases in US using Angular & TypeScript for client-side programming
• Developed a C# .NET server side with REST APIs to GET the total cases for any state in the last week
• Implemented POST APIs with user input to query the positive & negative cases for any state at particular dates


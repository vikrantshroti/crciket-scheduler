import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import "tachyons";

const client = new ApolloClient({
  uri: "https://api.devcdc.com/cricket"
});

const query = gql`
  query getSchedule($type: String, $status: String, $page: Int) {
    schedule(type: $type, status: $status, page: $page) {
      seriesID
      currentinningsNo
      currentInningteamID
      currentInningsTeamName
      seriesName
      homeTeamName
      awayTeamName
      toss
      startEndDate
      matchStatus
      matchID
      matchType
      statusMessage
      matchNumber
      venue
      matchResult
      startDate
      playerOfTheMatch
      playerID
      firstInningsTeamID
      secondInningsTeamID
      thirdInningsTeamID
      fourthInningsTeamID
      matchScore {
        teamShortName
        teamID
        teamFullName
        teamScore {
          inning
          inningNumber
          battingTeam
          runsScored
          wickets
          overs
          runRate
          battingSide
          teamID
          battingTeamShortName
          declared
          folowOn
        }
      }
      teamsWinProbability {
        homeTeamShortName
        homeTeamPercentage
        awayTeamShortName
        awayTeamPercentage
        tiePercentage
      }
      isCricklyticsAvailable
      isLiveCriclyticsAvailable
      currentDay
      currentSession
      playing11Status
      isAbandoned
      rRunRate
      probable11Status
      IPLpolling {
        name
        isPolling
        display
        isCompleted
        isAuctionStarted
      }
      isFantasyAvailable
      hasStatistics
      hasPoints
    }
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.type = null;
    this.status = null;

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.type = "All";
    this.status = "upcoming";
    this.getData(this.type, this.status);
  }

  getData(type, status) {
    if (!type) {
      type = "All";
    }

    if (!status) {
      status = "upcoming";
    }

    client
      .query({
        query: query,
        variables: {
          type,
          status,
          page: 1
        }
      })
      .then(result => {
        console.log(result);
        this.setState({ data: result.data.schedule });
      })
      .catch(error => console.log(error));
  }

  fnOnClickType(type) {
    this.type = type;
    this.getData(this.type, this.status);
  }

  fnOnClickStatus(status) {
    this.status = status;
    this.getData(this.type, this.status);
  }

  render() {
    return (
      <React.Fragment>
        Scheduler
        <div class="ph3 mt4">
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib black"
            href="#0"
            onClick={() => {
              this.fnOnClickType("upcoming");
            }}
          >
            Upcoming
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib near-black"
            href="#0"
            onClick={() => {
              this.fnOnClickType("running");
            }}
          >
            Running
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib dark-gray"
            href="#0"
            onClick={() => {
              this.fnOnClickType("completed");
            }}
          >
            Completed
          </a>
        </div>
        <div class="ph3 mt4">
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib black"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("All");
            }}
          >
            All
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib near-black"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("International");
            }}
          >
            International
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib dark-gray"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("Domestic");
            }}
          >
            Domestic
          </a>
        </div>
        <ul class="list pl0 ml0 center mw5 ba b--light-silver br3">
          <li class="ph3 pv2 bb b--light-silver">Mackeral Tabby</li>
          {this.state.data &&
            this.state.data.map((item, index) => {
              return (
                <li key={index} class="ph3 pv2 bb b--light-silver">
                  {item.seriesID}
                </li>
              );
            })}
        </ul>
      </React.Fragment>
    );
  }
}

export default App;

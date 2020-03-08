import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import "tachyons";
import { query } from "./query";

const client = new ApolloClient({
  uri: "https://api.devcdc.com/cricket"
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.type = null;
    this.status = null;

    this.state = {
      data: null,
      page: 1
    };
  }

  componentDidMount() {
    this.type = "All";
    this.status = "upcoming";
    this.getData(this.type, this.status);
  }

  getData(type, status) {
    console.log("type status", type, status);
    console.log("page", this.state.page);

    client
      .query({
        query: query,
        variables: {
          type,
          status,
          page: this.state.page
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

  prevPage() {
    if (this.state.page === 1) {
      return;
    }

    const page = this.state.page;
    this.setState({ page: page - 1 });
    this.getData(this.type, this.status);
  }

  nextPage() {
    const page = this.state.page;
    this.setState({ page: page + 1 });
    this.getData(this.type, this.status);
  }

  render() {
    return (
      <React.Fragment>
        <div class="title">Scheduler</div>
        <div class="ph3 mt4 status">
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib black link"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("upcoming");
            }}
          >
            Upcoming
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib near-black"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("running");
            }}
          >
            Running
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib dark-gray"
            href="#0"
            onClick={() => {
              this.fnOnClickStatus("completed");
            }}
          >
            Completed
          </a>
        </div>
        <div class="ph3 mt4 type">
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib black"
            href="#0"
            onClick={() => {
              this.fnOnClickType("All");
            }}
          >
            All
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib near-black"
            href="#0"
            onClick={() => {
              this.fnOnClickType("International");
            }}
          >
            International
          </a>
          <a
            class="f6 link dim ba ph3 pv2 mb2 dib dark-gray"
            href="#0"
            onClick={() => {
              this.fnOnClickType("Domestic");
            }}
          >
            Domestic
          </a>
        </div>
        <ul class="list pl0 ml0 center mw6 ba b--light-silver br3">
          {this.state.data ? (
            this.state.data.map((item, index) => {
              return (
                <div class="list">
                  <div key={index} class="subList">
                    {item.seriesName}
                    <div>
                      {item.matchNumber} - {item.venue}
                    </div>
                    <div>{item.matchScore[0].teamFullName}</div>
                    <div>{item.matchScore[1].teamFullName}</div>
                    <div>{item.statusMessage}</div>
                    <div>
                      Date{" : "}
                      {new Date(item.startDate * 1000)
                        .toString()
                        .replace("GMT+0530 (India Standard Time)", "")}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No data found</div>
          )}
        </ul>
        <div class="mw8 center">
          <nav class="cf pa3 pa4-ns" data-name="pagination-next-prev">
            <a
              class="fl dib link dim black f6 f5-ns b pa2"
              href="#0"
              title="Previous"
              onClick={() => {
                this.prevPage();
              }}
            >
              &larr; Previous
            </a>
            <a
              class="fr dib link dim black f6 f5-ns b pa2"
              href="#0"
              title="Next"
              onClick={() => {
                this.nextPage();
              }}
            >
              Next &rarr;
            </a>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

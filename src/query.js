import { gql } from "apollo-boost";

export const query = gql`
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

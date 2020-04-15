//imports to call services
import axios from "axios";
// actions list
export const actions = {
  GET_CORONAVIRUS_INFO_START: "GET_CORONAVIRUS_INFO_START",
  GET_CORONAVIRUS_INFO_SUCCESS: "GET_CORONAVIRUS_INFO_SUCCESS",
  GET_CORONAVIRUS_INFO_FAILED: "GET_CORONAVIRUS_INFO_FAILED",
};

const getCoronavirusInfoStart = () => ({
  type: actions.GET_CORONAVIRUS_INFO_START,
});
const getCoronavirusInfoSuccess = (response) => ({
  type: actions.GET_CORONAVIRUS_INFO_SUCCESS,
  payload: response,
});

const getCoronavirusInfoFailed = (error) => ({
  type: actions.GET_CORONAVIRUS_INFO_FAILED,
  payload: error,
});

export const getCoronavirusInfo = (country) => {
  return (dispatch) => {
    dispatch(getCoronavirusInfoStart());
    let countryParam = "us";
    if (country !== "All") {
      countryParam = country;
    }
    //`https://api.covid19api.com/country/${countryParam}/status/confirmed`
    axios
      .get(
        `https://api.thevirustracker.com/free-api?countryTimeline=${countryParam}`
      )
      .then((response) => {
        if (!response.data.timelineitems) {
          dispatch(getCoronavirusInfoFailed({code: 'API ERROR', message: 'thevirustracker API response is not correct'}));
        } else {
          const data = response.data.timelineitems[0];
          const listKeys = Object.keys(data);
          const keysMonth = listKeys.slice(
            listKeys.length - 31,
            listKeys.length - 1
          );
          //const listKeys = Object.keys(data);
          const dataParsed = keysMonth.map((key, pos) => ({
            indexX: key.substring(0, 4),
            indexYDailyCases: data[key].new_daily_cases,
            indexYDailyDeaths: data[key].new_daily_deaths,
            indexYTotalCases: data[key].total_cases,
            indexYTotalRecoveries: data[key].total_recoveries,
            indexYTotalDeaths: data[key].total_deaths,
          }));
          dispatch(getCoronavirusInfoSuccess(dataParsed));
        }
      })
      .catch((error) => {
        dispatch(getCoronavirusInfoFailed(error));
      });
  };
};

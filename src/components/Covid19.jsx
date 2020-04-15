//basic import
import React from "react";
import { connect } from "react-redux";

import { Layout } from "antd";

//actions
import { getCoronavirusInfo } from "store/actions/coronavirus";

//Components
import BarChartComplete from "./graphics/BarChartComplete";
import LineChart from "./graphics/LineChart";

// "antd" elements
import { Spin, Alert, Radio, Checkbox } from "antd";
const { Sider } = Layout;

class Covid19 extends React.Component {
  constructor() {
    super();
    this.state = {
      indexY: [{ name: "indexYTotalCases", color: "#1890ff" }],
    };
  }

  componentDidMount = () => {
    const { getCovidInfo, country } = this.props;
    getCovidInfo(country);
  };

  onChange = (element) => {
    const { indexY } = this.state;
    if (element.target.checked) {
      indexY.push(element.target.value);
      this.setState({ indexY: indexY });
    } else {
      this.setState({
        indexY: indexY.filter(
          (value) => value.name !== element.target.value.name
        ),
      });
    }
  };

  render() {
    const { coronavirusInfo, loadingCovid, error } = this.props;
    const { indexY } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    let maxIndexYPos = 0;
    let maxIndexYValue = 0;
    indexY.forEach((index, pos) => {
      coronavirusInfo.forEach((data) => {
        if (data[index.name] > maxIndexYValue) {
          maxIndexYPos = pos;
          maxIndexYValue = data[index.name];
        }
      });
    });
    return (
      <Layout>
        {!error ? (
          loadingCovid ? (
            <Spin />
          ) : (
            <>
              {indexY.length === 1 ? (
                <BarChartComplete
                  indexY={indexY[0].name}
                  data={coronavirusInfo}
                  width={1000}
                  height={300}
                  top={20}
                  bottom={30}
                  left={40}
                  right={0}
                />
              ) : (
                <LineChart
                  data={indexY.length === 0 ? [] : coronavirusInfo}
                  indexY={indexY.length === 0 ? [] : indexY}
                  maxIndexYPos={maxIndexYPos}
                />
              )}

              <Sider>
                <Layout>
                  <Checkbox
                    style={{ paddingLeft: "8px" }}
                    value={{ name: "indexYDailyCases", color: "#EEB029" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYDailyCases") > -1
                    }
                  >
                    <span style={{ color: "#EEB029" }}>Daily cases</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYDailyDeaths", color: "#900C3F" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYDailyDeaths") > -1
                    }
                  >
                    <span style={{ color: "red" }}>Daily deaths</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalCases", color: "red" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalCases") > -1
                    }
                  >
                    <span style={{ color: "#1890ff" }}>Total Cases</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalRecoveries", color: "#009933" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalRecoveries") > -1
                    }
                  >
                    <span style={{ color: "#009933" }}>Total recoveries</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalDeaths", color: "black" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalDeaths") > -1
                    }
                  >
                    <span style={{ color: "black" }}>Total Deaths</span>
                  </Checkbox>
                </Layout>
              </Sider>
            </>
          )
        ) : (
          <Alert
            message={error.code}
            description={error.message}
            type="error"
          />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  coronavirusInfo: state.covidReducer.coronavirusInfo,
  loadingCovid: state.covidReducer.loadingCovid,
  error: state.covidReducer.errorCovid,
  country: state.newsReducer.country,
});

const mapDispatchToProps = (dispatch) => ({
  getCovidInfo: (country) => dispatch(getCoronavirusInfo(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Covid19);

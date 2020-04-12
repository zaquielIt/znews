//basic import
import React from "react";
import { connect } from "react-redux";

import { Layout } from "antd";

import coronavirus from "mockups/coronavirus.json";

//style
import "./Tabs.css";

//Components
import CardNew from "./CardNew";
import Tags from "./Tags";
import Covid19 from './Covid19';

import * as d3 from "d3";
import BarChartComplete from "./graphics/BarChartComplete";
import LineChart from "./graphics/LineChart";

// "antd" elements
import { Tabs, Spin, Empty, Badge, Alert } from "antd";
const { TabPane } = Tabs;

class Cards extends React.Component {
  tabChanged = (newTab) => {
    const { defaultValue, updateSelectedValue } = this.props;
    if (defaultValue !== newTab) {
      updateSelectedValue("tabNews", newTab);
    }
  };

  //render spin / empty view / news cards
  tabWithNews = (loadingNews, listNews) =>
    loadingNews || !listNews || !listNews.articles ? (
      <Spin />
    ) : listNews.articles.length === 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      listNews.articles.map((card, pos) => <CardNew key={pos} card={card} />)
    );

  parseCoronavirusData = () =>
    coronavirus.data.map((dayData, pos) => ({
      indexY:
        pos === 0
          ? dayData.Cases
          : dayData.Cases - coronavirus.data[pos - 1].Cases,
      indexX: dayData.Date.substring(5,10),
    }));

  getBarChart = () => {
    const dataParsed = this.parseCoronavirusData();
    const dataReduced = dataParsed.slice(
      dataParsed.length - 31,
      dataParsed.length
    );

    const dataReduced2 = dataParsed.slice(
      dataParsed.length - 62,
      dataParsed.length - 31
    );

    return (
      <BarChartComplete
        data={dataReduced}
        width={1000}
        height={300}
        top={20}
        bottom={30}
        left={40}
        right={0}
      />
    );
  };

  render() {
    const { defaultValue, loadingNews, news, error } = this.props;
    const dataParsed = this.parseCoronavirusData();
    return (
      <Tabs defaultActiveKey={defaultValue} onTabClick={this.tabChanged}>
        <TabPane
          tab={
            defaultValue === "topNews" ? (
              <Badge
                count={news && news.articles ? news.articles.length : 0}
                offset={[15, -5]}
                overflowCount={100}
              >
                Top news
              </Badge>
            ) : (
              "Top news"
            )
          }
          key="topNews"
        >
          {!error ? (
            this.tabWithNews(loadingNews, news)
          ) : (
            <Alert
              message={error.code}
              description={error.message}
              type="error"
            />
          )}
        </TabPane>
        <TabPane
          tab={
            defaultValue === "articles" ? (
              <Badge
                count={news && news.articles ? news.articles.length : 0}
                offset={[15, -5]}
                overflowCount={100}
              >
                Articles
              </Badge>
            ) : (
              "Articles"
            )
          }
          key="articles"
        >
          {!error ? (
            <>
              <Tags />
              {this.tabWithNews(loadingNews, news)}
            </>
          ) : (
            <Alert
              message={error.code}
              description={error.message}
              type="error"
            />
          )}
        </TabPane>
        <TabPane tab="Coronavirus graphics (special tab)" key="coronavirus">
          {!error ? (
            <Covid19 />
          ) : (
            <Alert
              message={error.code}
              description={error.message}
              type="error"
            />
          )}
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingNews: state.newsReducer.loadingNews,
  sources: state.newsReducer.sources,
  news: state.newsReducer.news,
  error: state.newsReducer.error,
});

export default connect(mapStateToProps)(Cards);

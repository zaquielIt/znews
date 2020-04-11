//basic import
import React from "react";
import { connect } from "react-redux";

//style
import "./Cards.css";

//Components
import CardNew from "./CardNew";
import Tags from "./Tags";

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

  render() {
    const { defaultValue, loadingNews, news, error } = this.props;
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

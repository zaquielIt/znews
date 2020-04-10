import React from "react";
import { connect } from "react-redux";
import "./Cards.css";
import { Card, Tabs, Spin, Empty, Tooltip, Badge, Alert } from "antd";
import Tags from "./Tags";

const { TabPane } = Tabs;
const { Meta } = Card;

class Cards extends React.Component {
  tabChanged = (newTab) => {
    const { defaultValue, updateSelectedValue } = this.props;
    if (defaultValue !== newTab) {
      updateSelectedValue("tabNews", newTab);
    }
  };

  tabWithNews = (loadingNews, listNews) =>
    loadingNews || !listNews || !listNews.articles ? (
      <Spin />
    ) : listNews.articles.length === 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      listNews.articles.map((card, pos) =>
        card.urlToImage && card.title ? (
          <Card
            key={pos}
            hoverable
            style={{ width: 240, height: 450 }}
            cover={
              card.urlToImage ? (
                <img alt={card.title} src={card.urlToImage} height="175" />
              ) : null
            }
          >
            <Meta
              title={
                <Tooltip title={card.title}>
                  <a href={card.url}>{card.title}</a>
                </Tooltip>
              }
              description={
                <div>
                  <span style={{ fontWeight: "bolder" }}>
                    {card.source.name}
                  </span>
                  <div>{card.description}</div>
                </div>
              }
              style={{ padding: "5px" }}
            />
          </Card>
        ) : null
      )
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
            this.tabWithNews(loadingNews, news)
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

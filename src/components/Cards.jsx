import React from "react";
import { connect } from "react-redux";
import "./Cards.css";
import { Card, Tabs, Spin, Empty, Tooltip, Badge } from "antd";
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

  tabWithNews = (listNews) =>
    listNews.map((card, pos) =>
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
                <span style={{ fontWeight: "bolder" }}>{card.source.name}</span>
                <div>{card.description}</div>
              </div>
            }
            style={{ padding: "5px" }}
          />
        </Card>
      ) : null
    );

  render() {
    const { defaultValue, loadingNews, news } = this.props;
    return (
      <Tabs defaultActiveKey={defaultValue} onTabClick={this.tabChanged}>
        <TabPane
          tab={
            defaultValue === "topNews" ? (
              <Badge
                count={news ? news.articles.length : 0}
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
          {loadingNews || !news ? (
            <Spin />
          ) : news.articles.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            this.tabWithNews(news.articles)
          )}
        </TabPane>
        <TabPane
          tab={
            defaultValue === "articles" ? (
              <Badge
                count={news ? news.articles.length : 0}
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
          {loadingNews || !news ? (
            <Spin />
          ) : news.articles.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <>
              <Tags />
              {this.tabWithNews(news.articles)}
            </>
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
});

export default connect(mapStateToProps)(Cards);

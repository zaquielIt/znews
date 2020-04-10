import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateRequestsNewsAPI,
  getNews,
  getSources,
  setCountry,
  setLanguage,
  setCategory,
  setSource,
  setTabnews,
} from "store/actions/news";
import './News.css';
import { languages, countries, categories } from "constants/api";
import Section from "components/Section";
import Cards from "components/Cards";
import { Layout, Timeline } from "antd";
const { Sider } = Layout;

class News extends Component {
  componentDidMount() {
    const { language, country, category, source, tabNews, tagsArticles, updateRequestsNews } = this.props;
    this.getSources(language, country, category);
    this.getNews(language, country, category, source, tabNews, tagsArticles);
    updateRequestsNews(2);
  }

  getSources = (language, country, category, source) => {
    const { getSourcesStart } = this.props;
    getSourcesStart(language, country, category, source);
  };

  getNews = (language, country, category, source, tabNews, tagsArticles) => {
    const { getNewsStart } = this.props;
    getNewsStart(language, country, category, source, tabNews, tagsArticles);
  };

  componentDidUpdate = (prevProps) => {
    const {
      language,
      country,
      category,
      source,
      tabNews,
      loadingNews,
      tagsArticles,
      updateRequestsNews
    } = this.props;
    if (
      language !== prevProps.language ||
      country !== prevProps.country ||
      category !== prevProps.category ||
      source !== prevProps.source ||
      tabNews !== prevProps.tabNews ||
      tagsArticles !== prevProps.tagsArticles
    ) {
      if (source !== prevProps.source || tagsArticles !== prevProps.tagsArticles || tabNews !== prevProps.tabNews) {
        if (loadingNews === prevProps.loadingNews) {
          this.getNews(language, country, category, source, tabNews, tagsArticles);
          updateRequestsNews(1);
        }
      } else {
        this.getSources(language, country, category);
        this.getNews(language, country, category, source, tabNews,tagsArticles);
        updateRequestsNews(2);
      }
    }
  };

  updateNewsParams = (section, newValue) => {
    const {
      setNewCountry,
      setNewLanguage,
      setNewCategory,
      setNewSource,
      setNewTab
    } = this.props;
    switch (section) {
      case "Languages":
        setNewLanguage(newValue);
        break;
      case "Countries":
        setNewCountry(newValue);
        break;
      case "Categories":
        setNewCategory(newValue);
        break;
      case "Sources":
        setNewSource(newValue);
        break;
      case "tabNews":
        setNewTab(newValue);
        break;
      default:
        break;
    }
  };

  render() {
    const {
      language,
      country,
      category,
      source,
      sources,
      loadingSources,
      tabNews,
    } = this.props;
    return (
      <>
        <Layout>
          <Layout>
            <Section
              title="Languages"
              data={languages}
              updateSelectedValue={this.updateNewsParams}
              defaultValue={language}
            />
            <Section
              title="Countries"
              data={countries}
              updateSelectedValue={this.updateNewsParams}
              defaultValue={country}
            />
            <Section
              title="Categories"
              data={categories}
              updateSelectedValue={this.updateNewsParams}
              defaultValue={category}
              disabled={tabNews === 'articles'}
            />
            <Section
              title="Sources"
              data={sources}
              defaultValue={source}
              updateSelectedValue={this.updateNewsParams}
              loadingSources={loadingSources}
            />
          </Layout>
          <Sider>
            <Timeline>
              <Timeline.Item>Choose your language</Timeline.Item>
              <Timeline.Item>Select your Country</Timeline.Item>
              <Timeline.Item>Indicate your category</Timeline.Item>
              <Timeline.Item>Pick your favourite source</Timeline.Item>
            </Timeline>
          </Sider>
        </Layout>
        <Cards
          defaultValue={tabNews}
          updateSelectedValue={this.updateNewsParams}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.newsReducer.language,
  country: state.newsReducer.country,
  category: state.newsReducer.category,
  source: state.newsReducer.source,
  sources: state.newsReducer.sources,
  loadingSources: state.newsReducer.loadingSources,
  loadingNews: state.newsReducer.loadingNews,
  tabNews: state.newsReducer.tabNews,
  tagsArticles: state.newsReducer.tagsArticles
});
const mapDispatchToProps = (dispatch) => ({
  getSourcesStart: (language, country, category) =>
    dispatch(getSources(language, country, category)),
  getNewsStart: (language, country, category, source, tabNews, tagsArticles) =>
    dispatch(getNews(language, country, category, source, tabNews, tagsArticles)),
  setNewCountry: (newCountry) => dispatch(setCountry(newCountry)),
  setNewLanguage: (newLanguage) => dispatch(setLanguage(newLanguage)),
  setNewCategory: (newCategory) => dispatch(setCategory(newCategory)),
  setNewSource: (newSource) => dispatch(setSource(newSource)),
  setNewTab: (newTab) => dispatch(setTabnews(newTab)),
  updateRequestsNews: (newRequests) => dispatch(updateRequestsNewsAPI(newRequests)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(News);

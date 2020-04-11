import React, { Component } from "react";
import { connect } from "react-redux";

//import news actions
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

//style
import "./NewsPage.css";

//constants
import { languages, countries, categories } from "constants/api";

//Components
import Section from "components/Section";
import Cards from "components/Cards";

//antd Elements
import { Layout, Menu, Tag, Typography  } from "antd";
const { SubMenu } = Menu;
const { Text } = Typography;

class NewsPage extends Component {
  //get "sources" and "news" with the initial values or values saved by the user
  componentDidMount() {
    const {
      language,
      country,
      category,
      source,
      tabNews,
      tagsArticles,
      updateRequestsNews,
    } = this.props;
    this.getSources(language, country, category);
    this.getNews(language, country, category, source, tabNews, tagsArticles);
    updateRequestsNews(2);
  }

  //get sources - call to redux action
  getSources = (language, country, category) => {
    const { getSourcesStart } = this.props;
    getSourcesStart(language, country, category);
  };

  //get news - call to redux action
  getNews = (language, country, category, source, tabNews, tagsArticles) => {
    const { getNewsStart } = this.props;
    getNewsStart(language, country, category, source, tabNews, tagsArticles);
  };

  //get "sources" and "news" with the new selected param by the user
  componentDidUpdate = (prevProps) => {
    const {
      language,
      country,
      category,
      source,
      tabNews,
      loadingNews,
      tagsArticles,
      updateRequestsNews,
    } = this.props;

    //get new data if some param has changed
    if (
      language !== prevProps.language ||
      country !== prevProps.country ||
      category !== prevProps.category ||
      source !== prevProps.source ||
      tabNews !== prevProps.tabNews ||
      tagsArticles !== prevProps.tagsArticles
    ) {
      //If has changed some param which it doesn't affect to the sources and news are not loading
      if (
        source !== prevProps.source ||
        tagsArticles !== prevProps.tagsArticles ||
        tabNews !== prevProps.tabNews
      ) {
        if (loadingNews === prevProps.loadingNews) {
          this.getNews(
            language,
            country,
            category,
            source,
            tabNews,
            tagsArticles
          );
          updateRequestsNews(1);
        }
      } else {
        //Has changed some param which affects to the sources list, so "sources" and "news" need to be updated
        this.getSources(language, country, category);
        this.getNews(
          language,
          country,
          category,
          source,
          tabNews,
          tagsArticles
        );
        updateRequestsNews(2);
      }
    }
  };

  //update redux param (this method call to redux actions)
  updateNewsParams = (section, newValue) => {
    const {
      setNewCountry,
      setNewLanguage,
      setNewCategory,
      setNewSource,
      setNewTab,
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

  //render method
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
            <Menu mode="inline" defaultOpenKeys={["subMenu-filters"]}>
              <SubMenu
                key="subMenu-filters"
                title={
                  <>
                    <Text strong>Filters </Text>
                    <Tag color="magenta" style={{ cursor: "pointer" }}>
                      Language: {language}
                    </Tag>
                    <Tag color="cyan" style={{ cursor: "pointer" }}>
                      Country: {country}
                    </Tag>
                    <Tag color="purple" style={{ cursor: "pointer" }}>
                      Category: {category}
                    </Tag>
                    <Tag color="gold" style={{ cursor: "pointer" }}>
                      Source: {source}
                    </Tag>
                  </>
                }
              >
                <Section
                  title="Languages"
                  data={languages}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={language}
                  color="magenta"
                />

                <Section
                  title="Countries"
                  data={countries}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={country}
                  color="cyan"
                />
                <Section
                  title="Categories"
                  data={categories}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={category}
                  disabled={tabNews === "articles"}
                  color="purple"
                />
                <Section
                  title="Sources"
                  data={sources}
                  defaultValue={source}
                  updateSelectedValue={this.updateNewsParams}
                  loadingSources={loadingSources}
                  color="gold"
                />
              </SubMenu>
            </Menu>
          </Layout>
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
  tagsArticles: state.newsReducer.tagsArticles,
});

const mapDispatchToProps = (dispatch) => ({
  getSourcesStart: (language, country, category) =>
    dispatch(getSources(language, country, category)),
  getNewsStart: (language, country, category, source, tabNews, tagsArticles) =>
    dispatch(
      getNews(language, country, category, source, tabNews, tagsArticles)
    ),
  setNewCountry: (newCountry) => dispatch(setCountry(newCountry)),
  setNewLanguage: (newLanguage) => dispatch(setLanguage(newLanguage)),
  setNewCategory: (newCategory) => dispatch(setCategory(newCategory)),
  setNewSource: (newSource) => dispatch(setSource(newSource)),
  setNewTab: (newTab) => dispatch(setTabnews(newTab)),
  updateRequestsNews: (newRequests) =>
    dispatch(updateRequestsNewsAPI(newRequests)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);

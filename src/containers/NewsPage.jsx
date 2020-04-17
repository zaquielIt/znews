//React imports
import React, { Component } from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate, withLocalize } from "react-localize-redux";

//import news actions
import {
  getNews,
  getSources,
  setCountry,
  setLanguage,
  setCategory,
  setSource,
  setTabnews,
} from "store/actions/news";

//import coronavirus actions
import { getCoronavirusInfo } from "store/actions/coronavirus";

//constants
import { languages, countries, categories } from "constants/api";

//Components
import FilterSection from "components/FilterSection";
import Tabs from "components/Tabs";

//style
import "./NewsPage.css";

//antd Elements
import { Layout, Menu, Tag, Typography } from "antd";
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
    } = this.props;
    this.getSources(language, country, category);
    this.getNews(language, country, category, source, tabNews, tagsArticles);
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
      //Update news or sources if user has updated one of the filters or tabs
      if (
        source !== prevProps.source ||
        JSON.stringify(tagsArticles) !==
          JSON.stringify(prevProps.tagsArticles) ||
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
      country,
      getCovidInfo,
    } = this.props;
    switch (section) {
      case "Languages":
        setNewLanguage(newValue);
        break;
      case "Countries":
        setNewCountry(newValue);
        getCovidInfo(newValue);
        break;
      case "Categories":
        setNewCategory(newValue);
        break;
      case "Sources":
        setNewSource(newValue);
        break;
      case "tabNews":
        if (newValue === "topNews" && country === "es") {
          setNewCountry("All");
        }
        setNewTab(newValue);
        break;
      default:
        break;
    }
  };

  //This method disable filter sections after check some conditions
  disableFilterSection = (section) => {
    const { country, category, tabNews, translate } = this.props;
    let disabledSection = { value: false, msg: null };
    switch (section) {
      case "languages":
        if (tabNews === "coronavirus") {
          disabledSection.value = true;
          disabledSection.msg = translate("Coronavirus tab doesn't allow this filter");
        } else if (country !== "All" || category !== "All") {
          disabledSection.value = true;
          disabledSection.msg =
            translate("newsPage_LanguageNotPriorized");
        }
        break;
      case "countries":
        if (tabNews === "articles") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledNotTopNews");
        }
        break;
      case "categories":
        if (tabNews !== "topNews") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledNotTopNews");
        }
        break;
      case "sources":
        if (tabNews === "coronavirus") {
          disabledSection.value = true;
          disabledSection.msg = translate("Coronavirus tab doesn't allow this filter");
        }
        break;
      default:
        break;
    }
    return disabledSection;
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
      translate,
    } = this.props;

    return (
      <>
        <Layout>
          <Layout>
            <Menu mode="inline" defaultOpenKeys={["subMenu-filters"]}>
              {/* Filter title with tags */}
              <SubMenu
                key="subMenu-filters"
                title={
                  <>
                    <Text strong style={{ marginRight: "10px" }}>
                      {translate("newsPage_filters")}
                    </Text>
                    <Tag color="magenta" style={{ cursor: "pointer" }}>
                      {translate("newsPage_language") + ": " + language}
                    </Tag>
                    <Tag color="cyan" style={{ cursor: "pointer" }}>
                      {translate("newsPage_country") + ": " + country}
                    </Tag>
                    <Tag color="purple" style={{ cursor: "pointer" }}>
                      {translate("newsPage_category") + ": " + category}
                    </Tag>
                    <Tag color="gold" style={{ cursor: "pointer" }}>
                      {translate("newsPage_source") + ": " + source}
                    </Tag>
                  </>
                }
              >
                {/*filter sections */}
                <FilterSection
                  sectionId="languages"
                  title={translate("newsPage_languages")}
                  data={languages}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={language}
                  color="magenta"
                  disabledSection={this.disableFilterSection("languages")}
                />

                <FilterSection
                  sectionId="countries"
                  title={translate("newsPage_countries")}
                  data={countries}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={country}
                  color="cyan"
                  disabledES={tabNews === "topNews" || tabNews === "articles"}
                  disabledSection={this.disableFilterSection("countries")}
                />
                <FilterSection
                  sectionId="categories"
                  title={translate("newsPage_categories")}
                  data={categories}
                  updateSelectedValue={this.updateNewsParams}
                  defaultValue={category}
                  color="purple"
                  disabledSection={this.disableFilterSection("categories")}
                />
                <FilterSection
                  sectionId="sources"
                  title={translate("newsPage_sources")}
                  data={sources}
                  defaultValue={source}
                  updateSelectedValue={this.updateNewsParams}
                  loadingSources={loadingSources}
                  color="gold"
                  disabledSection={this.disableFilterSection("sources")}
                />
              </SubMenu>
            </Menu>
          </Layout>
        </Layout>
        <Tabs
          defaultValue={tabNews}
          updateSelectedValue={this.updateNewsParams}
        />
      </>
    );
  }
}

//redux props
const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
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

//redux functions
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
  getCovidInfo: (country) => dispatch(getCoronavirusInfo(country)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(NewsPage));

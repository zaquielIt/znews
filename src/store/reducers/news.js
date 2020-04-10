import { actions } from "store/actions/news";
const initialState = {
  tagsArticles: ["coronavirus"],
  tabNews: "topNews",
  language: "en",
  country: "All",
  category: "All",
  source: "All",
  sources: null,
  loadingNews: false,
  news: null,
  loadingSources: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TAGS_ARTICLES:
      return {
        ...state,
        tagsArticles: action.payload,
      };
    case actions.SET_TABNEWS:
      return {
        ...state,
        tabNews: action.payload,
      };
    case actions.SET_SOURCE:
      return {
        ...state,
        source: action.payload,
      };
    case actions.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case actions.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case actions.GET_SOURCES_START:
      return {
        ...state,
        loadingSources: true,
        sources: null,
      };
    case actions.GET_SOURCES_SUCCESS:
      return {
        ...state,
        loadingSources: false,
        sources: action.payload,
        source: "All",
      };
    case actions.GET_SOURCES_FAILED:
      return {
        ...state,
        loadingSources: false,
        error: action.payload,
      };
    case actions.GET_NEWS_START:
      return {
        ...state,
        loadingNews: true,
        news: null,
      };
    case actions.GET_NEWS_SUCCESS:
      return {
        ...state,
        loadingNews: false,
        news: action.payload
      };
    case actions.GET_NEWS_FAILED:
      return {
        ...state,
        loadingNews: false,
        news: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

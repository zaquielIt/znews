// actions list
export const actions = {
  SET_LANGUAGE_APP: "SET_LANGUAGE_APP",
};

export const setLanguageApp = newLanguageApp => ({
  type: actions.SET_LANGUAGE_APP,
  payload: newLanguageApp
})

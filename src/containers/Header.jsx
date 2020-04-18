//React imports
import React from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate, setActiveLanguage } from "react-localize-redux";

//Antd components
import { PageHeader, Button, Select } from "antd";
import { GithubOutlined } from "@ant-design/icons";

//Components
import Clock from "react-live-clock";

//style
import "./Header.css";

const { Option } = Select;

class Header extends React.Component {

  render() {
    const { translate, setLanguage, languageApp } = this.props;

    //timezone to show the right hour
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (
      <PageHeader
        className="site-page-header"
        title="ZNEWS "
        subTitle={translate("header_title")}
        //github button
        tags={
          <div style={{ marginTop: "15px" }}>
            <Button
              size="small"
              type="dashed"
              icon={<GithubOutlined />}
              ghost
              shape="round"
              onClick={() => window.open("https://github.com/zaquihex/znews")}
            >
              Github
            </Button>
          </div>
        }
        //clock to show the hour od the user timezone
        extra={[
          <Select
            defaultValue={languageApp}
            style={{
              width: 100,
              color: "white",
              borderRight: "1px solid",
              marginTop: "5px",
            }}
            bordered={false}
            onChange={(newLanguage) => {
              setLanguage(newLanguage);
            }}
            key="extraBtn-language"
          >
            <Option key="en" value="en">English</Option>
            <Option key="es" value="es">Spanish</Option>
          </Select>,
          <div style={{ marginTop: "10px" }} key="extraBtn-clock">
            <Clock
              format={"dddd, MMMM Mo, YYYY, h:mm:ss A"}
              timezone={timezone}
              
            />
          </div>,
        ]}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLanguage: (newLanguage) => dispatch(setActiveLanguage(newLanguage))
})

const mapStateToProps = (state) => ({
  languageApp: state.commonReducer.languageApp,
  translate: getTranslate(state.localize)
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);

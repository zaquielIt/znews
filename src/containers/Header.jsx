//React imports
import React from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

//Antd components
import { PageHeader, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

//Components
import Clock from "react-live-clock";

//style
import "./Header.css";


class Header extends React.Component {
  render() {

    const { translate } = this.props;

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
          <div style={{ marginTop: "10px" }}>
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

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize)
});

export default connect(mapStateToProps)(Header);

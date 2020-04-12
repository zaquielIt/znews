import React from "react";
import { connect } from "react-redux";
import "./Header.css";

import { Tag, PageHeader, Button } from "antd";

import Clock from "react-live-clock";
import { GithubOutlined } from "@ant-design/icons";

class Header extends React.Component {
  render() {
    const { requestsNewsAPI } = this.props;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (
      <PageHeader
        className="site-page-header"
        title="ZNEWS"
        subTitle=" World News Page"
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
  requestsNewsAPI: state.newsReducer.requestsNewsAPI,
});

export default connect(mapStateToProps)(Header);

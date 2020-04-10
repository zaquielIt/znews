import React from "react";
import { connect } from "react-redux";
import "./Header.css";

import { Progress, PageHeader } from "antd";

class Header extends React.Component {
  render() {
    const { requestsNewsAPI } = this.props;
    console.log("requestsNewsAPI");
    console.log((requestsNewsAPI / 500) * 100);
    return (
      <PageHeader
        className="site-page-header"
        title="ZNEWS"
        subTitle=" Global News Page"
        extra={[
          <div style={{ width: 170 }}>
            <span>Global requests availables</span>
            <Progress
              percent={(requestsNewsAPI / 500) * 100}
              size="small"
              status="active"
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

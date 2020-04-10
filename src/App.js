import React, { Component } from "react";
import "./App.css";

import News from "./containers/News";
import { Layout, Typography, PageHeader } from "antd";
const { Text } = Typography;

const { Header, Footer, Content } = Layout;
//<DingtalkOutlined />
class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <PageHeader
            className="site-page-header"
            title="ZNEWS"
            subTitle=" Global News Page"
          />
        </Header>
        <Content className="site-layout-content">
          <News />
        </Content>
        <Footer className="znews-footer" style={{ textAlign: "center" }}>
          <Text type="secondary" style={{ float: "left" }}>
            Ant Design ©2018 Created by Ant UED
          </Text>
          <Text code>Developed by Zaquiel Rodriguez Arce</Text>
          <a href="https://newsapi.org" style={{ float: "right" }}>
            Powered by News API
          </a>
        </Footer>
      </Layout>
    );
  }
}

export default App;

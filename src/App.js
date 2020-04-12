//React import
import React, { Component } from "react";
//stye
import "./App.css";
//Containers and Components
import NewsPage from "./containers/NewsPage";
import HeaderContainer from "./containers/Header";
//"antd" elements
import { Layout, Typography } from "antd";

const { Text } = Typography;
const { Header, Footer, Content } = Layout;


class App extends Component {

  //Render basic App layouts
  render() {
    return (
      <Layout>
        <Header>
          <HeaderContainer />
        </Header>
        <Content className="site-layout-content">
          <NewsPage />
        </Content>
        <Footer style={{ textAlign: "center" }}>
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

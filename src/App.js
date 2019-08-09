import React, { Component } from "react";
import "./App.css";
import { Menu, Icon, Layout } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { browserHistory } from 'react-router'
const { Header, Content, Footer } = Layout;
import Home from "../src/page/home/Home";
import System from "../src/page/system/System";
import Project from "../src/page/project/Project";
import WeChat from "../src/page/wechat/WeChat";

let menu = [
    {
        name: "首页",
        path: "/",
        component: Home
    },
    {
        name: "项目",
        path: "/project",
        component: Project
    },
    {
        name: "体系",
        path: "/system",
        component: System
    },
    {
        name: "公众号",
        path: "/wechat",
        component: WeChat
    }
];

class App extends Component {
    state = {
        current: "/"
    };

    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });

        console.log("key:",e.key);
    };

    componentWillMount(){
        this.setState({
            current:location.pathname
        })
    }

    componentDidMount(){
        
    }
    render() {
        let menuArray = menu.map((item, index) => {
            return (
                <Menu.Item key={item.path}>
                    <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
            );
        });
        return (
            <BrowserRouter>
                <Layout>
                    <Header
                        style={{
                            position: "fixed",
                            zIndex: 1,
                            width: "100%",
                            backgroundColor: "#fff"
                        }}>
                        <div className="container">
                            <div className="logo" />
                            <Menu
                                mode="horizontal"
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                                style={{ lineHeight: "64px" }}>
                                {menuArray}
                            </Menu>
                        </div>
                    </Header>
                    <Content style={{ padding: "0 50px", marginTop: 64 }}>
                        <div className="container">
                            <Route path="/" exact component={Home} />
                            <Route path="/project" component={Project} />
                            <Route path="/system" component={System} />
                            <Route path="/wechat" component={WeChat} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </BrowserRouter>
        );
    }
    
}

export default App;

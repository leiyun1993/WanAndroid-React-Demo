import React, { Component } from "react";
import "./Project.css";
import { Tabs, List, Icon } from "antd";
import { _getProjectTree, _getProject } from "../../api/api";
import VisibilitySensor from "react-visibility-sensor";
const { TabPane } = Tabs;
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
let page = 1;

class Project extends Component {
    state = {
        tree: [],
        projectList: [],
        selectTabId: "",
        showLoading: false
    };
    render() {
        return (
            <div className="root">
                <Tabs
                    defaultActiveKey={this.state.selectTabId}
                    type="card"
                    onChange={this.onTabChange}>
                    {this.state.tree.map((item, index) => (
                        <TabPane tab={item.name} key={item.id}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.state.projectList}
                                renderItem={listItem => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <IconText
                                                type="user"
                                                text={listItem.author}
                                            />,
                                            <IconText
                                                type="clock-circle"
                                                text={listItem.niceDate}
                                            />
                                        ]}
                                        extra={
                                            <img
                                                width={60}
                                                height={60}
                                                alt="logo"
                                                src={listItem.envelopePic}
                                            />
                                        }>
                                        <List.Item.Meta
                                            title={
                                                <a
                                                    href={listItem.link}
                                                    target="_black">
                                                    {listItem.title}
                                                </a>
                                            }
                                        />
                                        {listItem.desc}
                                    </List.Item>
                                )}
                            />
                            <VisibilitySensor onChange={this.onChange}>
                                <div>
                                    {this.state.showLoading ? (
                                        <div className="loading">
                                            <Icon
                                                type="loading"
                                                style={{ marginRight: "5px" }}
                                            />
                                            加载中...
                                        </div>
                                    ) : null}
                                </div>
                            </VisibilitySensor>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        this.getProjectTree();
    }
    onTabChange = key => {
        console.log(key);
        this.setState({
            selectTabId: key
        });
        page = 1;
        this.getProject(key);
    };
    getProjectTree() {
        _getProjectTree().then(res => {
            this.setState({
                tree: res.data,
                selectTabId: String(res.data[0].id)
            });
            this.getProject(res.data[0].id);
        });
    }
    getProject(id) {
        _getProject(page, id).then(res => {
            this.setState({
                showLoading:true,
                projectList:
                    page == 1
                        ? res.data.datas
                        : this.state.projectList.concat(res.data.datas)
            });
            page++;
        });
    }
    onChange = isShow => {
        console.log(isShow, isShow && this.state.selectTabId);
        if (isShow && this.state.selectTabId) {
            this.getProject(this.state.selectTabId);
        }
    };
}

export default Project;

import React, { Component } from "react";
import "./WeChat.css";
import { _getWxChapters, _getWxArticle } from "../../api/api";
import { Tabs, Icon } from "antd";
import VisibilitySensor from "react-visibility-sensor";
const { TabPane } = Tabs;

let page = 1;
class WeChat extends Component {
    state = {
        chapters: [],
        selectID: "",
        articleList: [],
        showLoading: false,
        over: false
    };
    render() {
        return (
            <div className="root">
                <Tabs
                    tabPosition="left"
                    defaultActiveKey={this.state.selectID}
                    onChange={callback => this.onTabChange(callback)}>
                    {this.state.chapters.map(item => (
                        <TabPane tab={item.name} key={item.id}>
                            {this.state.articleList.map((item, index) => (
                                <div key={index} className="article">
                                    <a
                                        className="title"
                                        href={item.link}
                                        target="_black">
                                        {item.title}
                                    </a>
                                    <div className="type">
                                        <span className="type-name">
                                            作者：
                                        </span>
                                        <span className="author">
                                            {item.author}
                                        </span>
                                        <span className="type-name">
                                            分类：
                                        </span>
                                        <span className="author">
                                            {item.superChapterName}/
                                            {item.chapterName}
                                        </span>
                                        <span className="type-name">
                                            时间：
                                        </span>
                                        <span className="author">
                                            {item.niceDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <VisibilitySensor onChange={this.onChange}>
                                <div>
                                    {this.state.showLoading &&
                                    !this.state.over ? (
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
        this.getWxChapters();
    }
    onTabChange(key) {
        console.log(key);
        this.setState({
            selectID: key
        });
        page = 1;
        this.getWxArticle(key);
    }
    getWxChapters() {
        _getWxChapters().then(res => {
            this.setState({
                chapters: res.data,
                selectID: String(res.data[0].id)
            });
            page = 1;
            this.getWxArticle(res.data[0].id);
        });
    }
    getWxArticle(id) {
        _getWxArticle(id, page).then(res => {
            this.setState({
                showLoading: true,
                over: res.data.over,
                articleList:
                    page == 1
                        ? res.data.datas
                        : this.state.articleList.concat(res.data.datas)
            });
            page++;
        });
    }
    onChange = isShow => {
        console.log(isShow, this.state.selectID);
        if (isShow && this.state.selectID) {
            this.getWxArticle(this.state.selectID);
        }
    };
}

export default WeChat;

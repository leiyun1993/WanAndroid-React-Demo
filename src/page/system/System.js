import React, { Component } from "react";
import { _getSystemTree, _getSystemList } from "../../api/api";
import { Card, Icon, Tag } from "antd";
import VisibilitySensor from "react-visibility-sensor";
const { CheckableTag } = Tag;
let page = 0;

class System extends Component {
    state = {
        tree: [],
        childTree: [],
        selectID: "",
        selectChildID: "",
        articleList: [],
        showLoading:false,
        over:false
    };
    render() {
        return (
            <div className="root">
                <Card
                    title="一级分类"
                    headStyle={{ padding: "0 5px" }}
                    bodyStyle={{ padding: "5px" }}>
                    {this.state.tree.map(item => (
                        <CheckableTag
                            key={item.id}
                            color="blue"
                            checked={this.state.selectID == item.id}
                            onChange={checked =>
                                this.handleChange(item, checked)
                            }>
                            {item.name}
                        </CheckableTag>
                    ))}
                </Card>
                <Card
                    title="二级分类"
                    headStyle={{ padding: "0 5px" }}
                    bodyStyle={{ padding: "5px" }}>
                    {this.state.childTree.map(item => (
                        <CheckableTag
                            key={item.id}
                            color="blue"
                            checked={this.state.selectChildID == item.id}
                            onChange={checked =>
                                this.handleChildChange(item, checked)
                            }>
                            {item.name}
                        </CheckableTag>
                    ))}
                </Card>
                {this.state.articleList.map((item, index) => (
                    <div key={index} className="article">
                        <a className="title" href={item.link} target="_black">
                            {item.title}
                        </a>
                        <div className="type">
                            <span className="type-name">作者：</span>
                            <span className="author">{item.author}</span>
                            <span className="type-name">分类：</span>
                            <span className="author">
                                {item.superChapterName}/{item.chapterName}
                            </span>
                            <span className="type-name">时间：</span>
                            <span className="author">{item.niceDate}</span>
                        </div>
                    </div>
                ))}
                <VisibilitySensor onChange={this.onChange}>
                    <div>
                        {this.state.showLoading&&!this.state.over ? (
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
            </div>
        );
    }
    componentDidMount() {
        this.getSystemTree();
    }
    getSystemTree() {
        _getSystemTree().then(res => {
            console.log(res);
            this.setState({
                tree: res.data,
                childTree: res.data[0].children,
                selectID: res.data[0].id,
                selectChildID: res.data[0].children[0].id,
                over:false
            });
            page = 0;
            this.getSystemList(res.data[0].children[0].id);
        });
    }
    getSystemList(id) {
        // if(this.state.over)return
        _getSystemList(page, id).then(res => {
            this.setState({
                showLoading: true,
                over: res.data.over,
                articleList:
                    page == 0
                        ? res.data.datas
                        : this.state.articleList.concat(res.data.datas)
            });
            page++;
            
        });
    }
    handleChange(item, checked) {
        console.log(item, checked);
        if (checked) {
            this.setState({
                selectID: item.id,
                childTree: item.children,
                selectChildID: item.children[0].id,
                over:false
            });
            page = 0;
            this.getSystemList(item.children[0].id);
        }
    }
    handleChildChange(item, checked) {
        console.log(item, checked);
        if (checked) {
            this.setState({
                selectChildID: item.id,
                over:false
            });
            page = 0;
            this.getSystemList(item.id);
        }
    }
    onChange = isShow => {
        if (isShow && this.state.selectChildID) {
            this.getSystemList(this.state.selectChildID);
        }
    };
}

export default System;

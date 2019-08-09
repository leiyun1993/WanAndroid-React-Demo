import React, { Component } from "react";
import "./Home.css";
import { Carousel, Icon } from "antd";
import VisibilitySensor from "react-visibility-sensor";
import { _banner, _homeArticle } from "../../api/api";

class Home extends Component {
    state = {
        bannerList: [],
        page: 0,
        articleList: []
    };
    render() {
        let banner = this.state.bannerList.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item.imagePath} alt="" />
                </div>
            );
        });
        let article = this.state.articleList.map((item, index) => {
            return (
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
            );
        });
        return (
            <div className="root">
                <Carousel autoplay>{banner}</Carousel>
                {article}
                <VisibilitySensor onChange={this.onChange}>
                    <div className="loading">
                        <Icon type="loading" style={{ marginRight: "5px" }} />
                        加载中...
                    </div>
                </VisibilitySensor>
            </div>
        );
    }
    componentDidMount() {
        this.getBanner();
    }
    onChange = isShow => {
        if (isShow) {
            this.getArticle();
        }
    };
    async getBanner() {
        let res = await _banner();
        this.setState({
            bannerList: res.data
        });
    }
    async getArticle() {
        let res = await _homeArticle(this.state.page);
        this.setState({
            articleList:
                this.state.page == 0
                    ? res.data.datas
                    : this.state.articleList.concat(res.data.datas),
            page: ++this.state.page
        });

        console.log(this.state.page)
    }
}

export default Home;

import api from "../../src/api/baseApi";

export function _banner() {
    return api.get("/banner/json");
}

export function _homeArticle(page = 0) {
    return api.get(`/article/list/${page}/json`);
}

export function _getProjectTree() {
    return api.get(`/project/tree/json`);
}

export function _getProject(page = 1, id) {
    return api.get(`/project/list/${page}/json`, {
        cid: id
    });
}

export function _getSystemTree() {
    return api.get(`/tree/json`);
}

export function _getSystemList(page = 1, id) {
    return api.get(`/article/list/${page}/json`, {
        cid: id
    });
}

export function _getWxChapters() {
    return api.get(`/wxarticle/chapters/json`);
}

export function _getWxArticle(id, page) {
    return api.get(`/wxarticle/list/${id}/${page}/json`);
}
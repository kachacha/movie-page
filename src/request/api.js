// 刚刚封装的axios
import request from './axios';

// 1.获取（抓取）页面视频div信息
export const getDivInfo = (query) => {
    return request({
        url: '/zfeno-video/api/v1/search',
        method: 'get',
        params: query
    })
}

// 1.获取图片验证码
export const getHiToKoTo = () => {
    return request({
        url: 'https://international.v1.hitokoto.cn',
        method: 'get',
        origin: "*"
        // 图片验证码 response类型设置成blob，图片才能显示出来
        // responseType: "blob"
    })
}


// 2.获取手机验证码
export const getPhoneCode = (query) => {
    return request({
        url: '/user/messageCode',
        method: 'post',
        data: query
    })
}

// 3. 获取用户任务列表
export const getUserTask = (query) => {
    return request({
        url: '/task/select',
        method: 'get',
        params: query
    })
}
// 4. 搜索任务接口
export const queryTask = (query1, query2) => {
    return request({
        url: '/task/query',
        method: 'post',
        data: query1,
        params: query2
    })
}
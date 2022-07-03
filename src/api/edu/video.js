import request from '@/utils/request'

export default{
    //添加课时
    addVideo(eduVideo){
        return request({
            url:'/eduservice/video/addVideo',
            method:'post',
            data:eduVideo
        })
    },
    //修改课时
    updateVideo(eduVideo){
        return request({
            url:'/eduservice/video/updateVideo',
            method:'post',
            data:eduVideo
        })
    },
    //删除课时
    deleteVideo(videoId){
        return request({
            url:'/eduservice/video/deleteVideo/'+videoId,
            method:'get'
        })
    },
    //根据id查询课时
    getVideoById(videoId){
        return request({
            url:'/eduservice/video/getVideo/'+videoId,
            method:'get'
        })
    },
    //删除视频
    removeById(videoId){
        return request({
            url:'/eduvod/video/removeVideo/'+videoId,
            method:"delete"
        })
    }
}
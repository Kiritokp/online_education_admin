import request from '@/utils/request'

export default{
    //根据课程id获取所有的章节和小结
    getChapterVideo(courseId){
      return request({
          //url: `/eduservice/chapter/getChapterVideo/${courseId}`,
          url: '/eduservice/chapter/getChapterVideo/'+courseId,
          method: 'get'
      })
    },
    //添加章节
    addChapter(eduChapter){
      return request({
        url:'/eduservice/chapter/addChapter',
        method:'post',
        data: eduChapter
      })
    },
    //根据id查询章节
    getChapterById(chapterId){
      return request({
        url:`/eduservice/chapter/getChapter/${chapterId}`,
        method:'get'
      })
    },
    //修改章节
    updateChapter(eduChapter){
      return request({
        url:'/eduservice/chapter/updateChapter',
        method:'post',
        data:eduChapter
      })
    },
    //删除章节
    deleteChapter(chapterId){
      return request({
        url:`/eduservice/chapter/deleteChapter/${chapterId}`,
        method:'delete'
      })
    }

}
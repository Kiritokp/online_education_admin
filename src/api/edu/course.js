import request from '@/utils/request'

export default{
    //添加课程
    addCourseInfo(courseInfo){
      return request({
          url: '/eduservice/course/addCourseInfo',
          method: 'post',
          data: courseInfo
      })
    },
    //查询所有讲师
    findAllTeacher(){
      return request({
        url:'/eduservice/teacher/findAll',
        method:'get'
      })
    },
    //根据课程的id查询课程的基本信息
    getCourseInfoById(courseId){
      return request({
        url:`/eduservice/course/getCourseInfo/${courseId}`,
        method:'get'
      })
    },
    //修改课程信息
    updateCourseInfo(courseInfo){
     return request({
      url:'/eduservice/course/updateCourseInfo',
      method:'post',
      data: courseInfo
     })
    },
    //根据课程id查询最终确认信息
    getCoursePublishVo(courseId){
      return request({
        url:'/eduservice/course/getCoursePublishVo/'+courseId,
        method:'get'
      })
    },
    //根据id修改课程状态，最终发布课程
    publishCourse(courseId){
      return request({
        url:'/eduservice/course/publishCourse/'+courseId,
        method:'get'
      })
    },
    //获取课程列表
    getCourseList(){
      return request({
        url:'/eduservice/course/getCourseList',
        method:'get'
      })
    },
    //课程条件查询带分页
    getCoursePageList(current,limit,courseQuery){
      return request({
        url:`/eduservice/course/getCoursePageList/${current}/${limit}`,
        method:'post',
        data:courseQuery
      })
    },
    //根据课程id删除课程
    deleteCourseById(courseId){
      return request({
        url:'/eduservice/course/deleteCourse/'+courseId,
        method:'get'
      })
    }
}
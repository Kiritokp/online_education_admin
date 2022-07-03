import request from '@/utils/request'

export default{
    //课程分类列表
    getSubjectList(){
      return request({
          url: '/eduservice/subject/getAllSubject',
          method: 'get'
      })
    },
    //查询所有的一级分类
    getOneSubject(){
      return request({
        url:'/eduservice/subject/getAllOneSubject',
        method:'get'
      })
    },
    //根据一级分类的id查询所有的二级分类
    getTwoSubjectById(id){
      return request({
        url:`/eduservice/subject/getTwoSubject/${id}`,
        method:'get'
      })
    }
}
import request from '@/utils/request'

export default{
    //1讲师列表（条件查询分页）
    //current 当前页 limit每页记录数 teacherQuery条件对象
    getTeacherPageList(current,limit,teacherQuery){
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换为json进行传递到接口里面
            data: teacherQuery
        })
    },
    //根据id删除讲师
    deleteTeacherById(id){
        return request({
            url:`/eduservice/teacher/deleteTeacher/${id}`,
            method:'delete'
        })
    },
    //新增讲师
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method:'post',
            data: teacher
        })
    },
    //根据id查询到讲师
    getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/getTeacher/${id}`,
            method:'get'
        })
    },
    //修改讲师
    updateTeacher(teacher){
        return request({
            url:'/eduservice/teacher/updateTeacher',
            method:'post',
            data: teacher
        })
    }
}
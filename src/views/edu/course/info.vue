<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
  </el-form-item>

  <!-- 所属分类-->
  <el-form-item label="课程分类">
      <!-- 一级分类 -->
    <el-select
        v-model="courseInfo.subjectParentId"
        placeholder="一级分类" @change="subjectLevelOneChanged">
        <el-option
        v-for="subject in subjectOneList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
    <!-- 二级分类 -->
    <el-select 
        v-model="courseInfo.subjectId" 
        placeholder="二级分类">
    <el-option
        v-for="subject in subjectTwoList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
    </el-form-item>

  <!-- 课程魔法师 -->
    <el-form-item label="课程魔法师">

    <!--魔法师分类-->
    <el-select
        v-model="courseInfo.teacherId"
        placeholder="请选择">
        <el-option
        v-for="teacher in teacherList"
        :key="teacher.id"
        :label="teacher.name"
        :value="teacher.id"/>
    </el-select>

    </el-form-item>

  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
  </el-form-item>

  <!-- 课程简介-->
    <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>

  <!-- 课程封面-->
    <el-form-item label="课程封面">

    <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :action="BASE_API+'/eduoss/file/upload'"
        class="avatar-uploader">
        <img :src="courseInfo.cover" height="250px">
    </el-upload>

    </el-form-item>

  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
  </el-form-item>

  <el-form-item>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="savaOrUpdate">保存并下一步</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'  //引入组件

export default {
    //声明组件
    components: { Tinymce },
    data() {
        return{
            courseInfo:{
                title: '',
                subjectId: '',  //二级分类id
                subjectParentId:"", //一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/01.jpg',
                price: 0
            },
            BASE_API: process.env.BASE_API ,// 接口API地址
            saveBtnDisabled:false,
            teacherList:[], //封装所有的魔法师  
            subjectOneList:[],  //封装所有的一级分类   
            subjectTwoList:[],  //封装所有的二级分类 
            courseId:'',
            subjectOneId:'',
        }
    },
    created(){
        //获取路由的id值
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id         
        //调用根据id查询课程的方法
        this.getCourseInfoById() 
        //一级分类课程回显
        this.getOneSubject()
        //二级分类课程回显
        this.getTwoSbujectById()
      }else{
        //初始化所有魔法师
        this.findAllTeacher()
        //初始化一级分类
        this.getOneSubject()
      }      
    },
    methods:{
        //查询所有的一级分类
        getOneSubject(){
          subject.getOneSubject()
          .then(response=>{
            this.subjectOneList=response.data.oneSubjectList
          })
        },
        //先根据课程id查询课程信息，再根据一级分类的id查询所有的二级分类
        getTwoSbujectById(){
          course.getCourseInfoById(this.courseId)
          .then(response=>{
            this.courseInfo=response.data.courseInfoVo
              subject.getTwoSubjectById(this.courseInfo.subjectParentId)
            .then(response=>{
              this.subjectTwoList=response.data.twoSubjectList
          })
          })        
        },
        //根据课程id查询课程信息
        getCourseInfoById(){
          course.getCourseInfoById(this.courseId)
          .then(response=>{
            this.courseInfo=response.data.courseInfoVo
          })
        },
        //上传封面成功调用的方法
        handleAvatarSuccess(res,file){
            this.courseInfo.cover=res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //点击某个一级分类，触发change，显示对应的二级分类
        subjectLevelOneChanged(value){
            //value就是一级分类的id值(框架完成的！！！)
            console.log(value)
            //遍历所有的一级分类，包含一级和二级
            for(var i=0;i<this.subjectOneList.length;i++){
                //每一个一级分类
                var oneSubject=this.subjectOneList[i]
                //判断：所有的一级分类的id和点击的一级分类的id是否相同
                if(value===oneSubject.id){
                    //从一级分类里获取所有的二级分类
                    this.subjectTwoList=oneSubject.children
                    //把二级分类的id值清空
                    this.courseInfo.subjectId=''
                }
            }
        },
        //查询所有的一级分类
        getOneSubject(){
            subject.getSubjectList()
            .then(response=>{
                this.subjectOneList=response.data.list
            })
        },
        //查询所有的魔法师
        findAllTeacher(){
            course.findAllTeacher()
            .then(response=>{
                this.teacherList=response.data.items
            })
        },
        //添加课程
        addCourse(){
          course.addCourseInfo(this.courseInfo)
            .then(response=>{
                //提示
                this.$message({
                    type:'success',
                    message:'添加课程信息成功！'
                })
                //跳转到第二步,路由中携带本课程的id值
                 this.$router.push({path:'/course/chapter/'+response.data.courseId})
            })
        },
        //修改课程
        updateCourse(){
          course.updateCourseInfo(this.courseInfo)
          .then(response=>{
            //提示
                this.$message({
                    type:'success',
                    message:'修改课程信息成功！'
                })
                //跳转到第二步,路由中携带本课程的id值
                 this.$router.push({path:'/course/chapter/'+this.courseId})
          })          
        },
        savaOrUpdate(){
          //判断是添加还是修改
          if(this.$route.params.id ==null){
            //无id添加
            this.addCourse()
          }else{  //必须有else，否则出现bug！！！
            //有id修改
            this.updateCourse()            
          }
        }
    }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="banner.title"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="banner.sort" controls-position="right" sort="0"/>
      </el-form-item>

      <el-form-item label="图片地址">
        <el-input v-model="banner.imageUrl"/>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl"/>
      </el-form-item>

        <!-- 课程封面-->
    <el-form-item label="幻灯片">

    <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :action="BASE_API+'/eduoss/file/upload'"
        class="avatar-uploader">
        <img :src="banner.imageUrl" height="250px" >
    </el-upload>

    </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import banner from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Tinymce from '@/components/Tinymce'  //引入组件

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {
        title: '',
        sort: 0,
        imageUrl: '/static/01.jpg',
        linkUrl: '',
      },
      saveBtnDisabled:false,
      BASE_API:process.env.BASE_API, //获取dev.env.js里面的地址
      saveBtnDisabled: false ,// 保存按钮是否禁用
    }
  },
  created(){ //页面渲染之前执行的
    this.init()
  },

  watch:{  //监听
    $route(to,from){  //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }

  },

  methods: {
    //上传封面成功调用的方法
    handleAvatarSuccess(res,file){
            this.banner.imageUrl=res.data.url
    },
        //上传之前调用的方法
    beforeAvatarUpload(file){
            
    },    

    init(){
      if(this.$route.params && this.$route.params.id){  //判断路径中有id就修改
        //从路径中获取到id值
        const id=this.$route.params.id
        //调用根据id查询的方法
        this.getInfo(id)
      }else{
        this.banner.title= ''
        this.banner.sort=0
        this.banner.linkUrl=''
      }
    },
    //根据讲师id查询的方法，数据回显
    getInfo(id){
      banner.getBannerInfo(id)
      .then(response=>{
        this.banner=response.data.banner
      })
    },
    saveOrUpdate() {
      //判断是修改还是添加
      //根据banner是否有id
      if(!this.banner.id){
        //添加
        this.saveData()
      }else{
        //修改
        this.updateBanner()
      }
    },
    //修改banner的方法
    updateBanner(){
      banner.updateBanner(this.banner)
        .then(response=>{
          return this.$message({
            type:'success',
            message:'修改成功'
          })
        }).then(response=>{
          this.$router.push({path:'/banner/list'})
        }).catch((response)=>{
          this.$message({
            type:'error',
            message:'修改失败'
          })
        })
    },
    // 保存
    saveData() {
      banner.addBanner(this.banner)
      .then(response=>{
        return this.$message({
          type:'success',
          message:'添加成功'
        })
      }).then(response=>{
        this.$router.push({path:'/banner/list'})
      }).catch((response)=>{
        this.$message({
          type:'error',
          message:'添加失败'
        })
      })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
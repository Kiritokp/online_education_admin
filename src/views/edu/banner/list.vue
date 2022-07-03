<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="标题"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="80"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="100" align="center" />

      <el-table-column prop="imageUrl" label="图片地址"  align="center"/>

      <el-table-column prop="linkUrl" label="链接地址" width="500" align="center"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList" 
    />

  </div>
</template>

 
<script>
import banner from '@/api/edu/banner'

export default{
    data(){ //定义变量和初始值
        return{
          list: null,
          page:1, //当前页
          limit:10, //每页记录数
          bannerQuery:{}, //条件封装对象
          total:0,//总记录数
        }
    },
    created(){ //页面渲染之前执行的，一般调用methods定义的方法
      //调用
      this.getList()

    },
    methods:{ //创建就具体的方法，调用banner.js定义的方法
      //banner列表的方法
      getList(page=1){
        this.page=page
          banner.getBannerPageList(this.page,this.limit,this.bannerQuery)
          .then(response =>{//请求成功
            //response接口返回的数据
            this.list=response.data.rows
            this.total=response.data.total
          }) 
          .catch(error =>{//请求失败
            console.log(error)
          }) 
      },
      resetData(){
        this.bannerQuery={}
        this.getList()
      },
      //删除banner的方法
      removeDataById(id){
        console.log(id)
        this.$confirm('此操作将永久删除数据，是否继续？','提示',{
          confirmButttonText:'确定',
          cancelkButtonText:'取消',
          typeof:'warning'
        }).then(()=>{
          return banner.deleteBannerById(id)
        }).then(()=>{
          this.getList()
          this.$message({
            type:'success',
            message:'删除成功!'
          })
        }).catch((response)=>{ //失败
          if(response==='cancel'){
            this.$message({
              type:'info',
              message:'已取消删除'
            })
          }else{
            this.$message({
              type:'error',
              message:'删除失败'
            })
          }
        })
      }
    }
}

</script>
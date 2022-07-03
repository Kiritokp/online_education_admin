import request from '@/utils/request'

export default{
    //1banner列表（条件查询分页）
    //current 当前页 limit每页记录数 bannerrQuery条件对象
    getBannerPageList(current,limit,bannerQuery){
        return request({
            url: `/educms/banneradmin/pageBannerCondition/${current}/${limit}`,
            method: 'post',
            //bannerQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换为json进行传递到接口里面
            data: bannerQuery
        })
    },
    //根据id删除banner
    deleteBannerById(id){
        return request({
            url:`/educms/banneradmin/removeBanner/${id}`,
            method:'delete'
        })
    },
    //新增banner
    addBanner(banner){
        return request({
            url:`/educms/banneradmin/addBanner`,
            method:'post',
            data: banner
        })
    },
    //根据id查询到banner
    getBannerInfo(id){
        return request({
            url:`/educms/banneradmin/getBanner/${id}`,
            method:'get'
        })
    },
    //修改banner
    updateBanner(banner){
        return request({
            url:'/educms/banneradmin/editBanner',
            method:'post',
            data: banner
        })
    }
}
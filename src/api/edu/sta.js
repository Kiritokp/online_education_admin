import request from '@/utils/request'

export default {

  createStatistics(day) {
    return request({
      url: `/edustatistics/daily/statistics/${day}`,
      method: 'get'
    })
  },
  showChart(searchObj) {
    return request({
        url: `/edustatistics/daily/showChart/${searchObj.begin}/${searchObj.end}`,
        method: 'get'
    })
}
}
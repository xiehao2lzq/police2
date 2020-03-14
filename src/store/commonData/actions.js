//引入axios
import qs from "qs"
import axios from "axios"
export default{
  login({rootState,commit},params){//伪登录
    var params = JSON.stringify(params)
        axios.post("http://" +rootState.commonData.url+":9000/plat/login",params).then(res=>{
            if(res.data.code=="0100"){
              var data = res.data
              commit("LOGIN",data)//将数据提交给mutation
            }else{
              rootState.commonData.errorMsg.unshift(res.data.msg)
            }
      })
    },
    gainXqList({rootState,commit}){
        axios({
            method: 'get',
            url:"http://" +rootState.commonData.url+":9000/sjwl/webapi/xq/list",
            params: {
              areaId: 0,
              page: 1,
              limit: 10000
            },
            headers:{
              "Authorization":sessionStorage.getItem("Authorization"),
            }
          }).then(res=>{
            if(res.data.code=="1000"){
              commit("GAIN_XQ_LIST",res.data.data)//将数据提交给mutation
            }else{
              rootState.commonData.errorMsg.unshift(res.data.msg)
            }
          });
    }
}
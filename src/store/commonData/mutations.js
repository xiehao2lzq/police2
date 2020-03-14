export default {
    LOGIN(state,res){
        if(res.code==="0100"){//登录成功
            //state.success++ //成功提示
            var Authorization = `Bearer ${res.data.access_token}`
            var userId = res.data.userId
            sessionStorage.setItem("Authorization",Authorization)//token本地缓存
            sessionStorage.setItem("userId",userId)
            state.onceLogin = false;
        }else{//登录失败
            state.errorMsg.unshift(res.msg) 
        }
    },
    GAIN_XQ_LIST(state,res){
        var selectedArr = [];
        res.list.forEach(item => {
            selectedArr.push({
              value: item.xqCode,
              name: item.xqName
            });
          });
        sessionStorage.setItem('selectedArr',JSON.stringify(selectedArr))
        //console.log(JSON.stringify(selectedArr.slice(1)))
    },
    deleteNode(state,res){
        state.popList.forEach((item,index)=>{
            if(item.id==res.id){
                state.popList.splice(index,1)
            }
        })
    }
}
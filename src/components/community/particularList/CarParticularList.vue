<template>
  <div>
    <Header/>
    <div class="CarParticularList">
      <div class="leftTabBox boxColor">
        <div class="title clear">
          <p></p>
          <span>实有车辆列表</span>
        </div>
        <ul class="clear">
          <li
            v-for="(item,index) in tabArr"
            :key="index"
            @click="select(index)"
            :class="{selectedType:item.isSelected}"
          >
            <img :src="item.src" alt />
            <span v-show="index==0">{{item.text+"("+carNumInfo.carTotalNum+")"}}</span>
            <span v-show="index==1">{{item.text+"("+carNumInfo.permanentPersonCarNum+")"}}</span>
            <span v-show="index==2">{{item.text+"("+carNumInfo.flowPersonCarNum+")"}}</span>
          </li>
        </ul>
      </div>

      <div class="searchBox boxColor">
        <div>
          <div class="title clear">
            <p></p>
            <span>实有车辆</span>
          </div>
          <div class="inputBox">
            <div class="selectBox1">
              <span>小区：</span>
              <el-select v-model="community" placeholder="请选择">
                <el-option
                  v-for="item in communityList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="selectBox1">
              <span>居住身份：</span>
              <el-select v-model="liveType" placeholder="请选择">
                <el-option
                  v-for="item in liveTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="selectBox1">
              <span>车辆品牌：</span>
            </div>
            <div class="selectBox1">
              <el-input v-model="carBrandName" placeholder="车辆品牌"></el-input>
            </div>
            <div class="selectBox1">
              <span>车辆颜色：</span>
            </div>
            <div class="selectBox1">
              <el-input v-model="carColor" placeholder="车辆颜色"></el-input>
            </div>
            <!-- <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            </div>-->
            <div class="selectBox1">
              <li>
                <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
              </li>
            </div>
            <div class="selectBox1">
              <button @click="search(tabIndex)">查询</button>
              <button @click="reset">重置</button>
              <button>
                <i class="el-icon-document"></i>导出
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="tableBox boxColor">
        <div class="table2">
          <ul>
            <li v-for="item in tableData" :key="item.index">
              <img :src="item.image || src2" alt />
              <div class="rightInfo">
                <p>
                  <span>车牌号：</span>
                  <span style="fontSize:18px;fontWeight:900">{{item.carNum}}</span>
                </p>
                <p>
                  <span>车主姓名：</span>
                  <span style="fontSize:18px;fontWeight:900">{{item.personName}}</span>
                </p>
                <p>
                  <span>小区：</span>
                  {{item.xqName}}
                </p>
                <p>
                  <span>录入时间：</span>
                  {{item.checkinDate}}
                </p>
              </div>
            </li>
          </ul>
          <div class="page">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="12"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../../common/header2";
export default {
  components: {
    Header
  },
  data() {
    return {
      src: require("@static/image/person.png"),
      src2: require("@static/image/carNoImage.png"),
      communityList: [], //小区列表
      community: "", //选中的小区
      liveTypes: [
        {
          name: "业主车辆",
          value: 1
        },
        {
          name: "租户车辆",
          value: 3
        },
        {
          name: "常住人口车辆",
          value: 4
        }
      ],
      liveType: "",
      carColor: "",
      carBrandName: "",
      input: "",
      tableData: [],
      currentPage: 1,
      total: 1,
      tabArr: [
        {
          src: require("@static/image/carlist1.png"),
          text: "实有车辆",
          isSelected: true
        },
         {
          src: require("@static/image/carlist1.png"),
          text: "常住人口车辆",
          isSelected: false
        },
         {
          src: require("@static/image/carlist1.png"),
          text: "流动人口车辆",
          isSelected: false
        }
      ],
      tabIndex:0,//切换的标识
      carNumInfo:{}
    };
  },
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    if(this.$route.query.xqCode){
      this.community = this.$route.query.xqCode
    }
    this.communityList = JSON.parse(sessionStorage.getItem("selectedArr")); //为了防止刷新丢失从缓存中取
    this.listInfo2();
    this.carNum()
  },
  methods: {
    //新加的切换栏名称后面跟数量
    carNum(){
      this.$axios({
        method:"get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/baseInfo/new",
        params:{
          areaId:"0",
          xqCode:this.community,
        }
      }).then(res=>{
        if(res.data.code==1000){
          this.carNumInfo = res.data.data
        }
        console.log(res)
      })
    },
    search() {
      this.listInfo2();
    },
    reset() {
      /* this.liveType = "";
      this.carColor = "";
      this.carBrandName = "";
      this.input = "";
      this.community = "";
      this.currentPage = 1;
      this.listInfo2(); */
      this.select(this.tabIndex)
    },
    select(val) {
       this.tabIndex = val;
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
      /* 请求切换模块的数据 */
      switch (val) {
        case 0:
          this.liveType = ""
          this.listInfo2();
          break;
        case 1:
          this.liveType = 4;
          this.listInfo2();
          break;
        case 2:
          this.liveType = 3;
          this.listInfo2();
          break;
        default:
          break;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listInfo2();
    },
    listInfo2() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/car/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          carColor: this.carColor,
          liveType: this.liveType,
          carBrandName: this.carBrandName,
          likeStr:this.input
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
        //console.log(res);
        /*  var data = res.data.data;
        this.tableData = data.list; */
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.leftTabBox {
  width: 352px;
  height: 955px;
  //background: rgba(54, 54, 54, 1);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  .title {
    color: #ffffff;
  }
  float: left;
  ul {
    width: 324px;
    margin: 0 auto;
    overflow: hidden;
    .selectedType {
      background: rgba(61, 183, 237, 1);
    }
    li:first-child{
      width:324px;
      margin:30px 0;
    }
    li {
      width: 280px;
      margin:30px 44px 0;
      height: 68px;
      background: rgba(50, 136, 234, 1);
      border-radius: 5px;
     // margin: 30px auto;
      line-height: 68px;
      cursor: pointer;
      img {
        float: left;
        margin: 18px 20px 0 40px;
      }
      span {
        font-size: 20px;
      }
    }
  }
}
.searchBox {
  width: 1532px;
  height: 150px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  float: left;
  .title {
    color: #fff !important;
  }
  span {
    float: left;
    color: #fff;
  }
  .inputBox {
    margin-left: 5px;
  }
  .selectBox1 {
    float: left;
    overflow: hidden;
    margin-top: 20px;
    span {
      margin: 6px 0 0 20px;
    }
    button {
      width: 90px;
      height: 34px;
      background: rgba(61, 183, 237, 1);
      border-radius: 3px;
      border: 0;
      outline: 0;
      margin-left: 15px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
/* 公用部分 */
.title {
  margin-top: 13px;
  margin-left: 10px;
  font-size: 16px;
  p {
    width: 6px;
    height: 16px;
    float: left;
    background: linear-gradient(
      0deg,
      rgba(59, 169, 230, 1),
      rgba(95, 201, 251, 1)
    );
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    margin-right: 10px;
  }
  span {
    float: left;
    font-size: 16px;
    line-height: 16px;
  }
}

.tableBox {
  width: 1532px;
  height: 785px;
  float: left;
  margin: 19px 0 0 11px;
}
.table2 {
  height: 765px;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul {
  height: 705px;
  width: 100%;
  li {
    width: 480px;
    height: 160px;
    background: #4873D4;
    margin: 10px 0 0 15px;
    float: left;
    border-radius: 5px;
    img {
      float: left;
      width: 140px;
      height: 140px;
      margin: 10px 0 0 10px;
    }
    .rightInfo {
      float: left;
      margin-left: 40px;
      p {
        margin-top: 15px;
      }
    }
    p {
      color: #fff;
    }
  }
}
.page {
  width: 100%;
  margin-top: 10px;
  text-align: right;
}
</style>
<template>
  <div class="perceptionList">
    <div class="leftTabBox boxColor">
      <div class="title clear">
        <p></p>
        <span>数据感知</span>
      </div>
      <ul class="clear">
        <li
          v-for="(item,index) in tabArr"
          :key="index"
          @click="select(index)"
          :class="{selectedType:item.isSelected}"
        >
          <img :src="item.src" alt />
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>

    <div class="searchBox boxColor" :style="tabArr[1].isSelected?style:{}">
      <div v-if="tabArr[0].isSelected">
        <div class="title clear">
          <p></p>
          <span>出入记录</span>
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
            <span>出入类型：</span>
            <el-select v-model="access" placeholder="请选择">
              <el-option
                v-for="item in accessList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[1].isSelected">
        <div class="title clear">
          <p></p>
          <span>实时抓拍</span>
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
            <span>姓名：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="name" placeholder="请输入姓名"></el-input>
          </div>
          <div class="selectBox1">
            <span>性别：</span>
            <el-select v-model="sex" placeholder="请选择">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>眼镜：</span>
            <el-select v-model="glasses" placeholder="请选择">
              <el-option
                v-for="item in glassesList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>口罩：</span>
            <el-select v-model="mask" placeholder="请选择">
              <el-option
                v-for="item in maskList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
            <button @click="planRoad">
              <i class="el-icon-s-marketing"></i>行动轨迹
            </button>
            <!-- <button><i class="el-icon-location"></i>行动轨迹</button> -->
          </div>
        </div>
      </div>

      <div v-if="tabArr[2].isSelected">
        <div class="title clear">
          <p></p>
          <span>高频出入人员</span>
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
            <span>出入次数>=：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="num" placeholder="请输入次数"></el-input>
          </div>
          <div class="selectBox1">
            <span>时间：</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="selectBox1">
            <button @click="search">查询</button>
            <button @click="reset">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[3].isSelected">
        <div class="title clear">
          <p></p>
          <span>陌生人员列表</span>
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
            <span>出现次数：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="num" placeholder="输入次数"></el-input>
          </div>
          <div class="selectBox1">
            <span>年龄：</span>
            <el-select v-model="age" placeholder="请选择">
              <el-option
                v-for="item in ages"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="selectBox1">
            <li>
              <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
            </li>
          </div>
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>

      <div v-if="tabArr[4].isSelected">
        <div class="title clear">
          <p></p>
          <span>疑似迁出人员列表</span>
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
            <span>未感知时长>=天：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="day" placeholder="输入天数"></el-input>
          </div>
          <!-- <div class="selectBox1">
              <li>
                <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
              </li>
          </div>-->
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>


      <div v-if="tabArr[5].isSelected">
        <div class="title clear">
          <p></p>
          <span>疑似迁入人员列表</span>
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
            <span>连续15内被感知的天数>=：</span>
          </div>
          <div class="selectBox1">
            <el-input v-model="day" placeholder="请输入大于或等于8的数字"></el-input>
          </div>
          <div class="selectBox1">
            <span>性别：</span>
            <el-select v-model="sex" placeholder="请选择">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
           <div class="selectBox1">
            <span>年龄：</span>
            <el-select v-model="age" placeholder="请选择">
              <el-option
                v-for="item in ages"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- <div class="selectBox1">
              <li>
                <el-input v-model="input" placeholder="可输入关键字搜索"></el-input>
              </li>
          </div>-->
          <div class="selectBox1">
            <button @click="search(tabIndex)">查询</button>
            <button @click="reset(tabIndex)">重置</button>
            <button>
              <i class="el-icon-document"></i>导出
            </button>
          </div>
        </div>
      </div>



    </div>

    <!-- 实时列表 -->
    <!--  <div class="realTimeList boxColor" v-if="tabArr[0].isSelected">
      <div class="title clear">
        <p></p>
        <span>实时数据</span>
      </div>
      <ul>
        <RealTimeList v-for="item in peopleList" :key="item.timeStamp" :item="item" />
      </ul>
    </div>-->

    <div class="tableBox boxColor" v-if="tabArr[0].isSelected">
      <div class="table2">
        <el-table :data="tableData" height="770" style="width: 100%" @row-click="showDetial">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="personName" width="100%" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="电话" width="180"></el-table-column>
          <el-table-column prop="paperNum" width="200%" label="证件号码"></el-table-column>
          <el-table-column prop="xqName" label="小区"></el-table-column>
          <el-table-column prop="roomName" label="房号"></el-table-column>
          <el-table-column prop="liveType" label="居住身份"></el-table-column>
          <el-table-column prop="access" label="出入类型"></el-table-column>
          <el-table-column prop="deviceName" label="出入门禁"></el-table-column>
          <el-table-column prop="openTime" label="出入时间"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="tableBox boxColor" v-if="tabArr[1].isSelected" :style="style2">
      <div class="table2">
        <el-table :data="tableData" height="720" style="width: 100%" @row-click="showImg">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" width="100%" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="xqName" label="小区"></el-table-column>
          <el-table-column prop="country" label="国籍" width="200%"></el-table-column>
          <el-table-column prop="capTime" label="抓拍时间" width="250%"></el-table-column>
          <el-table-column prop="age" label="年龄段"></el-table-column>
          <el-table-column prop="eyeglass" label="是否戴眼镜"></el-table-column>
          <el-table-column prop="bmask" label="是否戴口罩"></el-table-column>
          <el-table-column prop="capDevice" label="抓拍位置"></el-table-column>
          <el-table-column label="操作">
            <img style="display:inline" src="@static/image/showImg.png" alt />
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="tableBox boxColor" v-if="tabArr[2].isSelected">
      <div class="table2 clear">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image" alt />
            <div class="rightInfo">
              <p>
                <span>姓名：</span>
                {{item.personName}}
              </p>
              <p>
                <span>人员类型：</span>
                {{item.personType}}
              </p>
              <p>
                <span>房屋信息：</span>
                {{item.xqName+item.houseName}}
              </p>
              <p style="cursor: pointer" @click="moreDetial(item.personId)">
                <span>出入次数：</span>
                {{item.senseNum}}
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

    <div class="tableBox boxColor" v-if="tabArr[3].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || src" alt />
            <div class="rightInfo">
              <p>
                <span>性别：</span>
                {{item.sex}}
              </p>
              <p>
                <span>年龄段：</span>
                {{item.age}}
              </p>
              <p>
                <span>小区：</span>
                {{item.xqName}}
              </p>
              <p style="cursor:pointer" @click="strangerDetial(item.personId)">
                <span>出入次数：</span>
                {{item.num}}
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

    <div class="tableBox boxColor" v-if="tabArr[4].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || src" alt />
            <div class="rightInfo">
              <p>
                <span>姓名：</span>
                {{item.name}}
              </p>
              <p>
                <span>房号：</span>
                {{item.xqName+item.houseName}}
              </p>
              <p>
                <span>未感知时长：</span>
                {{item.noSenceTime}}
              </p>
              <p>
                <span>末次抓拍时间：</span>{{item.lastCapTime}}
              </p>
            </div>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>


    <div class="tableBox boxColor" v-if="tabArr[5].isSelected">
      <div class="table2">
        <ul>
          <li v-for="item in tableData" :key="item.index">
            <img :src="item.image || src" alt />
            <div class="rightInfo">
              <p>
                <span>小区：</span>
                {{item.xqName}}
              </p>
              <p>
                <span>近15天内抓拍天数：</span>
                {{item.capDays}}
              </p>
              <p>
                <span>年龄段：</span>
                {{item.age}}
              </p>
              <p>
                <span>性别：</span>{{item.sex}}
              </p>
            </div>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 地图弹窗 -->
    <PopMap :locationArr="locationArr" ref="popMap" />
    <!-- 出入记录人的详情弹窗 -->
    <PopDetial :personId="personId" ref="popDetial"/>

    <!--高频出入人员弹窗  -->
    <PopHighAccess :gridData="gridData" ref="popHighAccess"/>
    <div class="image">
      <el-dialog  :visible.sync="dialogImageVisible">
        <img :src="img" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RealTimeList from "./realTimeList";
import PopMap from "./popMap";
import PopDetial from "./popDetial"
import PopHighAccess from "./popHighAccess"
export default {
  components: {
    RealTimeList,
    PopMap,
    PopDetial,
    PopHighAccess
  },
  data() {
    return {
      src: require("@static/image/person.png"),
      dialogImageVisible:false,
      img:"",
      allowPlanRoad: false, //允许规划路线
      day: "",
      style: {
        height: "150px"
      },
      style2: {
        height: "785px"
      },
      name: "", //姓名
      sexList: [
        //性别
        {
          name: "男",
          value: 1
        },
        {
          name: "女",
          value: 0
        }
      ],
      sex: "",
      glassesList: [
        //眼镜
        {
          name: "未戴眼镜",
          value: 0
        },
        {
          name: "戴眼镜",
          value: 1
        }
      ],
      glasses: "",
      maskList: [
        {
          name: "未戴口罩",
          value: 0
        },
        {
          name: "戴口罩",
          value: 1
        }
      ],
      mask: "",
      ages: [
        {
          name: "未成年",
          value: 0
        },
        {
          name: "青年",
          value: 1
        },
        {
          name: "中年",
          value: 2
        },
        {
          name: "老年",
          value: 3
        }
      ],
      age: "", //年龄
      communityList: [], //小区列表
      community: "", //选中的小区
      liveTypes: [
        {
          name: "业主",
          value: "1"
        },
        {
          name: "家庭成员",
          value: "2"
        },
        {
          name: "租户",
          value: "3"
        }
      ],
      liveType: "",
      accessList: [
        {
          name: "进门",
          value: "1"
        },
        {
          name: "出门",
          value: "0"
        }
      ],
      access: "",
      num: "", //出入次数
      tabIndex: 0, //切换tab栏
      input: "",
      tableData: [],
      locationArr: [], //行动轨迹坐标组
      currentPage: 1,
      total: 0,
      value1: [],
      //value: "",
      tabArr: [
        {
          src: require("@static/image/dataperson1.png"),
          text: "出入记录",
          isSelected: true
        },
        {
          src: require("@static/image/dataperson2.png"),
          text: "实时抓拍",
          isSelected: false
        },
        {
          src: require("@static/image/dataperson3.png"),
          text: "高频出入人员 ",
          isSelected: false
        },
        {
          src: require("@static/image/dataperson4.png"),
          text: "陌生人员感知 ",
          isSelected: false
        },
        {
          src: require("@static/image/dataperson5.png"),
          text: "疑似迁出人员",
          isSelected: false
        },
        {
          src: require("@static/image/dataperson5.png"),
          text: "疑似新增居住人员",
          isSelected: false
        }
      ],
      list: [],
      personId:"",//人员出入记录点击弹出的详情参数
      gridData:[],
    };
  },
  computed: {
    ...mapState({
      url: state => state.commonData.url
    })
    /*  ...mapState({
      peopleList: state => state.commonData.peopleList
    }) */
  },
  watch: {
    /* peopleList() {
      //监听
      if (this.tabIndex == 0) {
        this.listInfo1();
      }
    } */
  },
  created() {
    this.timer();
    this.communityList = JSON.parse(sessionStorage.getItem("selectedArr")); //为了防止刷新丢失从缓存中取
    //console.log(this.$route.query.tabIndex)
    //跳转来的判断
    if (this.$route.query.tabIndex == 0) {
      this.tabIndex = this.$route.query.tabIndex*1;
      this.community = this.$route.query.xqCode;
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[this.tabIndex].isSelected = true;
    } else if (this.$route.query.tabIndex == 1) {
      this.tabIndex = this.$route.query.tabIndex*1;//刷新之后是字符串，直接进来是数字
      this.community = this.$route.query.xqCode;
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[this.tabIndex].isSelected = true;
    }else if (this.$route.query.tabIndex == 3) {
      this.tabIndex = this.$route.query.tabIndex*1;//刷新之后是字符串，直接进来是数字
      this.community = this.$route.query.xqCode;
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[this.tabIndex].isSelected = true;
    }
    //console.log(this.tabIndex===1)
    this.search();
  },
  methods: {
    //点击高频人员的出入次数
    moreDetial(personId){
      this.$axios({
        method:'get',
        url:"http://" + this.url + ":9000/sjwl/webapi/person/sense/highAccess/info",
        params:{
          personId:personId,
          page:1,
          limit:10000,
        }
      }).then(res=>{
        if(res.data.code==1000){
          this.gridData = res.data.data.list
          this.$refs.popHighAccess.show()
          console.log(222)
        }
      })
    },
    //点击陌生人员的出入次数，数据格式类似，和高频公用一个容器
    strangerDetial(personId){
      this.$axios({
        method:'get',
        url:"http://" + this.url + ":9000/sjwl/webapi/person/stranger/list/info",
        params:{
          personId:personId,
          page:1,
          limit:10000,
        }
      }).then(res=>{
        if(res.data.code==1000){
          this.gridData = res.data.data.list
          this.$refs.popHighAccess.show()
          console.log(222)
        }
      })
    },
    //出入记录点击详细信息弹窗
    showDetial(row){
      //this.personId = row.personId
      this.$router.push({
        name:"PersonRecord",
        query:{
          id:row.personId
        }
      })
      //console.log(row)
    },
    //规划路线
    planRoad() {
      if (this.allowPlanRoad && this.locationArr.length) {
        this.$refs.popMap.close(1);
      } else {
        this.$store.state.commonData.errorMsg.unshift(
          "必须精确到个人的数据才可以显示轨迹"
        );
      }
    },
    timer() {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
    },
    reset() {
      this.allowPlanRoad = false;
      this.name = "";
      this.day = "";
      this.age = "";
      this.glasses = "";
      this.sex = "";
      this.mask = "";
      this.community = "";
      this.liveType = "";
      this.access = "";
      this.num = "";
      this.currentPage = 1;
      this.value1 = [];
      this.tableData = [];
      this.total = 0;
      this.search();
    },
    search() {
      switch (this.tabIndex) {
        case 0:
          this.listInfo1();
          break;
        case 1:
          this.listInfo2();
          break;
        case 2:
          this.listInfo3();
          break;
        case 3:
          this.listInfo4();
          break;
        case 4:
          this.listInfo5();
          break;
        case 5:
          this.listInfo6();
          break;
        default:
          break;
      }
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;
      /* 清空字段 */
      this.allowPlanRoad = false;
      this.name = "";
      this.day = "";
      this.age = "";
      this.glasses = "";
      this.sex = "";
      this.mask = "";
      this.community = "";
      this.liveType = "";
      this.access = "";
      this.num = "";
      this.currentPage = 1;
      this.value1 = [];
      this.tableData = [];
      this.total = 0;
      this.tabIndex = val;
      switch (val) {
        case 0:
          this.listInfo1();
          break;
        case 1:
          this.listInfo2();
          break;
        case 2:
          this.listInfo3();
          break;
        case 3:
          this.listInfo4();
          break;
        case 4:
          this.listInfo5();
          break;
        case 5:
          this.listInfo6();
          break;
        default:
          break;
      }
    },
    handleCurrentChange(val) {
      //如果是输入人名的精确查找
      this.currentPage = val;
      this.search();
    },
    listInfo1() {
      var _this = this;
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/access",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 20,
          page: this.currentPage,
          community: this.community,
          liveType: this.liveType,
          access: this.access,
          startTime: this.value1[0]
            ? new Date(this.value1[0]).format("yyyy-MM-dd hh:mm:ss")
            : "",
          endTime: this.value1[1]
            ? new Date(this.value1[1]).format("yyyy-MM-dd hh:mm:ss")
            : ""
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
      });
    },
    listInfo2() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/capture/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 20,
          page: this.currentPage,
          community: this.community,
          liveType: this.liveType,
          startTime: this.value1[0]
            ? new Date(this.value1[0]).format("yyyy-MM-dd hh:mm:ss")
            : "",
          endTime: this.value1[1]
            ? new Date(this.value1[1]).format("yyyy-MM-dd hh:mm:ss")
            : "",
          name: this.name,
          sex: this.sex,
          bmask: this.mask,
          eyeglass: this.glasses
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage * 1;
          if (res.data.data.list2) {
            this.allowPlanRoad = true;
            res.data.data.list2.forEach(item => {
              this.locationArr.push(item.deviceAddr.split(","));
            });
          } else {
            this.allowPlanRoad = false;
          }
        }
        console.log(res);
      });
    },
    listInfo3() {
      var _this = this;
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/sense/highAccess",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          community: this.community,
          liveType: this.liveType,
          accessNumSmall: this.num,
          timeType: "day"
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
        console.log(res);
        /* var data = res.data.data;
        this.tableData = data.list; */
      });
    },
    listInfo4() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/stranger/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 20,
          page: this.currentPage,
          accessNumBegin: this.num,
          age: this.age
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.stranger;
        }
      });
    },
    listInfo5() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/quit/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          daySmall: this.day
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.list;
        }
        //console.log(res);
      });
    },
    listInfo6() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/added/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          daySmall: this.day,
          sex:this.sex,
          age:this.age
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.list;
        }
        //console.log(res);
      });
    },
    showImg(row, event) {
      if (event.label == "操作") {
        this.img = row.image;
        this.dialogImageVisible = true;
      }else{
        this.$router.push({name:"PersonRecord",query:{id:row.personId}})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.leftTabBox {
  width: 352px;
  height: 955px;
  // background: rgba(54, 54, 54, 1);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  .title {
    color: #ffffff;
  }
  float: left;
  ul {
    width: 100%;
    .selectedType {
      background: rgba(61, 183, 237, 1);
    }
    li {
      width: 324px;
      height: 68px;
      background: rgba(50, 136, 234, 1);
      border-radius: 5px;
      margin: 30px auto;
      line-height: 68px;
      cursor: pointer;
      img {
        float: left;
        margin: 18px 20px 0 60px;
      }
      span {
        font-size: 20px;
      }
    }
  }
}
.searchBox {
  width: 1532px;
  height: 100px;
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
/* 实时列表部分 */
.realTimeList {
  width: 1532px;
  height: 346px;
  float: left;
  margin: 20px 0 0 11px;
  .title {
    color: #fff !important;
  }
  ul {
    width: 1500px;
    height: 300px;
    margin: 10px auto 0;
    overflow: hidden;
    position: relative;
  }
}

/* 表格部分 */
.tableBox {
  width: 1532px;
  height: 835px;
  float: left;
  margin: 20px 0 0 11px;
}
.table2 {
  height: 100%;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul {
  height: 770px;
  width: 100%;
  overflow: hidden;
  li {
    width: 480px;
    height: 180px;
    background: #4873d4;
    margin: 10px 0 0 15px;
    float: left;
    border-radius: 5px;
    img {
      float: left;
      width: 160px;
      height: 160px;
      margin: 10px 0 0 10px;
    }
    .rightInfo {
      float: left;
      margin-left: 40px;
      p {
        margin-top: 20px;
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
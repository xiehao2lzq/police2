<template>
  <div>
    <Header />
    <div v-show="this.$route.name=='PersonParticularList'" class="personParticularList">
      <div class="leftTabBox boxColor">
        <div class="title clear">
          <p></p>
          <span>基础信息</span>
        </div>
        <ul class="clear">
          <li
            v-for="(item,index) in tabArr"
            :key="index"
            @click="select(index)"
            :class="{selectedType:item.isSelected}"
          >
            <img :src="item.src" alt />
            <span v-if="index==0">{{item.text+"("+info.personTotalNum+")"}}</span>
            <span v-if="index==1">{{item.text+"("+(info.permanentPersonNum)+")"}}</span>
            <span v-if="index==2">{{item.text+"("+info.floatPersonNum+")"}}</span>
            <span v-if="index==3">{{item.text+"("+info.foreignerPersonNum+")"}}</span>
          </li>
        </ul>
        <div class="info2">
          <div class="title">人员性质统计</div>
          <div id="person"></div>
        </div>
      </div>

      <div class="searchBox boxColor">
        <div>
          <div class="title clear">
            <p></p>
            <span v-if="tabArr[0].isSelected">实有人口</span>
            <span v-if="tabArr[1].isSelected">常住人口</span>
            <span v-if="tabArr[2].isSelected">流动人口</span>
            <span v-if="tabArr[3].isSelected">涉外人员</span>
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
              <span>国别：</span>
              <el-select v-model="nation" placeholder="请选择">
                <el-option
                  v-for="item in nationList"
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
           <!--  <div v-show="tabIndex!==1&&tabIndex!==3" class="selectBox1">
              <span>居住证：</span>
              <el-select v-model="cardValue" placeholder="请选择">
                <el-option
                  v-for="item in card"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div> -->
            <div class="selectBox1">
              <span>管控级别：</span>
              <el-select v-model="color" placeholder="请选择">
                <el-option
                  v-for="item in colorList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="selectBox1">
              <span>户籍性质：</span>
              <el-select v-model="personType" placeholder="请选择">
                <el-option
                  v-for="item in personTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-show="tabIndex==1" class="selectBox1">
              <span>人户关系：</span>
              <el-select v-model="censusRegister" placeholder="请选择">
                <el-option
                  v-for="item in censusRegisterList"
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

        <!-- <div v-if="tabArr[1].isSelected">
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
        </div>-->

        <!-- <div v-if="tabArr[2].isSelected">
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
        </div>-->
      </div>

      <!-- <div class="tableBox boxColor">
        <div class="table2">
          <el-table :data="tableData" height="775" style="width: 100%" @row-click="personRecord">
            <el-table-column label="人员姓名" width="150%">
              <template slot-scope="scope">
                <span
                  style="display:inline-block;padding:5px;background:#AEAEAE;color:#fff; font-weight: 900;
  padding: 5px 15px;
  margin-right: 20px;
  float:left"
                  v-if="scope.row.residence== '0'"
                >灰</span>
                <span style="float:left;margin-top:5px;">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nationalityName" label="国别"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="paperNumber" label="证件号码"></el-table-column>
            <el-table-column prop="xqName" label="居住小区"></el-table-column>
            <el-table-column prop="houseName" label="房屋号"></el-table-column>
            <el-table-column prop="liveTypyName" label="居住身份"></el-table-column>
            <el-table-column label="是否办理居住证">
              <template slot-scope="scope">
                <span v-if="scope.row.liveTypyName=='业主'||scope.row.liveTypyName=='家庭成员'">/</span>
                <span v-else>{{scope.row.residence=="0"?"未申请居住证":"已申请居住证"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="checkinDate" label="入住时间"></el-table-column>
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
      </div>-->

      <div class="tableBox boxColor">
        <div class="table2">
          <ul>
            <li v-for="item in tableData" :key="item.index" @click="personRecord(item.ownerId)">
              <img v-show="item.color=='g'" src="@static/image/lv.png" alt />
              <img v-show="item.color=='y'" src="@static/image/huang.png" alt />
              <img v-show="item.color=='r'" src="@static/image/hong.png" alt />
              <div class="img">
                <img class="img1" :src="item.image || src" alt />
                <p style="background:#69CEA7">{{item.name}}</p>
                <!--  <img v-show="item.residence=='0'" src="@static/image/hui.png" alt="">
                <img src="@static/image/hei.png" alt="">-->
              </div>
              <div class="rightInfo">
                <p>
                  <span>小区：</span>
                  <span>{{item.xqName}}</span>
                </p>
                <p>
                  <span>房号：</span>
                  <span style="fontSize:18px;fontWeight:900">{{item.houseName}}</span>
                </p>
                <p>
                  <span>居住身份：</span>
                  {{item.liveTypyName}}
                </p>
                <p>
                  <span>联系电话：</span>
                  <span style="fontSize:18px;fontWeight:900">{{item.phone}}</span>
                </p>
                <p>
                  <span>证件号码：</span>
                  {{item.paperNumber}}
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

      <!-- <div class="tableBox boxColor" v-if="tabArr[2].isSelected">
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
                  {{item.houseName}}
                </p>
                <p>
                  <span>未感知时长：</span>
                  {{item.noSenceTime}}
                </p>
                 <p>
                <span>出入次数：</span>{{item.accessNum}}
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
      </div>-->
    </div>
    <router-view></router-view>
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
      //二次新增的搜索选项
      personTypes:[
        {
          name:"常住人口",
          value:1
        },
        {
          name:"流动人口",
          value:2
        },
        {
          name:"涉外人员",
          value:3
        }
      ],
      personType:"",
      //新增的搜索选项
      colorList:[
        {
          name:"红名单",
          value:"r"
        },
        {
          name:"黄名单",
          value:"y"
        },
        {
          name:"绿名单",
          value:"g"
        },
      ],
      color:"",
      censusRegisterList:[
        {
          name:"户在人在",
          value:1
        },
        {
          name:"户在人不在",
          value:2
        },
        {
          name:"户不在人在",
          value:3
        }
      ],
      censusRegister:"",
      src: require("@static/image/person.png"),
      communityList: [], //小区列表
      community: "", //选中的小区
      nationList:[
        {
          name:"中国大陆",
          value:1
        },
        {
          name:"涉外区域",
          value:0
        }
      ],
      nation: "", //国别
      liveTypes: [
        {
          name: "租户", 
          value: 3
        },
        {
          name: "业主和家庭成员",
          value: 4
        }
      ],
      liveType: "",
      card: [
        //居住证
        {
          name: "有居住证",
          value: 1
        },
        {
          name: "无居住证",
          value: 2
        }
      ],
      cardValue: "",
      num: "", //出现次数
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
      input: "", //模糊搜索
      day: "", //天数
      tableData: [],
      currentPage: 1,
      total: 1,
      tabArr: [
        {
          src: require("@static/image/personList1.png"),
          text: "实有人口",
          isSelected: false
        },
        {
          src: require("@static/image/personList2.png"),
          text: "常住人口",
          isSelected: false
        },
        {
          src: require("@static/image/personList3.png"),
          text: "流动人口",
          isSelected: false
        },
        {
          src: require("@static/image/personList3.png"),
          text: "涉外人员",
          isSelected: false
        }
      ],
      info:{}
    };
  },
  computed: {
    ...mapState({
      selectedArr: state => state.commonData.selectedArr
    }),
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    /* 实有人员数据请求 */
    //var id = this.$route.params.userId;
    /* switch (id) {
      case 0:
        this.tabArr[0].isSelected = true;
        this.tabIndex = 0;
        this.listInfo1();
        break;
      case 1:
        this.tabArr[1].isSelected = true;
        this.tabIndex = 1;
        this.listInfo2();
        break;
      case 2:
        this.tabArr[2].isSelected = true;
        this.tabIndex = 2;
        this.listInfo3();
        break;
      default:
        this.tabArr[0].isSelected = true;
        this.tabIndex = 0;
        this.listInfo1();
        break;
    } */
    if (this.$route.query.tabIndex==0) {
      this.tabIndex = this.$route.query.tabIndex;
      this.tabArr[this.tabIndex].isSelected = true;
      this.community = this.$route.query.xqCode;
    } else if(this.$route.query.tabIndex==2){
      this.tabIndex = this.$route.query.tabIndex;
      this.tabArr[this.tabIndex].isSelected = true;
      this.community = this.$route.query.xqCode;
      this.personType = 2
    }else if(this.$route.query.tabIndex==3){
      this.tabIndex = this.$route.query.tabIndex;
      this.tabArr[this.tabIndex].isSelected = true;
      this.community = this.$route.query.xqCode;
      this.personType = 3
    } else {
      this.tabIndex = 0;
      this.tabArr[0].isSelected = true;
    }
    this.listInfo1();
    this.listInfo4();
    this.personData();
    this.countryList();
    this.communityList = JSON.parse(sessionStorage.getItem("selectedArr")); //为了防止刷新丢失从缓存中取
  },
  methods: {
    //需求更改，国家改成下拉
    countryList(){
      this.$axios({
          method:'get',
          url:"http://" + this.url + ":9000/sjwl/webapi/country/list",
          params:{areaId:0,xqCode:this.community}
        }).then(res=>{
          if(res.data.code==1000){
            this.nationList = this.nationList.concat(res.data.data)
          }
          console.log(res)
        })
    },
    //需求更改，名称后面加数量
    listInfo4(){
        this.$axios({
          method:'get',
          url:"http://" + this.url + ":9000/sjwl/webapi/person/baseInfo",
          params:{areaId:0,xqCode:this.community}
        }).then(res=>{
          if(res.data.code==1000){
            this.info = res.data.data
          }
          console.log(res)
        })
      },
    personRecord(id) {
      //console.log(row);
      this.$router.push({ name: "PersonRecord", query: { id: id } });
    },
    reset(val) {
      //console.log(val)
      this.select(val);
    },
    search(val) {
      //console.log(val)
      this.listInfo1();
      /* switch (val) {
        case 0:
          this.listInfo1();
          break;
        case 1:
          this.listInfo2();
          break;
        case 2:
          this.listInfo3();
          break;
        default:
          break;
      } */
    },
    select(val) {
      this.tabArr.forEach(item => {
        item.isSelected = false;
      });
      this.tabArr[val].isSelected = true;

      /* 切换按钮清空数据 */
      this.personType = "";
      this.color = "";
      this.censusRegister = "";
      this.community = "";
      this.nation = "";
      this.liveType = "";
      this.cardValue = "";
      this.num = "";
      this.age = "";
      this.input = "";
      this.day = "";
      this.input = "";
      this.currentPage = 1;
      this.total = 1;
      this.tabIndex = val;
      this.tableData = [];
      /* 请求切换模块的数据 */
      console.log(val)
      switch (val) {
        case 0:
           this.personType = "";
          this.listInfo1();
          break;
        case 1:
           this.personType = 1;
          this.listInfo1();
          break;
        case 2:
           this.personType = 2;
          this.listInfo1();
          break;
        case 3:
           this.personType = 3;
          this.listInfo1();
          break;
        default:
          break;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listInfo1();
      /* switch (this.tabIndex) {
        case 0:
          this.listInfo1();
          break;
        case 1:
          this.listInfo2();
          break;
        case 2:
          this.listInfo3();
          break;
        default:
          break;
      } */
    },
    //人员性质统计画图
    canvas1() {
      var chart2 = new G2.Chart({
        container: "person",
        forceFit: true,
        height: 500,
        animate: false,
        padding: [70, 10, 120, 10]
      });
      chart2.source(this.persondata, {
        percent: {
          formatter: function formatter(val) {
            val = val + "%";
            return val;
          }
        }
      });
      chart2.coord("theta", {
        radius: 1,
        innerRadius: 0.6
      });
      chart2.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      /* chart2.guide().html({
          position: ["50%", "50%"],
          html:
            '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">总计<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
          alignX: "middle",
          alignY: "middle"
        }); */
      chart2.legend({
        position: "bottom",
        offsetX: 0,
        offsetY: 25,
        textStyle: {
          fill: "#fff"
        },
        clickable: false,
        itemFormatter(val) {
          //自定义标注内容
          if (val.length > 5) {
            var topLabe = val.slice(0, 4);
            var bottLabe = val.slice(4);
            return `${topLabe}
${bottLabe}`;
          } else {
            return val;
          }
        }
      });
      var interval = chart2
        .intervalStack()
        .position("percent")
        .color("personProperty", [
          "l(90) 0:#23E6BD 1:#23C5EB",
          "l(90) 0:#F3A254 1:#ED577E",
          "l(90) 0:#D298F1 1:#6E56E8"
        ])
        .label("percent", {
          formatter: function formatter(val, item) {
            return `${val}`;
          },
          // offset: 25,
          textStyle: {
            //textAlign: "start",
            shadowBlur: 2,
            shadowColor: "#939FBD",
            fill: "#fff"
            // textBaseline: "top"
          }
        })
        .tooltip("personProperty*num", function(personProperty, num) {
          //percent = percent * 100 + "%";
          return {
            name: personProperty,
            value: num + "人"
          };
        });
      chart2.render();
      /* 绑定图表事件 */
      chart2.on("interval:click", ev => {
        switch (ev.target._cfg.origin._origin.personProperty) {
          case "常住人口":
            this.personType = 1;
            this.tabIndex = 1;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[1].isSelected = true;
            this.listInfo1();
            break;
          case "流动人口":
            this.personType = 2;
            this.tabIndex = 2;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[2].isSelected = true;
            this.listInfo1();
            break;
          case "涉外人员":
            this.personType = 3;
            this.tabIndex = 3;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[2].isSelected = true;
            this.listInfo1();
            break;
          default:
            break;
        }
      });
      chart2.on("legend-item:click", ev => {
        console.log(ev);
        switch (ev.target._cfg.origin.value) {
          case "常住人口":
            this.personType = 1;
            this.tabIndex = 1;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[1].isSelected = true;
            this.listInfo1();
            break;
          case "流动人口":
            this.personType = 2;
            this.tabIndex = 2;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[2].isSelected = true;
            this.listInfo1();
            break;
          case "涉外人员":
            this.personType = 3;
            this.tabIndex = 3;
            this.tabArr.forEach(item => {
              item.isSelected = false;
            });
            this.tabArr[3].isSelected = true;
            this.listInfo1();
            break;
          default:
            break;
        }
      });
    },
    //人员性质统计数据获取
    personData() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/property2",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          /* areaId: "0",
          subdistrictId: "", */
          xqCode: this.community
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == "1000") {
          this.persondata = res.data.data;
          this.$nextTick(() => {
            this.canvas1();
          });
        }
      });
    },
    listInfo1() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/owner/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.community,
          subdistrictId: "",
          limit: 12,
          page: this.currentPage,
          nationalityName: this.nation,
          liveType: this.liveType,
          //cardvalue: this.cardValue,
          likeStr:this.input,
          color:this.color,
          regAndAddr:this.censusRegister,
          properties:this.personType
        }
      }).then(res => {
        if (res.data.code == 1000) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
        }
        console.log(res);
      });
    },
    listInfo2() {
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
          limit: 12,
          page: this.currentPage,
          accessNumBegin: this.num,
          age: this.age
        }
      }).then(res => {
        //console.log(res);
        if (res.data.code == 1000) {
          this.total = res.data.data.totalRows;
          this.currentPage = res.data.data.currentPage;
          this.tableData = res.data.data.stranger;
        }
      });
    },
    listInfo3() {
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
          page: 1,
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
  height: 150px;
  margin: 25px 0 0 11px;
  overflow: hidden;
  float: left;
  .title {
    color: #fff;
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
  height: 785px;
  width: 1502px;
  margin: 10px auto 0;
}
.table2 ul {
  height: 705px;
  width: 100%;
  overflow: auto;
  li > img {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
  }
  li {
    width: 480px;
    height: 180px;
    background: #4873d4;
    margin: 10px 0 0 15px;
    float: left;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    .img {
      float: left;
      width: 160px;
      height: 160px;
      margin: 10px 0 0 10px;
      position: relative;
      .img1 {
        width: 100%;
        height: 100%;
      }
      /*  img{
        position: absolute;
        right: 0;
        bottom: 0;
      } */
      p {
        position: absolute;
        z-index: 10;
        bottom: 0;
        width: 70%;
        left: 15%;
        border-radius: 10px 10px 0 0;
        height: 30px;
        //background: rgba($color: #4873d4, $alpha: 0.8);
        text-align: center;
        line-height: 30px;
        font-size:18px;
        font-weight:900;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .rightInfo {
      float: left;
      margin-left: 40px;
      p {
        margin-top: 12px;
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
<template>
  <div class="teacher_exam">
    <div class="edit release_exam" v-show="exam_show">
      <div class="edit_title">
        <span class="title">查看考试</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试名称:</span>
          </div>
          <span>{{ seeExamdata.name }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试班级:</span>
          </div>
          <span>
            {{ seeExamdata.classroonName }}
          </span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">开始时间:</span>
          </div>
          <span>{{
            seeExamdata.beginTime | lastTime(seeExamdata.beginTime)
          }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">结束时间:</span>
          </div>
          <span>{{ seeExamdata.endTime | lastTime(seeExamdata.endTime) }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试时长:</span>
          </div>
          <span> {{ seeExamdata.duringLimit }}分 </span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试状态:</span>
          </div>
          <span v-if="seeExamdata.status == 2">已结束</span>
          <span v-if="seeExamdata.status == 1">进行中</span>
          <span v-if="seeExamdata.status == 0">未开始</span>
        </li>
      </ul>
      <div class="number scrollbar">
        <div class="number_title">
          <span>案例</span>
          <span>分值</span>
        </div>
        <div class="ul_scrollbar">
          <ul class="case_item">
            <li v-for="(item, index) in check" :key="index">
              <span>{{ item.name }}</span>
              <span>{{ item.score }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="edit_btn_box">
        <button class="edit_submit" @click="close">确定</button>
      </div>
    </div>
    <div class="main_header">
      <div>
        <!-- <button class="add">批量存档</button> -->
      </div>
      <div>
        <label for>状态</label>
        <select v-model="state" class="select">
          <option value="">请选择状态</option>
          <option value="0">未开始</option>
          <option value="1">进行中</option>
          <option value="2">已结束</option>
        </select>
        <label for class="big_left">考试名称</label>
        <input
          type="text"
          class="text_box"
          placeholder="请输入关键字查询"
          v-model="keyword"
        />
        <button class="submit" @click="getexam('1')">检索</button>
      </div>
    </div>

    <table
      class="main_table"
      style="border-collapse: separate; border-spacing: 0px 8px"
    >
      <thead class="thead-dark">
        <tr>
          <th>序号</th>
          <th>考试名称</th>
          <th>考试班级</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>考试时长</th>
          <th>案例</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examData" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.classrooms[0].classroonName }}</td>
          <td>
            {{
              item.classrooms[0].beginTime
                | lastTime(item.classrooms[0].beginTime)
            }}
          </td>
          <td>
            {{
              item.classrooms[0].endTime | lastTime(item.classrooms[0].endTime)
            }}
          </td>
          <td>{{ item.classrooms[0].duringLimit }}分</td>
          <td style="width: 200px">
            <span class="nameTxT">
              {{ caseName(item) }}
            </span>
          </td>
          <td class="status">
            <span
              v-if="item.classrooms[0].status == 2"
              style="color: rgb(255, 255, 255)"
              >已结束</span
            >
            <span v-if="item.classrooms[0].status == 1">进行中</span>
            <span
              v-if="item.classrooms[0].status == 0"
              style="color: rgb(255, 255, 255)"
              >未开始</span
            >
          </td>
          <td class="see_dele">
            <p
              @click="seeExam(item)"
              style="
                color: rgb(255, 255, 255);
                border: 1px solid rgb(0, 235, 255);
              "
            >
              查看
            </p>
            <p @click="deleExam(item)" v-if="item.classrooms[0].status == 0">
              取消
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <main-itps v-show="main_show"></main-itps>
    <turn-page
      ref="turnPage"
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getexam"
    ></turn-page>
  </div>
</template>

<script>
import mainItps from "../../components/mainItps";
import turnPage from "../../components/turnPage";
export default {
  name: "teacher-exam",
  components: {
    turnPage,
    mainItps,
  },
  data() {
    return {
      exam_show: false,
      page: "1",
      total: "",
      size: "10",
      seeExamdata: {},
      check: [],
      examData: "",
      state: "",
      keyword: "",
      main_show: false,
    };
  },
  mounted() {
    this.getexam();
  },
  methods: {
    getexam(page = "1") {
      this.page = page;
      this.axios
        .get("exam/list", {
          params: {
            status: this.state,
            keyword: this.keyword,
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.examData = res.data.rows;
          this.total = res.data.total;
        });
    },
    caseName(item) {
      let nameTxt = item.cases;
      let nameArr = "";
      nameTxt.forEach((i) => {
        nameArr += i.name + ",";
      });
      return nameArr;
    },
    seeExam(item) {
      this.exam_show = true;
      this.seeExamdata.name = item.name;
      this.seeExamdata.classroonName = item.classrooms[0].classroonName;
      this.seeExamdata.beginTime = item.classrooms[0].beginTime;
      this.seeExamdata.endTime = item.classrooms[0].endTime;
      this.seeExamdata.duringLimit = item.classrooms[0].duringLimit;
      this.seeExamdata.status = item.classrooms[0].status;
      this.check = item.cases;
    },
    close() {
      this.exam_show = false;
    },
    //删除试卷
    deleExam(item) {
      this.axios.delete(`/exam/${item.examNo}`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("取消成功!");
          this.getexam();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.nameTxT {
  display: block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255) !important;
  border: none !important;
}
.status {
  span {
    border: none !important;
  }
}
.see_dele {
  width: 200px;
  p {
    display: inline-block;
    margin: 0 10px !important;
  }
  p:last-child {
    border: 1px solid rgb(252, 94, 95);
    color: rgb(252, 94, 95);
  }
}
.number {
  margin-left: 13%;
  margin-top: 20px;
  width: 72%;
  p {
    display: inline-block;
    width: 100px;
  }
  span {
    display: inline-block;
    width: 50%;
    text-align: center;
  }
  span:first-child {
    border-right: 1px solid rgb(0, 235, 255);
  }
  .number_title {
    border: 1px solid rgb(0, 235, 255);
    border-bottom: none;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
  }
  .ul_scrollbar {
    border: 1px solid rgb(0, 235, 255);
    border-bottom: none;
    .case_item {
      width: 100%;
      margin-left: 0;
      max-height: 130px;
      overflow-y: auto;
      li {
        margin-top: 0;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid rgb(0, 235, 255);
        .text_box {
          text-align: center;
          padding-left: 0;
          width: 50%;
          height: 28px;
          border: none;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 0;
    }
  }
  .bottom_text {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .number_itps {
    display: flex;
    justify-content: space-between;
  }
}
</style>
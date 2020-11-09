<template>
  <div class="home">
    <header class="home_header" style="flex-direction: row-reverse">
      <user></user>
    </header>
    <ul class="case_type">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="getCaseData('1', item.id)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="case_user_main">
      <ul>
        <li
          class="case_user_item"
          v-for="(item, index) in caseData"
          :key="index"
        >
          <div class="case_img" @click="examStart(item)">
            <img src="../../../assets/public/timg.png" alt="" />
            <div class="case_active">
              <div class="case_img_tips">
                <img src="../../../assets/public/caseTips.png" alt="" />
                <span>进入训练</span>
              </div>
              <span>累计学习:{{item.count}}次</span>
            </div>
          </div>
          <div class="case_current">
            <span>姓名:{{ item.name }}</span>
            <span>性别:{{ item.gender ? "男" : "女" }}</span>
            <span>年龄:{{ item.age }}</span>
          </div>
        </li>
      </ul>
      <turn-page
        v-show="total > size"
        :totaltotal="Number(total)"
        :size="Number(size)"
        @getData="getCaseData"
      ></turn-page>
    </div>
  </div>
</template>

<script>
import user from "../../../components/user";
import turnPage from "../../../components/turnPage";

export default {
  name: "case-home",
  components: {
    user,
    turnPage,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
      total: "10",
      size: "10",
      page: "1",
      caseData: {},
    };
  },
  mounted() {
    this.getCaseData();
    localStorage.removeItem('caseMenuId')
    localStorage.removeItem('askedArr')
    localStorage.removeItem('pressItemData')
  },
  methods: {
    getCaseData(page = "1", id = "") {
      this.axios
        .get("/case", {
          params: {
            diseaseType: id,
            size: this.size,
            page: page,
          },
        })
        .then((res) => {
          this.caseData = res.data.rows;
          this.total = res.data.total;
        });
    },
    examStart(e) {
      localStorage.setItem("caseId", e.caseId);
      this.axios.post(`/train/${e.caseId}`).then((res) => {
        if (res.code == "000000") {
          localStorage.setItem("examNo", res.data.examNo);
          localStorage.setItem("name", e.name);
          localStorage.setItem("sex", e.gender);
          this.$router.push("userask");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.case_type {
  display: flex;
  width: 1740px;
  margin: 30px auto;
  li {
    background: url("../../../assets/public/caseType.png") center no-repeat;
    background-size: 100% 100%;
    height: 55px;
    width: 195px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  li:hover {
    background: url("../../../assets/public/caseTypeActive.png") center
      no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.case_user_main {
  background: url("../../../assets/public/box.png") center no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  width: 1740px;
  height: 720px;
  padding: 2% 2%;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .case_user_item {
      width: 280px;
      height: 240px;
      margin: 0 26px 60px 26px;
      position: relative;
      .case_img {
        background: url("../../../assets/public/caseBox.png") no-repeat;
        .case_active {
          background: rgb(0, 0, 0, 0.5);
          display: none;
          width: 96%;
          height: 96%;
          left: 2%;
          top: 2%;
          position: absolute;
          .case_img_tips {
            position: absolute;
            width: 88px;
            height: 90px;
            left: 50%;
            top: 50%;
            margin-left: -44px;
            margin-top: -45px;
            span {
              width: 40px;
              margin-left: 25px;
              margin-bottom: 20px;
            }
          }
          span {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
      .case_img:hover .case_active {
        display: block;
        cursor: pointer;
      }
      .case_current {
        width: 80%;
        margin-left: 20%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        span {
          width: 50%;
        }
      }
    }
  }
  .case_page {
    margin-top: 20px;
  }
}
</style>
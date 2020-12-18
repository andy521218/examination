<template>
  <div class="home">
    <header class="home_header">
      <logo :index="index"></logo>
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
            <img :src="$url + item.picUrl" alt="" v-if="item.picUrl" />
            <img src="../../../assets/public/timg.png" alt="" v-else />
            <div class="case_active">
              <div class="case_img_tips">
                <img src="../../../assets/public/caseTips.png" alt="" />
                <span>进入训练</span>
              </div>
              <span>累计学习:{{ item.count }}次</span>
            </div>
          </div>
          <div class="case_current">
            <span>姓名:{{ item.name }}</span>
            <span>性别:{{ item.gender ? "男" : "女" }}</span>
            <span>年龄:{{ item.age }}</span>
          </div>
        </li>
      </ul>
      <main-itps v-show="main_show"></main-itps>
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
import mainItps from "../../../components/mainItps";
import user from "../../../components/user";
import turnPage from "../../../components/turnPage";
import logo from "../../../components/logo";
export default {
  name: "case-home",
  components: {
    user,
    turnPage,
    mainItps,
    logo,
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
      main_show: false,
      index: false,
    };
  },
  mounted() {
    this.getCaseData();
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
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
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
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
</style>
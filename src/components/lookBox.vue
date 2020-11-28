<template>
  <div class="cont_bg look_box">
    <edit-result
      v-if="result"
      :title="title"
      :type="type"
      :item="item"
      @getItemData="getItemData"
    ></edit-result>
    <div class="mask" v-if="result"></div>
    <div class="cont_header">{{ title }}诊断</div>
    <div class="scrollbar">
      <ul>
        <li v-for="(item, index) in data" :key="index" @click="tabShow(index)">
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
              <span class="edid_look_item" @click="edit(item)">编辑</span>
            </div>
            <div
              class="item_right"
              :class="{ transform: indexShow == index }"
            ></div>
          </div>
          <div class="item_container" :class="{ active: indexShow == index }">
            <p v-for="(i, index) in item.options" :key="index">{{ i }}</p>
          </div>
        </li>
      </ul>
    </div>
    <button class="addResult" @click="editResult()">+</button>
  </div>
</template>

<script>
import editResult from "../pages/admin/edit/editResult";
export default {
  name: "look-box",
  data() {
    return {
      indexShow: "1000",
      transformIndex: "-1",
      result: false,
      type: "",
      data: "",
      item: "",
    };
  },
  components: {
    editResult,
  },
  props: ["title", "editshow"],
  methods: {
    tabShow(index) {
      this.indexShow = index;
    },
    editResult() {
      this.result = true;
    },
    getItemData() {
      this.axios.get(`/meta/watch/${this.type}/options`).then((res) => {
        this.data = res.data;
      });
    },
    edit(item) {
      this.item = item;
      this.result = true;
    },
  },
  mounted() {
    if (this.title == "望神色") {
      this.type = 0;
    } else if (this.title == "望局部") {
      this.type = 1;
    } else if (this.title == "望舌") {
      this.type = 2;
    }
    this.getItemData();
  },
};
</script>

<style lang="scss">
.look_box {
  .edit {
    top: 45px;
    width: 96%;
    margin-left: 2%;
    .title {
      width: 135px;
    }
    .edit_left {
      width: 100px;
    }
    li {
      border: none;
    }
  }
  .scrollbar {
    ul {
      height: 550px;
      padding-right: 10px;
      overflow-y: auto;
      .item_left {
        position: relative;
        .edid_look_item {
          position: absolute;
          left: 350px;
          width: 50px;
          color: rgb(0, 235, 255);
        }
      }
    }
  }
}
</style>

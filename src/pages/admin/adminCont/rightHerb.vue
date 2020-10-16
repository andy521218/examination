<template>
  <div class="cont_bg">
    <!-- 右侧弹窗 -->
    <div class="mask" v-if="druggeryShow"></div>
    <!-- 删除弹窗 -->
    <edit-dele
      edit_title="方剂删除"
      v-if="allShow"
      @deleSubmit="deleSubmit"
      @closeEdit="close"
    >
      <template v-slot:edit_p>
        <p>确定删除 {{ druggery.name }} 吗?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 编辑 添加 -->
    <div class="edit" v-if="druggeryShow">
      <div class="edit_title">
        <span class="title">添加常见方药</span>
        <span class="edit_switch" @click="close()"></span>
      </div>
      <ul class="edit_class">
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-if="druggerySwitch"
            placeholder="请输入方药名称"
            v-model="druggery.alias"
          />
          <span class="edit_text_i" v-else>{{ druggery.alias }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药别名:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-if="druggerySwitch"
            placeholder="请输入方药别名"
            v-model="druggery.name"
          />
          <span class="edit_text_i" v-else>{{ druggery.name }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药用法:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入方药用法"
            v-if="druggerySwitch"
            v-model="druggery.notice"
          />
          <span class="edit_text_i" v-else>{{ druggery.notice }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">注意事项:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入注意事项"
            v-if="druggerySwitch"
            v-model="druggery.usage"
          />
          <span class="edit_text_i" v-else>{{ druggery.usage }}</span>
        </li>
        <li class="display">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药图片:</span>
          </div>
          <div class="uploadImg">
            <input type="file" />
            <img src="../../../assets/public/uploadImg.png" alt />
          </div>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close()" v-if="druggerySwitch">取消</button>
        <button class="edit_submit" @click="submitDruggery()" v-if="druggerySwitch">确定</button>
      </div>
    </div>
    <div class="cont_header">常见方药</div>
    <ul>
      <li class="display">
        <input
          type="text"
          class="text_box"
          v-model="druggerySearch"
          @blur="searchShow = false"
          @focus="
            searchShow = true;
            druggerySearch = '';
          "
        />
        <button class="submit">检索</button>
      </li>
      <li v-for="(item, index) in druggeryData" :key="index">
        <div class="item_cont">
          <div class="item_left">
            <i></i>
            <span>{{ item.name }}</span>
          </div>
          <div class="item_container_between">
            <div>
              <span @click="see(item)">查看</span>
              <span @click="edit(item)">修改</span>
              <span class="item_container_between_dele" @click="dele(item)"
                >删除</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button class="addResult" @click="addDruggery()">+</button>
  </div>
</template>


<script>
import editDele from "../../../components/edit/editDele";
export default {
  name: "right-herb",
  components: {
    editDele,
  },
  data() {
    return {
      allShow: false,
      druggeryShow: false,
      druggerySwitch: true,
      druggerySearch: "",
      druggeryData: "",
      druggery: {},
    };
  },
  mounted() {
    this.getDruggeryData();
  },
  methods: {
    close() {
      this.druggeryShow = false;
      this.druggerySwitch = true;
      this.druggery = {};
    },
    addDruggery() {
      this.druggeryShow = true;
    },
    see(e) {
      this.druggeryShow = true;
      this.druggerySwitch = false;
      this.druggery = e;
    },
    edit(e) {
      this.druggeryShow = true;
      this.druggery = e;
    },
    dele(e) {
      this.allShow = true;
      this.druggery = e;
    },
    deleSubmit() {
      this.axios
        .delete(`/meta/herb/druggery/${this.druggery.id}`)
        .then((res) => {
          if (res.code == "000000") {
            this.close();
            this.getDruggeryData();
            this.$Message.warning("删除成功!");
          }
        });
    },
    getDruggeryData() {
      this.axios
        .get("/meta/herb/druggery", {
          params: {
            size: "500",
          },
        })
        .then((res) => {
          this.druggeryData = res.data.rows;
        });
    },
    submitDruggery() {
      if (!this.druggery.alias) return this.$Message.error("请填写方药名称");
      if (!this.druggery.name) return this.$Message.error("请填写方药别名");
      if (!this.druggery.notice) return this.$Message.error("请填写方药用法");
      if (!this.druggery.usage) return this.$Message.error("请填写注意事项");
      var methods, title, id;
      if (!this.druggery.id) {
        methods = "post";
        title = "添加";
        id = "";
      } else {
        methods = "put";
        title = "修改";
        id = this.druggery.id;
      }
      this.http[methods](`/meta/herb/druggery/${id}`, {
        alias: this.druggery.alias,
        name: this.druggery.name,
        notice: this.druggery.notice,
        usage: this.druggery.usage,
      }).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning(`${title}成功!`);
          this.close();
          this.getDruggeryData();
        }
      });
    },
  },
};
</script>
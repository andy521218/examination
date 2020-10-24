<template>
  <div class="cont_bg">
    <edit-hear v-if="show" :hearData="hearData" @getData="getData"></edit-hear>
    <div class="mask" v-if="show"></div>
    <div class="cont_header">{{ title }}性闻诊数据</div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <div class="item_cont" @click="tabShow(index)">
          <div class="item_left">
            <i></i>
            <span>{{ item.name }}</span>
          </div>
          <div
            class="item_right"
            :class="{ transform: showIndex == index }"
          ></div>
        </div>
        <div class="item_container" :class="{ active: showIndex == index }">
          <div
            class="item_container_between"
            v-for="(i, index) in item.results"
            :key="index"
          >
            <p>{{ i.name }}</p>
            <div>
              <audio
                hidden="true"
                style="display: none"
                id="song"
                ref="song"
              ></audio>
              <span @click="play(i)">播放</span>
              <span @click="editSong(item)">编辑</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button class="addResult" @click="editResult()">+</button>
  </div>
</template>

<script>
import editHear from "../pages/admin/edit/editHear";
export default {
  name: "hear-box",
  components: {
    editHear,
  },
  data() {
    return {
      index: "1",
      transformIndex: "-1",
      show: "",
      hearData: {},
      showIndex: "",
      gender: "",
      data: "",
      songUrl: "",
    };
  },
  props: ["title", "groupData"],
  mounted() {
    this.title == "男"
      ? (this.hearData.gender = false)
      : (this.hearData.gender = true);
    this.getData();
  },
  methods: {
    getData() {
      let groupId = "1";
      if (!this.hearData.gender) {
        groupId = "0";
      }
      this.axios.get(`/meta/listen/${groupId}`).then((res) => {
        this.data = res.data;
      });
    },
    tabShow(index) {
      this.showIndex = index;
    },
    editResult() {
      this.show = true;
    },
    editSong(item) {
      this.show = true;
      this.hearData = item;
    },
    play(e) {
      const song = document.getElementById("song");
      song.src = e.videoUrl;
      song.play();
    },
  },
};
</script>

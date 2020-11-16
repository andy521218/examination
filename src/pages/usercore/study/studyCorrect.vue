<template>
  <div class="disease_correct">
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 10%; padding-left: 10px">正确答案</span>
        <span style="width: 10%">我的答案</span>
        <span style="width: 2%"></span>
        <div
          class="downMenu"
          style="width: 35%; text-align: center; padding-left: 0"
        >
          <span @click="downMenu_show = true" style="cursor: default">{{
            title
          }}</span>
          <i-con
            type="md-arrow-dropdown"
            size="30"
            @click="downMenu_show = true"
          />
          <div class="downMenu_item" v-show="downMenu_show" style="left: 238px">
            <ul>
              <li
                v-for="(item, index) in tabData"
                :key="index"
                :class="{ active: downMenu_active == item.id }"
                @click="switchIteM(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <span style="width: 15%; text-align: center" v-show="title != '问'"
          >我的答案</span
        >
        <span style="width: 15%; text-align: center" v-show="title != '问'"
          >正确答案</span
        >
        <span
          style="width: 15%; text-align: center"
          v-show="title == '问'"
        ></span>
        <span
          style="width: 15%; text-align: center"
          v-show="title == '问'"
        ></span>
        <span style="width: 15%; text-align: center">是否为依据</span>
      </li>
    </ul>
    <!-- 病名 -->
    <div class="layout_flex scrollbar" v-show="mainId == '1'">
      <ul class="study_main_left">
        <li>
          <span style="width: 163px; padding-left: 10px">{{
            showData.correctAnswer
          }}</span>
          <span style="width: 163px">{{ showData.answer }}</span>
          <span style="width: 10%" class="options">
            <i class="right" v-show="showData.correct"></i>
            <i class="error" v-show="!showData.correct"></i>
          </span>
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in askData" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right" v-show="title == '望'">
        <li v-for="(item, index) in watchData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right" v-show="title == '闻'">
        <li v-for="(item, index) in listenData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 切诊 -->
      <ul class="study_main_right" v-show="title == '切'">
        <li v-show="pulseData.id">
          <span style="width: 561px; text-align: center">脉诊</span>
          <span style="width: 240px; text-align: center"
            >{{ pulseData.answer }}
          </span>
          <span style="width: 240px; text-align: center">{{
            pulseData.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="pulseData.correct"></i>
            <i class="error" v-show="!pulseData.correct"></i
          ></span>
        </li>
        <li v-for="(item, index) in feelData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>

    <!-- 病症 -->
    <div class="layout_flex scrollbar" v-show="mainId == '2'">
      <ul class="study_main_left">
        <li
          v-for="(item, index) in showData"
          :key="index"
          @click="seeDiseaseItem(item)"
        >
          <span style="width: 163px; padding-left: 10px">{{
            item.correctAnswer
          }}</span>
          <span style="width: 163px">{{ item.answer }}</span>
          <span style="width: 10%" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i>
          </span>
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in diseaseAsk" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right" v-show="title == '望'">
        <li v-for="(item, index) in diseaseWatch" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right" v-show="title == '闻'">
        <li v-for="(item, index) in diseaseListen" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>

      <!-- 切诊 -->
      <ul class="study_main_right" v-show="title == '切'">
        <li v-show="diseasePulse.id">
          <span style="width: 561px; text-align: center">脉诊</span>
          <span style="width: 240px; text-align: center"
            >{{ diseasePulse.answer }}
          </span>
          <span style="width: 240px; text-align: center">{{
            diseasePulse.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="diseasePulse.correct"></i>
            <i class="error" v-show="!diseasePulse.correct"></i
          ></span>
        </li>
        <li v-for="(item, index) in diseaseFeel" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.answer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.correctAnswer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "study-correct",
  props: ["tabData", "mainId"],
  data() {
    return {
      showData: {},
      title: "问",
      downMenu_show: false,
      downMenu_active: "1",
      askData: [],
      watchData: [],
      listenData: [],
      pulseData: {},
      feelData: [],
      diseaseAsk: [],
      diseaseWatch: [],
      diseaseListen: [],
      diseasePulse: {},
      diseaseFeel: [],
    };
  },
  methods: {
    switchIteM(item) {
      this.downMenu_active = item.id;
      this.downMenu_show = false;
      this.title = item.name;
    },
  },
};
</script>
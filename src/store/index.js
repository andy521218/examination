import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sex:'',
    flag:false,
    menuId:'-1',
    avatar:'',
    messageMenu: [
      {
      title:'问题讨论',
      router:'messageforum',
      item:''
    },
    {
      title:'问题提问',
      router:'messagepublish',
      item:''
    },
    {
      title:'我的问题',
      router:'messagemy',
      item:''
    },
    {
      title:'我的私信',
      router:'messageprivate',
      item:''
    },
  ],
    adminMenu: [
      {
        title: "教师管理",
        item: "",
        show: false,
        router: "adminmaster",
        itemRouter: "",
      },
      {
        title: "编制管理",
        item: "",
        show: false,
        router: "adminorganization",
        itemRouter: "",
      },
      {
        title: "数据管理",
        item: "",
        show: false,
        router: "adminstatistics",
        itemRouter: "",
      },
      {
        title: "内容管理",
        item: [
          "望诊诊断",
          "闻诊诊断",
          "切诊诊断",
          "病名诊断",
          "治则治法",
          "方剂方药",
          "药材库",
        ],
        show: false,
        router: "admincontent",
        itemRouter: [
          "adminlook",
          "adminhear",
          "adminpulse",
          "adminname",
          "admintreatment",
          "adminprescription",
          "adminHerb",
        ],
      },
      {
        title: "LOGO修改",
        item: "",
        show: false,
        router: "adminlogo",
        itemRouter: "",
      },
      {
        title: "算分逻辑",
        item: "",
        show: false,
        router: "adminnumber",
        itemRouter: "",
      },
    ],
    teacherMenu: [
      {
        title: "账号管理",
        router: "teacheruser",
        item: "",
      },
      {
        title: "班级管理",
        router: "teacherclass",
        item: "",
      },
      {
        title: "学生成绩",
        router: "teacherstudent",
        item: "",
      },
      {
        title: "案例管理",
        router: "teachercase",
        item: "",
      },
      {
        title: "发布考试",
        router: "teacherrelease",
        item: "",
      },
      {
        title: "考试管理",
        router: "teacherexam",
        item: "",
      },
      {
        title: "数据分析",
        router: "teacherstatistics",
        item: "",
      },
    ],
    stuedntMenu: [
      {
        title: "个人信息",
        router: "usercenter",
        item: "",
      },
      {
        title: "修改密码",
        router: "userpassword",
        item: "",
      },
      {
        title: "学习记录",
        router: "userrecord",
        item: "",
      },
      {
        title: "考试成绩",
        router: "userachievement",
        item: "",
      },
      {
        title: "数据统计",
        router: "userstatistics",
        item: "",
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

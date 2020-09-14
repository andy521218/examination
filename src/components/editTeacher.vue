<template>
  <div class="edit_teacher">
    <div class="edit_title">
      <span class="title">{{title?'编辑':'添加教师'}}</span>
      <span class="edit_switch">X</span>
    </div>
    <ul>
        <li>
            <span class="edit_red">*</span>
            <span class="edit_text">用户名/工号</span>
            <input type="text" class="text_box" v-if="title" placeholder="请输入用户名/工号">
            <span class="edit_text" v-else>20200521</span>
        </li>
        <li>
            <span class="edit_red">*</span>
            <span class="edit_text">密码</span>
            <input type="text" class="text_box" placeholder="请输入密码">
            <span class="edit_pwd"></span>
        </li>
        <li>
            <span class="edit_red">*</span>
            <span class="edit_text">姓名</span>
            <input type="text" class="text_box" placeholder="请输入姓名">
        </li>
        <li>
            <span class="edit_red">*</span>
            <span class="edit_text">院系</span>
            <select name="" id="" class="select" v-if="title">
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
            <span class="edit_text" v-else>医院系</span>
        </li>
        <li>
           
            <span class="edit_text">手机号</span>
            <input type="text" class="text_box" placeholder="请输入手机号">
        </li>
        <li>
            <span class="edit_text">邮箱</span>
            <input type="text" class="text_box" placeholder="请输入邮箱">
        </li>
    </ul>
    <button class="edit_cancel">取消</button>
    <button class="edit_submit">确定</button>
  </div>
</template>

<script>
export default {
  name: "edit-teacher",
  data() {
    return {
      title: false,
    };
  },
};
</script>

<style lang="scss">
.edit_teacher {
  position: absolute;
  margin-left: 31%;
  width: 470px;
  height: 610px;
  background: url("../assets/public/box.png") no-repeat center;
  background-size: 100% 100%;
    .edit_title{
        position: relative;
        span{
            display: block;
        }
        .title{
            margin: 0 auto;
            margin-top: 25px;
            padding-bottom: 10px;
            font-size: 18px;
            text-align: center;
            width: 120px;
            border-bottom: 3px solid rgb(0,235,255);
        }
        .edit_switch{
            position: absolute;
            right: 10px;
            top: -13px;
            font-size: 22px;
            cursor: pointer;
        }
        .edit_switch:hover{
            color: rgb(0,235,255);
        }
    }
    ul{
        li{
             input{
            width: 265px;
            height: 45px;
        }
        }
    }
}
</style>
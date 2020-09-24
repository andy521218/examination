<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">{{title?'编辑':'添加教师'}}</span>
      <span class="edit_switch"></span>
    </div>
    <ul>
      <li>
        <slot name="user"></slot>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">密码:</span>
        </div>
        <input :type="type" class="text_box" placeholder="请输入密码"/>
        <img src="../../assets/public/pwd.png" class="edit_pwd" alt v-if="pwdSwitch" @click="pwdShow" />
        <img src="../../assets/public/pwdmove.png" class="edit_pwd" alt v-else @click="pwdShow" />
        <p class="edit_tips">22222222222222</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">姓名:</span>
        </div>
        <input type="text" class="text_box" placeholder="请输入姓名" />
        <p class="edit_tips"></p>
      </li>
      <li>
        <slot name="select"></slot>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_text">手机号:</span>
        </div>
        <input type="text" class="text_box" placeholder="请输入手机号" />
        <p class="edit_tips"></p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_text">邮箱:</span>
        </div>
        <input type="text" class="text_box" placeholder="请输入邮箱" />
        <p class="edit_tips"></p>
      </li>
    </ul>
   <div class="edit_btn_box">
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "edit-user",
  data(){
    return{
      pwdSwitch:true,
      type:'password'
    }
  },
  props:['title'],
  methods:{
    pwdShow(){
      this.pwdSwitch=!this.pwdSwitch;
      this.pwdSwitch?this.type='password':this.type='text'
    }
  }
};
</script>

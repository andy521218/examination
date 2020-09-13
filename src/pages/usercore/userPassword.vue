<template>
  <div class="user_pwd">
    <ul>
      <li>
        <span>旧密码:</span>
        <input type="text" class="text_box" />
        <p>{{oldPwd}}</p>
      </li>
      <li>
        <span>新密码:</span>
        <input type="text" class="text_box" />
        <p>{{newPwd}}</p>
      </li>
      <li>
        <span>确认新密码:</span>
        <input type="text" class="text_box" />
        <p>{{confirmPwd}}</p>
      </li>
    </ul>
    <button class="submit">保存</button>
  </div>
</template>

<script>
export default {
  name: "user-pwd",
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
    };
  },
};
</script>

<style lang="scss">
.user_pwd {
  width: 700px;
  margin: 0 auto;
  ul {
    width: 100%;
    li {
      display: flex;
      margin-top: 80px;
      height: 45px;
      line-height: 45px;
      span {
        text-align: right;
        width: 100px;
      }
      .text_box {
        width: 325px;
        margin: 0 10px;
      }
      p{
          color:rgb(255,0,0);
      }
    }
  }
   .submit{
       width: 376px;
       height: 45px;
       margin: 200px 0 0 80px;
    }
}
</style>
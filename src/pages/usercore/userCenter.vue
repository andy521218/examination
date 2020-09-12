<template>
  <div class="user_center">
    <div class="user_top">
      <div class="user_big">
        <div class="user_small">
          <img src alt />
          <span class="edit">点击修改头像</span>
        </div>
        <span class="user_number">20200912</span>
      </div>
    </div>
    <div class="user_bottom">
      
    </div>
    <button>保存</button>
  </div>
</template>

<style lang="scss">
.user_center {
  .user_top {
    width: 99%;
    height: 315px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);
    .user_big {
      width: 215px;
      height: 215px;
      margin: 50px auto;
      border: 1px solid rgb(9, 124, 168);
      border-radius: 50%;
      .user_small {
        margin: 5px auto;
        width: 200px;
        height: 200px;
        border: 3px solid rgb(32, 85, 127);
        border-radius: 50%;
        .edit {
          position: relative;
          width: 100px;
          text-align: center;
          bottom: -225px;
          left: 55px;
        }
      }
      .user_number {
        width: 200px;
        height: 25px;
        position: relative;
        left: 240px;
        top: -115px;
        font-size: 20px;
      }
    }
  }
  .user_bottom {
    width: 800px;
    ul {
      li {
        width: 700px;
      }
    }
  }
  button{
      width: 270px;
      height: 30px;
      line-height: 30px;
      background-color:rgb(0,235,255);
      border: rgb(0,235,255);
      border-radius: 5px;
  }
}
</style>
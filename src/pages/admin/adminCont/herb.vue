<template>
  <div class="prescription diagnosis">
    <left-herb></left-herb>
    <right-herb></right-herb>
  </div>
</template>

<script>
import leftHerb from './leftHerb'
import rightHerb from './rightHerb'
export default {
  name: "prescription-diagnosis",
  components:{
    leftHerb,
    rightHerb
  }
};
</script>
<style lang="scss">
.prescription {
  .edit_btn_box {
    margin-top: 70px;
  }
  .cont_bg {
    width: 47%;
    .edit {
      top: 45px;
      left: 50%;
      margin-left: -235px;
      .select {
        width: 235px;
      }
      li {
        border: none;
        .uploadImg {
          width: 265px;
          height: 140px;
          background-color: rgb(5, 61, 118);
          border: rgb(9, 124, 168) 1px solid;
          position: relative;
          margin-right: 50px;
          input {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            opacity: 0;
          }
          img {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
          }
        }
      }
    }
    .display {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      border-bottom: none;
      margin-bottom: 10px;
      position: relative;
      .search_box {
        position: absolute;
        top: 39px;
        width: 100%;
        background-color: rgb(5, 61, 118);
        border: rgb(9, 124, 168) 1px solid;
      }
      button {
        width: 115px;
      }
      input {
        width: 500px;
      }
    }
    .flex {
      display: flex;
      span {
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: rgb(8, 75, 130);
        color: rgb(255, 255, 255);
        padding: 10px;
        width: 265px;
        height: 185px;
      }
      textarea::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgb(255, 255, 255);
      }

      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgb(255, 255, 255);
      }

      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgb(255, 255, 255);
      }

      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(255, 255, 255);
      }
    }
    li {
      // height: 40px;
      .edit_tips {
        width: 20px;
        height: 30px;
        right: 62px;
        top: 8px;
        display: inline-block;
        img {
          width: 20px;
          height: 24px;
        }
      }
      .edit_tips:hover {
        border-bottom: 2px solid rgb(255, 0, 0);
      }
    }
    .addList {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 30px;
      background: rgb(8, 75, 130);
      border: rgb(9, 124, 168) 1px solid;
      float: right;
      margin-right: 68px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .addList:hover {
      cursor: pointer;
      color: rgb(0, 235, 255);
    }
    .item_container_between_dele {
      color: rgb(252, 94, 95);
    }
    .item_container_between_dele:hover {
      border-bottom-color: rgb(252, 94, 95);
    }
  }
}
</style>
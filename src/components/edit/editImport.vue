<template>
  <div class="editimport">
    <div class="case_right">
      <div class="case_right_title">
        <span>导入学生</span>
      </div>
      <div class="case_right_cont">
        <ul>
          <li>
            <i>*</i>
            <span>第一步:</span>
          </li>
          <li>
            <button class="submit">下载模板</button>
            <div class="case_rigt_tips">
              <span>请先下载Excel模板</span>
              <span>(已有模板请执行第二步)</span>
            </div>
          </li>
          <li>
            <i>*</i>
            <span>第二步:</span>
          </li>
          <li>
            <div class="upload">
              <button class="submit">选择文件</button>
              <input type="file" @change="upload()" ref="file" />
            </div>
            <div>
              <span>仅支持Excel文件</span>
            </div>
          </li>
          <li>
            <input type="text" disabled class="disabled" />
          </li>
        </ul>
      </div>
      <div class="edit_btn_box">
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-import",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.editimport {
  position: absolute;
    left: 50%;
    margin-left: -235px ;
  z-index: 99;
  .case_right {
    width: 470px;
    background: url("../../assets/public/box_1.png") no-repeat center;
    background-size: 100% 100%;

    .case_right_title {
      width: 100%;
      text-align: center;

      span {
        font-size: 18px;
        padding: 0 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid rgb(0, 235, 255);
      }
    }

    .case_right_cont {
      height: 300px;
      width: 85%;
      margin-left: 35px;
      margin-top: 35px;

      ul {
        li {
          display: flex;
          align-items: center;
          height: 50px;
          margin-top: 10px;

          i {
            margin-top: 8px;
            margin-right: 10px;
            color: rgb(255, 0, 0);
          }

          .submit {
            color: rgb(255, 255, 255);
            width: 110px;
            margin-left: 15px;
            margin-right: 15px;
          }

          .case_rigt_tips {
            display: flex;
            flex-direction: column;
          }

          .disabled {
            width: 90%;
            height: 40px;
            margin-left: 15px;
            background: rgb(255, 255, 255);
            padding-left: 10px;
            font-size: 18px;
          }

          .upload {
            position: relative;

            input {
              width: 110px;
              height: 40px;
              position: absolute;
              left: 15px;
              top: 0;
              opacity: 0;
            }
          }
        }
      }
    }
    .edit_btn_box {
      text-align: center;
      margin-top: 50px;
      height: 100px;
      .edit_cancel {
        margin-right: 50px;
      }
    }
  }
}
</style>
<template>
  <div class="message_publish">
    <div class="publish_select">
      <label for>分类</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
    </div>
    <div class="publish_text">
      <label for>标题</label>
      <input type="text" placeholder="请输入问题标题..." maxlength="30" class="text_box" v-model="textVal" />
      <span>{{textVal.length}}/30</span>
    </div>
    <div class="publish_area">
      <label for>内容</label>
      <textarea placeholder="请输入问题内容..." v-model="textareaVal" maxlength="130"></textarea>
      <span>{{textareaVal.length}}/130</span>
    </div>
    <div class="input_file">
      <input type="file" />
    </div>
    <button class="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: "message-publish",
  data() {
    return {
      textVal: "",
      textareaVal: "",
    };
  },
};
</script>

<style lang="scss">
.message_publish {
  width: 940px;
  margin: 45px auto;
  label {
    display: inline-block;
    width: 30px;
    margin-right: 15px;
  }
  .publish_select {
    height: 45px;
    margin-top: 45px;
    .select {
      height: 100%;
      width: 250px;
      background: rgb(3, 145, 240, 0.2);
      option {
        background-color: rgb(5, 61, 118);
      }
    }
  }

  .publish_text {
    height: 45px;
    margin-top: 45px;
    position: relative;
    .text_box {
      width: 890px;
      height: 100%;
      background: rgb(26, 127, 195, 0.2);
    }
    .text_box::placeholder {
      color: rgb(110, 111, 113);
    }
    span {
      position: absolute;
      color: rgb(0, 235, 255);
      right: 20px;
      bottom: 10px;
    }
  }
  .publish_area {
    margin-top: 45px;
    height: auto;
    position: relative;
    display: flex;
    textarea {
      width: 890px;
      height: 295px;
      color: rgb(255, 255, 255);
      background: rgb(26, 127, 195, 0.2);
      padding: 20px;
    }
    span {
      position: absolute;
      color: rgb(0, 235, 255);
      right: 20px;
      bottom: 10px;
    }
  }
  .input_file {
    width: 100px;
    height: 100px;
    margin-left: 815px;
    margin-top: 25px;
    input {
      width: 100%;
      height: 100%;
      position: relative;
      outline: none;
      &::after {
        content: "+";
        line-height: 100px;
        text-align: center;
        font-size: 50px;
        color: rgb(0, 235, 255);
        width: 100px;
        height: 100px;
        position: absolute;
        border: 1px solid rgb(0, 235, 255);
        background-color: rgb(5, 61, 118);
        top: 0;
        left: 0;
      }
    }
  }
  .submit {
    width: 375px;
    height: 45px;
    margin: 40px auto;
  }
}
</style>
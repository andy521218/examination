<template>
  <div class="add_discuss">
    <div class="discuss_header">
      <span>回复同学1</span>
      <span class="discuss_icon"></span>
    </div>
    <div class="discuss_cont">
        <textarea></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-discuss",
};
</script>

<style lang="scss">
.add_discuss {
  width: 405px;
  height: 380px;
  position: absolute;
  left: 50%;
  top: 17%;
  margin-left: -202px;
  z-index: 999999;
  .discuss_header {
    height: 45px;
    background-image: linear-gradient(
      to right,
      rgb(18, 195, 237),
      rgb(47, 138, 255)
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid transparent;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    .discuss_icon {
      width: 19px;
      height: 19px;
      margin-right: 20px;
      background: url("../../assets/public/switch.png") no-repeat center;
    }
    span{
        margin-left: 25px;
    }
  }
  .discuss_cont {
    height: 335px;
    width: 100%;
    background: rgb(255, 255, 255);
    order: 1px solid transparent;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>
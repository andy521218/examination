<template>
  <div class="container">
    <div class="tab train"></div>
    <div class="tab assessment"></div>
    <div class="tab problem"></div>
    <div class="tab care"></div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
.container {
  display: flex;
  height: 393px;
  width: 1480px;
  margin: 200px auto;
  .tab {
    width: 370px;
    height: 393px;
  }
  .train {
    background: url("../assets/img/home/train.png") no-repeat center;
    background-size: 100% 100%;
  }
  .train:hover {
    background: url("../assets/img/home/trainmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .assessment {
    background: url("../assets/img/home/assessment.png") no-repeat center;
    background-size: 100% 100%;
  }
  .assessment:hover {
    background: url("../assets/img/home/assessmentmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .problem {
    background: url("../assets/img/home/problem.png") no-repeat center;
    background-size: 100% 100%;
  }
  .problem:hover {
    background: url("../assets/img/home/problemmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .care {
    background: url("../assets/img/home/care.png") no-repeat center;
    background-size: 100% 100%;
  }
  .care:hover {
    background: url("../assets/img/home/caremove.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
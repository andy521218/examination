<template>
  <div class="container">
    <div class="tab train"></div>
    <div class="tab assessment"></div>
    <div class="tab problem"></div>
    <div class="tab care"></div>
  </div>
</template>

<script>
export default {
  name:'index'
};
</script>


<style lang="scss">
.container {
  display: flex;
  height: 393px;
  width: 1480px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -197px;
  margin-left: -740px;
  .tab {
    width: 390px;
    height: 420px;
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
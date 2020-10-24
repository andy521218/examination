<template>
  <header>
    <img src="../../../assets/public/timg1.jpg" alt="" />
    <ul>
      <li>
        <span>姓名:</span>
        <span>{{ caseData.name }}</span>
      </li>
      <li>
        <span>病系:</span>
        <span>{{ caseData.diseaseTypeName }}</span>
      </li>
      <li>
        <span>性别:</span>
        <span>{{ caseData.gender ? "女" : "男" }}</span>
      </li>
      <li>
        <span>年龄:</span>
        <span>{{ caseData.age }}</span>
      </li>
      <li>
        <span>工作:</span>
        <span>退休人员</span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "case-header",
  props: ["caseData"],
};
</script>
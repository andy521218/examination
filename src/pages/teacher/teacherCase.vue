<template>
  <div class="teacher case">
    <!-- 删除案例 -->
    <edit-dele :edit_title="`删除`" v-if="allShow">
      <template v-slot:edit_p>
        <p>{{ text }}</p>
        <p class="edit_dele_p">{{ itps }}</p>
      </template>
    </edit-dele>
    <!-- 设为考核案例 -->

    <edit-dele :edit_title="`设为考核案例`" v-if="allShow">
      <template v-slot:edit_p>
        <p>{{ text }}</p>
        <p class="edit_dele_p">{{ itps }}</p>
      </template>
    </edit-dele>

    <!-- 新增案例 -->
    <add-case v-if="addCase"></add-case>
    <div class="main_header">
      <button class="add" @click="add">新增案例</button>
      <button class="add_case one" @click="addAssessment">设为考核案例</button>
      <button class="add_case two">设为训练案例</button>
      <label for>病系</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for>分类</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <ul class="caseList">
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit" @click="link">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
        <li>
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>张三</span>
            <span>性别: 女</span>
            <span>年龄: 75岁</span>
          </div>
        </li>
      </ul>
    </div>
    <turn-page></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editDele from "../../components/edit/editDele";
import addCase from "../../components/edit/addCase";
export default {
  name: "teacher-case",
  components: {
    turnPage,
    editDele,
    addCase,
  },
  data() {
    return {
      addCase: false,
      allShow: false,
      text: "",
      itps: "",
    };
  },
  methods: {
    dele() {
      this.text = "确定删除案例?";
      this.itps = "(删除后无法找回)";
      this.allShow = true;
    },
    add() {
      this.addCase = true;
    },
    addAssessment() {
      this.text = "确定将选中的案例设为考核案例?";
      this.itps = "(设置后无法更改)";
      this.allShow = true;
    },
    link(){
      this.$router.push('/case')
    }
  },
};
</script>

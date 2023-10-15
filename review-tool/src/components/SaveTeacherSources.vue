<template>
  <div class="hello" style="position: relative;left:  10%;width: 80%">
    <H1>填入本周课程吧</H1>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="600">
      <el-table-column
        fixed
        prop="course"
        label="课程"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mon.courseName"
        label="周一(Mon)"
        width="200">
        <template slot-scope="scope">
          <span> {{ scope.row.mon.courseName }} </span>
          <el-checkbox v-for="todoItem in scope.row.mon.todoTask"
                       :label="todoItem.title" :key="todoItem.id"
                       :checked="todoItem.status===1">
            <span @mouseover="showDetail(todoItem.id)">{{ todoItem.title }}</span>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="tue.courseName"
        label="周二(Tue)"
        width="200">

        <template slot-scope="scope">
          <span> {{ scope.row.tue.courseName }} </span>
          <el-checkbox v-for="todoItem in scope.row.tue.todoTask"
                       :label="todoItem.title" :key="todoItem.id"
                       :checked="todoItem.status===1">
            <span @mouseover="showDetail(todoItem.id)">{{ todoItem.title }}</span>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="wed.courseName"
        label="周三(Wed)"
        width="200">
        <template slot-scope="scope">
          <span> {{ scope.row.wed.courseName }} </span>
          <el-checkbox v-for="todoItem in scope.row.wed.todoTask"
                       :label="todoItem.title" :key="todoItem.id"
                       :checked="todoItem.status===1">
            <span @mouseover="showDetail(todoItem.id)">{{ todoItem.title }}</span>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="thu.courseName"
        label="周四(Thu)"
        width="200">
        <template slot-scope="scope">
          <span> {{ scope.row.thu.courseName }} </span>
          <el-checkbox v-for="todoItem in scope.row.thu.todoTask"
                       :label="todoItem.title" :key="todoItem.id"
                       :checked="todoItem.status===1">
            <span @mouseover="showDetail(todoItem.id)">{{ todoItem.title }}</span>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="fri.courseName"
        label="周五(Fri)"
        width="200">
        <template slot-scope="scope">
          <span> {{ scope.row.fri.courseName }} </span>
          <el-checkbox v-for="todoItem in scope.row.fri.todoTask"
                       :label="todoItem.title" :key="todoItem.id"
                       :checked="todoItem.status===1"
                       style="width: 100px">
            <span @mouseover="showDetail(todoItem.id)">{{ todoItem.title }}</span>
          </el-checkbox>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      :title="'【' + showCourseTitle + '】课程明细'"
      :before-close="handleClose"
      :visible.sync="dialog"
      size="80%"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="课程提纲" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.subject" autocomplete="off" style="width: 80%" rows="5"></el-input>
          </el-form-item>
          <el-form-item label="复习要领" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.reviewPoint" autocomplete="off" style="width: 80%" rows="5"></el-input>
          </el-form-item>
          <el-form-item label="巩固扩展" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.strengthen" autocomplete="off" style="width: 80%" rows="5"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  components: {
    // 含义及声明，哪些可以写在这
  },

  name: 'SaveTeacherSources',
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        subject: '',
        reviewPoint: '',
        strengthen: ''
      },
      formLabelWidth: '80px',
      //
      tableData: [{
        course: '',
        mon: {
          courseName: '国际数学',
          todoTask: []
        },
        tue: {
          courseName: '中国舞',
          todoTask: []
        },
        wed: {
          courseName: '小主持',
          todoTask: []
        },
        thu: {
          courseName: '小酷科学',
          todoTask: []
        },
        fri: {
          courseName: 'FridayEnglish',
          todoTask: []
        }
      }],
      workDay: ['mon', 'tue', 'wed', 'thu', 'fri'],
      workDayCn: {'mon': '周一', 'tue': '周二', 'wed': '周三', 'thu': '周四', 'fri': '周五'},
      workDayCourses: {'mon': ['国际数学'], 'tue': ['中国舞'], 'wed': ['小主持'], 'thu': ['小酷科学'], 'fri': ['FridayEnglish']},
      taskName: ['整理提纲/Subject', '复习/Review', '巩固扩展/Strengthen'],
      reviewRules: {
        '国际数学': ['握笔姿势', '数字认识', '数字理解', '数字写法'],
        '中国舞': ['儿歌循环', '动作示范', '动作要领', '错误纠正'],
        '小主持': ['情绪状态', '仪容仪态', '讲述内容'],
        '小酷科学': ['科学主题', '主题理解', '手工制作'],
        'FridayEnglish': ['核心单词', '核心语句']
      },
      showCourseId: '',
      showCourseTitle: ''
    }
  },
  computed: {},
  filters: {},
  async created () {

  },
  mounted () {
    this.initTodo()
  },
  methods: {
    initTodo () {
      for (let i = 0; i < this.tableData.length; i++) {
        let tableRow = this.tableData[i]
        tableRow.course = 'Course' + (i + 1)
        for (let di = 0; di < this.workDay.length; di++) {
          let dayName = this.workDay[di]

          for (let ti = 0; ti < this.taskName.length; ti++) {
            let taskTitle = this.taskName[ti]
            tableRow[dayName].todoTask.push({
              id: dayName + '.' + (ti + 1),
              title: taskTitle,
              status: 0
            })
          }
        }
      }
    },
    showDetail (itemId) {
      this.showCourseId = itemId
      let that = this
      setTimeout(function () {
        if (that.showCourseId === itemId) {
          console.log('显示一下%O', itemId)
          let dayEn = itemId.substring(0, 3)
          console.log('dayEn =%O', dayEn)
          let courseIndex = itemId.substring(4, itemId.length)
          let dayCn = that.workDayCn[dayEn]
          console.log('dayCn =%O', dayCn)
          let courseName = that.workDayCourses[dayEn][0]
          that.showCourseTitle = dayCn + '.' + that.workDayCourses[dayEn][0]
          console.log('showCourseTitle=%O', that.showCourseTitle)
          that.dialog = true

          that.showDialogContent(dayEn, courseIndex, dayCn, courseName)
        } else {
          // console.log('%O,%O', that.showCourseId, itemId)
        }
      }, 1000)
    },
    handleClose () {
      this.dialog = false
    },
    cancelForm () {
      this.dialog = false
    },
    showDialogContent (en, courseIndex, cn, courseName) {
      let allRules = this.reviewRules[courseName]
      let content = ''
      for (let i = 0; i < allRules.length; i++) {
        content += ((i + 1) + allRules[i] + '\n')
      }
      this.form.subject = content
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

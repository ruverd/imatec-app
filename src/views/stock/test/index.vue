<template>
  <div class="row">
    <el-row style="margin-bottom:32px;">
      <el-card class="box-card">

        <!-- Header -->
        <div slot="header" class="clearfix">
          <span style="height: 40px;">Categoria de Produto</span>
          <el-button-group style="float: right;">
            <el-tooltip class="item" effect="dark" content="Adicionar" placement="top-end">
              <el-button v-waves plain icon="el-icon-plus" size="medium" @click="dialogFormVisible = true"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Opções" placement="top-end">
              <el-dropdown>
                <el-button plain icon="el-icon-more" size="medium"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-document el-icon--left"></i>Manual</el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-service el-icon--left"></i>Chamado</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
          </el-button-group>
        </div>

        <!-- Form -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="Online activities" name="type"></el-checkbox>
              <el-checkbox label="Promotion activities" name="type"></el-checkbox>
              <el-checkbox label="Offline activities" name="type"></el-checkbox>
              <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="Sponsorship"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary" @click="submitForm('ruleForm')" icon="el-icon-search">Pesquisar</el-button>
            <el-button v-waves @click="resetForm('ruleForm')" icon="el-icon-refresh">Limpar</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>

    <!-- Data Tables -->
    <el-row>
      <el-card class="box-card">
        <data-tables-server :data="data" :total="total" :actions-def="actionsDef" :table-props="tableProps" :load-data="loadData" :search-def="searchDef">
          <el-table-column label="Ação" width="110px">
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip class="item" v-for="button in customButtonsForRow(scope.row)" :key="button.name" effect="dark" :content="button.tooltip" :placement="button.placement">
                  <el-button  plain :icon="button.icon" size="mini" @click="button.handler"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
          </el-table-column>
        </data-tables-server>
      </el-card>
    </el-row>

    <!-- Dialog -->
    <el-dialog title="Adicionar Categoria" :visible.sync="dialogFormVisible" width="90%" top="10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Informação" name="first">
          <el-form :model="form" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Activity name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone" prop="region">
              <el-select v-model="ruleForm.region" placeholder="Activity zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button v-waves type="success" @click="submitForm('ruleForm')" icon="el-icon-plus">Gravar</el-button>
              <el-button v-waves type="danger" @click="submitForm('ruleForm')" icon="el-icon-error">Excluir</el-button>
              <el-button v-waves @click="resetForm('ruleForm')" icon="el-icon-refresh">Limpar</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Tabela" name="second">
          <data-tables-server :data="data" :total="total" :actions-def="actionsDef" :table-props="tableProps" :load-data="loadData" :search-def="searchDef">
            <el-table-column label="Ação" width="110px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip class="item" v-for="button in customButtonsForRow(scope.row)" :key="button.name" effect="dark" :content="button.tooltip" :placement="button.placement">
                    <el-button  plain :icon="button.icon" size="mini" @click="button.handler"></el-button>
                  </el-tooltip>
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
            </el-table-column>
          </data-tables-server>
        </el-tab-pane>
        <el-tab-pane label="Disabled" name="thrird" disabled>
          <data-tables-server :data="data" :total="total" :actions-def="actionsDef" :table-props="tableProps" :load-data="loadData" :search-def="searchDef">
            <el-table-column label="Ação" width="110px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip class="item" v-for="button in customButtonsForRow(scope.row)" :key="button.name" effect="dark" :content="button.tooltip" :placement="button.placement">
                    <el-button  plain :icon="button.icon" size="mini" @click="button.handler"></el-button>
                  </el-tooltip>
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
            </el-table-column>
          </data-tables-server>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>

</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import json2csv from 'json2csv'

// fake server
const serverData = []
for (let i = 0; i < 1000; i++) {
  serverData.push({
    'content': 'Lock broken' + i,
    'flow_no': 'FW20160101000' + i,
    'flow_type': i % 2 === 0 ? 'Repair' : 'Help',
    'flow_type_code': i % 2 === 0 ? 'repair' : 'help'
  })
}

const mockServer = function(res) {
  var datas = serverData.slice()
  const allKeys = Object.keys(datas[0])

  // do filter
  res.filters.forEach(filter => {
    datas = datas.filter(data => {
      const props = filter.props || allKeys
      return props.some(prop => {
        if (!filter.vals || filter.vals.length === 0) {
          return true
        }
        return filter.vals.some(val => {
          return data[prop].toString().toLowerCase().indexOf(val.toLowerCase()) > -1
        })
      })
    })
  })

  // do sort
  if (res.sortInfo.order) {
    const order = res.sortInfo.order
    const prop = res.sortInfo.prop
    const isDescending = order === 'descending'

    datas.sort(function(a, b) {
      if (a[prop] > b[prop]) {
        return 1
      } else if (a[prop] < b[prop]) {
        return -1
      } else {
        return 0
      }
    })
    if (isDescending) {
      datas.reverse()
    }
  }

  return {
    data: datas.slice((res.page - 1) * res.pageSize, res.page * res.pageSize),
    req: res,
    ts: new Date(),
    total: datas.length
  }
}

const CsvExport = function(data, fields, fieldNames, fileName) {
  try {
    var result = json2csv({
      data: data,
      fields: fields,
      fieldNames: fieldNames
    })
    var csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
    var encodedUri = encodeURI(csvContent)
    var link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${(fileName || 'file')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

let i = 1

// fake http
function http(res, time = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      i++ % 5 !== 0
        ? resolve(mockServer(res))
        : reject('network error')
    }, time)
  })
}

export default {
  name: 'stockCategoriesList',
  components: { },
  directives: {
    waves
  },
  data() {
    return {
      data: [],
      titles: [
        {
          prop: 'flow_no',
          label: 'Código'
        },
        {
          prop: 'content',
          label: 'Conteúdo'
        },
        {
          prop: 'flow_type',
          label: 'Tipo'
        }
      ],
      total: 0,
      tableProps: {
        defaultSort: {
          prop: 'flow_no',
          order: 'ascending'
        }
      },
      searchDef: {
        inputProps: {
          placeholder: 'Digite para buscar...'
        }
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please input activity form', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '800',
      activeName: 'first'
    }
  },
  created() {
    const columns = ['flow_no', 'content', 'flow_type']
    const columnNames = ['Código', 'Conteúdo', 'Tipo']
    this.actionsDef = {
      colProps: {
        span: 19
      },
      def: [{
        name: 'Exportar',
        type: 'plain',
        handler: () => {
          CsvExport(this.data, columns, columnNames, 'CategoriaProduto')
        },
        icon: 'el-icon-download'
      }]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    customButtonsForRow(row) {
      if (row.flow_no) {
        return [
          {
            name: 'edit',
            tooltip: 'Editar',
            placement: 'left-start',
            icon: 'el-icon-edit',
            handler: _ => {
              this.$notify({
                title: 'Successo',
                message: `Editar registro ${row.flow_no}`,
                type: 'success'
              })
            }
          },
          {
            name: 'document',
            tooltip: 'Visualizar Documento',
            placement: 'right-start',
            icon: 'el-icon-document',
            handler: _ => {
              this.$message(`Visualizar Documento ${row.flow_no}`)
              console.log(`Visualizar Documento ${row.flow_no}`)
            }
          }
        ]
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    loadData(queryInfo) {
      return http(queryInfo, 1000)
        .then(data => {
          this.data = data.data
          this.total = data.total
        })
        .catch(error => {
          this.$message(error)
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-dialog__body {
    padding-top: 0 !important;
  }
</style>
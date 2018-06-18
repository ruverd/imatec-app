<template>
  <div class="row">
    <el-row style="margin-bottom:32px;">
      <el-card class="box-card">

        <!-- Header -->
        <div slot="header" class="clearfix">
          <span style="height: 40px;">Organizações</span>
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
          <el-form-item label="Nome" prop="name" >
            <el-input v-model="ruleForm.name" placeholder="Digite a organização ou parte dela"></el-input>
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
    <el-dialog title="Adicionar Organização" :visible.sync="dialogFormVisible" width="90%" top="10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Informação" name="first">
          <el-form :model="form" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="ruleForm.name" ref="focus"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-waves type="success" @click="submitForm('ruleForm')" icon="el-icon-plus">Gravar</el-button>
              <el-button v-waves type="danger" @click="submitForm('ruleForm')" icon="el-icon-error">Excluir</el-button>
              <el-button v-waves @click="resetForm('ruleForm')" icon="el-icon-refresh">Limpar</el-button>
            </el-form-item>
          </el-form>
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
    'id': i,
    'name': 'FW20160101000' + i
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
  name: 'organizationOrganizationsList',
  components: { },
  directives: {
    waves
  },
  data() {
    return {
      data: [],
      titles: [
        {
          prop: 'name',
          label: 'Nome'
        }
      ],
      total: 0,
      tableProps: {
        defaultSort: {
          prop: 'name',
          order: 'ascending'
        }
      },
      searchDef: {
        inputProps: {
          placeholder: 'Digite para buscar...'
        }
      },
      ruleForm: {
        name: ''
      },
      rules: {

      },
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '800',
      activeName: 'first'
    }
  },
  created() {
    const columns = ['name']
    const columnNames = ['Nome']
    this.actionsDef = {
      colProps: {
        span: 19
      },
      def: [{
        name: 'Exportar',
        type: 'plain',
        handler: () => {
          CsvExport(this.data, columns, columnNames, 'Organizacao')
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
      if (row.name) {
        return [
          {
            name: 'edit',
            tooltip: 'Editar',
            placement: 'left-start',
            icon: 'el-icon-edit',
            handler: _ => {
              this.$notify({
                title: 'Successo',
                message: `Editar registro ${row.name}`,
                type: 'success'
              })
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
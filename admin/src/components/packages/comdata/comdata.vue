<template>
      <div>
        <el-tabs v-model="activeName"  @tab-click="getTab">
            <el-tab-pane label="组件" name="metauicom">
                 <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                             <el-form :model="props.row" status-icon ref="attrData" label-width="100px">
                    <el-form-item label="组件别名:">
                        <el-input v-model="props.row.chname"></el-input>
                    </el-form-item>
                    <el-form-item label="组件名:">
                        <el-input v-model="props.row.enname"></el-input>
                    </el-form-item>
                    <el-form-item label="组件类型:">
                        <el-input v-model="props.row.type"></el-input>
                    </el-form-item>
                    <template v-for="data in props.row.attrs">
                        <el-form-item label="组件属性:">
                            <el-form :inline="true" :model="data" class="demo-form-inline">
                                <el-form-item>
                                    <el-select v-model="data.attrtype">
                                        <el-option label="class" value="class"></el-option>
                                        <el-option label="style" value="style"></el-option>
                                        <el-option label="attrs" value="attrs"></el-option>
                                        <el-option label="props" value="props"></el-option>
                                        <el-option label="domProps" value="domProps"></el-option>
                                        <el-option label="on" value="on"></el-option>
                                        <el-option label="nativeOn" value="nativeOn"></el-option>
                                        <el-option label="slot" value="slot"></el-option>
                                        <el-option label="key" value="key"></el-option>
                                        <el-option label="ref" value="ref"></el-option>
                                        <el-option label="text" value="text"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="属性名">
                                    <el-input v-model="data.attrname"></el-input>
                                </el-form-item>
                                <el-form-item label="属性值">
                                    <el-input v-model="data.value"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click.prevent="removeAttr(data,props.row)">删除</el-button>
                                </el-form-item>
                            </el-form>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button @click.prevent="saveAttr(props.row)">保存</el-button>
                        <el-button @click.prevent="addAttr(props.row)">新增属性</el-button>
                        <el-button @click.prevent="delAttr(props.row)">删除</el-button>
                        <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                    </el-form-item>
                </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="组件别名" prop="chname">
                    </el-table-column>
                    <el-table-column label="组件名" prop="enname">
                    </el-table-column>
                    <el-table-column label="组件类型" prop="type">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="页面" name="metauipage">
                 <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                             <el-form :model="props.row" status-icon ref="attrData" label-width="100px">
                    <el-form-item label="组件别名:">
                        <el-input v-model="props.row.chname"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示:">
                        <el-switch v-model="props.row.isshow" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="关联组件:">
                        <el-select v-model="props.row.com_id" @change="getComAttr(props.row)">
                            <template  v-for="item in comData">
                                <el-option :label='item.chname+"("+item.enname+")"' :value="item._id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="isShowAttr">
                        <template  v-for="item in props.row.comattrs">
                            <el-form :inline="true" :model="item">
                                <el-form-item>
                                     <el-input v-model="item.attrtype"></el-input>
                                </el-form-item>
                                <el-form-item label="属性名">
                                    <el-input v-model="item.attrname"></el-input>
                                </el-form-item>
                                <el-form-item label="属性值">
                                    <el-input v-model="item.value"></el-input>
                                </el-form-item>
                                <el-form-item label="函数">
                                    <el-input v-model="item.func"></el-input>
                                </el-form-item>
                                <el-form-item label="禁用">
                                    <el-switch v-model="item.disable" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-form-item>
                    <template  v-for="data in props.row.attrs">
                        <el-form-item label="子组件:">
                            <el-form :inline="true" :model="data" class="demo-form-inline">
                                <el-form-item>
                                    <el-select v-model="data.com_id" @change="getComAttr(data)">
                                        <template v-for="item in comData">
                                            <el-option :label='item.chname+"("+item.enname+")"' :value="item._id"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="data.sort"></el-input>
                                </el-form-item>
                                <el-form-item label="是否显示">
                                    <el-switch v-model="data.isshow" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click.prevent="removeAttr(data,props.row)">删除</el-button>
                                </el-form-item>
                            </el-form>
                            <el-form :inline="true" :model="value" class="demo-form-inline" v-for="value in data.comattrs" v-if="isShowAttr" :key="value.key">
                                <el-form-item>
                                    <el-input v-model="value.attrtype"></el-input>
                                </el-form-item>
                                <el-form-item label="属性名">
                                    <el-input v-model="value.attrname"></el-input>
                                </el-form-item>
                                <el-form-item label="属性值">
                                    <el-input v-model="value.value"></el-input>
                                </el-form-item>
                                <el-form-item label="函数">
                                    <el-input v-model="value.func"></el-input>
                                </el-form-item>
                                <el-form-item label="禁用">
                                    <el-switch v-model="value.disable" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                            </el-form>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button @click="showAttr()">{{showText}}</el-button>
                        <el-button @click.prevent="addAttr(props.row)">新增子组件</el-button>
                        <el-button type="danger"@click.prevent="delAttr(props.row)">删除</el-button>
                        <el-button type="success" @click.prevent="saveAttr(props.row)">保存</el-button>
                        <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                    </el-form-item>
                </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="组件别名" prop="chname">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="项目" name="metauiproject">
                <el-tree
                    :data="cateTree"
                    :props="defaultProps"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="数据模型" name="metauimodel">
                 <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                             <el-form :model="props.row" status-icon ref="attrData" label-width="100px">
                    <el-form-item label="模型别名:">
                        <el-input v-model="props.row.chname"></el-input>
                    </el-form-item>
                    <el-form-item label="模型名:">
                        <el-input v-model="props.row.modelname"></el-input>
                    </el-form-item>
                    <el-form-item label="模型库名:">
                        <el-input v-model="props.row.dbname"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示:">
                        <el-switch v-model="props.row.isshow" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <template  v-for="data in props.row.attrs">
                        <el-form-item label="模型字段:">
                            <el-form  :model="data" label-position='right'>
                                <el-form-item label="属性别名">
                                    <el-input v-model="data.attrname" style="width: 80%"></el-input>
                                </el-form-item>
                                <el-form-item label="属性名">
                                    <el-input v-model="data.attrfield" style="width: 80%"></el-input>
                                </el-form-item>
                                <el-form-item label="属性值">
                                    <el-input v-model="data.value"  style="width: 80%"></el-input>
                                </el-form-item>
                                <el-form-item label="函　数">
                                    <el-input v-model="data.func"  style="width: 80%"></el-input>
                                </el-form-item>
                                <el-form-item label="校  验">
                                    <el-switch v-model="data.isvalidate" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="禁　用">
                                    <el-switch v-model="data.disable" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click.prevent="removeAttr(data,props.row)">删除</el-button>
                                </el-form-item>
                            </el-form>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button @click.prevent="addAttr(props.row)">新增模型</el-button>
                        <el-button type="danger"@click.prevent="delAttr(props.row)">删除</el-button>
                        <el-button type="success" @click.prevent="saveAttr(props.row)">保存</el-button>
                        <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                    </el-form-item>
                </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="数据模型" prop="chname">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="校验" name="metauirules">
                 <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                             <el-form :model="props.row" status-icon ref="rulesData" label-width="100px">
                    <el-form-item label="校验名:">
                        <el-input v-model="props.row.chname"></el-input>
                    </el-form-item>
                    <template v-for="data in props.row.rules">
                        <el-form-item label="校验规则:">
                            <el-form :inline="true" :model="data" class="demo-form-inline">
                                <el-form-item>
                                    <el-select v-model="data.ruletype">
                                        <el-option label="required" value="required"></el-option>
                                        <el-option label="message" value="message"></el-option>
                                        <el-option label="trigger" value="trigger"></el-option>
                                        <el-option label="min" value="min"></el-option>
                                        <el-option label="max" value="max"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="校验值">
                                    <el-switch v-model="data.ruleval" active-color="#13ce66" inactive-color="#ff4949" v-if="data.ruletype=='required'">
                                    </el-switch>
                                    <el-input v-model="data.ruleval" v-else></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click.prevent="removeAttr(data,props.row)">删除</el-button>
                                </el-form-item>
                            </el-form>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button @click.prevent="saveAttr(props.row)">保存</el-button>
                        <el-button @click.prevent="addAttr(props.row)">新增属性</el-button>
                        <el-button @click.prevent="delAttr(props.row)">删除</el-button>
                        <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                    </el-form-item>
                </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="校验名" prop="chname">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="模板" name="metauitpl">
                <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                                <el-input v-model="props.row.name"></el-input>
                                <el-select v-model="props.row.model_id" placeholder="请选择模型" @change="gettpmmodeldata(props.row)">
                                    <el-option
                                    v-for="item in modelsData"
                                    :key="item._id"
                                    :label="item.chname"
                                    :value="item._id">
                                    </el-option>
                                </el-select>         
                                <el-select v-model="props.row.tpltype" placeholder="请选择模板类型">
                                    <el-option label="table" value="table"></el-option>
                                    <el-option label="form" value="form"></el-option>
                                    <el-option label="search" value="search"></el-option>
                                    <el-option label="api" value="api"></el-option>
                                 </el-select>
                            <el-transfer v-model="props.row.tplFiled" :data="props.row.modelfiled" :props="{key:'key',label: 'attrname'}" :titles="['默认字段', '需求字段']" @change="">
                            </el-transfer>
                            <div>
                                <template>
                                    <el-table data="[]" stripe style="width: 100%" @header-click="setComData" :datatpl="props.row._id">
                                        <template  v-for="item in searchData(props.row)">   
                                            <el-table-column :prop="item.attrfield" :label="item.attrname" width="180">  
                                            </el-table-column>
                                        </template> 
                                    </el-table>
                                </template>
                                <el-dialog title="设置组件" :visible.sync="isShowComattr">
                                    <el-form :model="tplcomattrinfo">
                                            <el-form-item label="排序:">
                                                <el-input v-model="tplcomattrinfo.sort"></el-input>
                                            </el-form-item>
                                            <el-form-item label="宽度:">
                                                <el-input v-model="tplcomattrinfo.width"></el-input>
                                            </el-form-item>
                                             <el-form-item label="显示:">
                                                <el-switch v-model="tplcomattrinfo.isshow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                            </el-form-item>
                                            <el-form-item label="关联组件:">
                                                <el-select v-model="tplcomattrinfo.com_id" @change="getComAttr(tplcomattrinfo)">
                                                    <template  v-for="item in comData">
                                                        <el-option :label='item.chname+"("+item.enname+")"' :value="item._id"></el-option>
                                                    </template>
                                                </el-select>
                                            </el-form-item>
                                            <template  v-for="item in tplcomattrinfo.comattrs">
                                                <el-form-item>
                                                    <el-form :inline="true" :model="item">
                                                        <el-form-item>
                                                            <el-input v-model="item.attrtype"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="属性名">
                                                            <el-input v-model="item.attrname"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="属性值">
                                                            <el-input v-model="item.value"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="函数">
                                                            <el-input v-model="item.func"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="模板">
                                                            <el-select v-model="item.tpl_id">
                                                                <template  v-for="obj in tpltotalData">
                                                                    <el-option :label="obj.name" :value="obj._id"></el-option>
                                                                </template>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="禁用">
                                                            <el-switch v-model="item.disable" active-color="#13ce66" inactive-color="#ff4949">
                                                            </el-switch>
                                                        </el-form-item>
                                                    </el-form>
                                                    </el-form-item>
                                            </template>
                                            <el-form-item label="是否校验:">
                                                <el-switch v-model="tplcomattrinfo.isRules" active-color="#13ce66" inactive-color="#ff4949">
                                                </el-switch>
                                            </el-form-item>
                                            <el-form-item v-if="tplcomattrinfo.isRules">
                                                <el-select v-model="tplcomattrinfo.rules_id" multiple @change="getRulesData(tplcomattrinfo)">
                                                    <template  v-for="item in saverulesData">
                                                        <el-option :label="item.chname" :value="item._id"></el-option>
                                                    </template>
                                                </el-select>
                                            </el-form-item>
                                            <template  v-for="item in tplcomattrinfo.rules">
                                                <el-form-item>
                                                   <template  v-for="obj in item"> 
                                                        <el-form :inline="true" :model="obj">
                                                            <el-form-item label="类型">
                                                                <el-select v-model="obj.ruletype">
                                                                    <el-option label="required" value="required"></el-option>
                                                                    <el-option label="message" value="message"></el-option>
                                                                    <el-option label="trigger" value="trigger"></el-option>
                                                                    <el-option label="min" value="props"></el-option>
                                                                    <el-option label="max" value="domProps"></el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                            <el-form-item label="校验值">
                                                                <el-switch v-model="obj.ruleval" active-color="#13ce66" inactive-color="#ff4949" v-if="obj.ruletype=='required'">
                                                                </el-switch>
                                                                <el-input v-model="obj.ruleval" v-else></el-input>
                                                            </el-form-item>
                                                            <el-form-item label="禁用">
                                                                <el-switch v-model="obj.disable" active-color="#13ce66" inactive-color="#ff4949">
                                                                </el-switch>
                                                            </el-form-item>
                                                        </el-form>
                                                    </template>
                                                </el-form-item>
                                            </template>
                                        </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button type="primary" @click="savetplcom(props.row)">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </div>
                            <el-button type="danger"@click.prevent="setBack(props.row)">恢复</el-button>
                            <el-button type="danger"@click.prevent="delAttr(props.row)">删除</el-button>
                            <el-button type="success" @click.prevent="saveAttr(props.row)">保存</el-button>
                            <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="组件名" prop="name">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="模板页面" name="metauitplpage">
                 <el-table :data="totalData" style="width: 100%">
                    <el-table-column type="expand">
                       <template scope="props">
                             <el-form :model="props.row" status-icon ref="attrData" label-width="100px">
                                <el-form-item label="模板名:">
                                    <el-input v-model="props.row.name"></el-input>
                                </el-form-item>
                                <el-form-item label="是否显示:">
                                    <el-switch v-model="props.row.isshow" active-color="#13ce66" inactive-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="关联模板:">
                                    <template v-for="item in props.row.tpldata">
                                        <el-form :inline="true" :model="item" class="demo-form-inline">
                                            <el-form-item>
                                               <el-select v-model="item.tpl_id" @change="getComAttr(item)">
                                                     <template  v-for="value in tpltotalData">
                                                        <el-option :label="value.name" :value="value._id"></el-option>
                                                     </template>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="排序">
                                                <el-input v-model="item.sort"></el-input>
                                            </el-form-item>
                                            <el-form-item label="是否显示">
                                                <el-switch v-model="item.isshow" active-color="#13ce66" inactive-color="#ff4949">
                                                </el-switch>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button @click.prevent="removeTpl(item,props.row.tpldata)">删除</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click.prevent="addAttr(props.row.tpldata)">新增模板</el-button>
                                    <el-button type="danger"@click.prevent="delAttr(props.row)">删除</el-button>
                                    <el-button type="success" @click.prevent="saveAttr(props.row)">保存</el-button>
                                    <el-button type="primary" @click="submitForm(props.row)">复制</el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="组件别名" prop="name">
                    </el-table-column>
                </el-table> 
            </el-tab-pane>
            <el-tab-pane label="菜单" name="metauimenu">
                <el-tree
                    :data="cateTree"
                    :props="defaultProps"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderMenuContent">
                </el-tree>
                <el-dialog title="设置模块" :visible.sync="isshowModel">
                    <el-form :model="menuModel">
                        <el-form-item label="菜单名" :label-width="formLabelWidth">
                            <el-input v-model="menuModel.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="路径" :label-width="formLabelWidth">
                            <el-input v-model="menuModel.to" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="模板页面" :label-width="formLabelWidth">
                            <el-select v-model="menuModel.tpl_id" placeholder="请选择">
                                <el-option
                                v-for="item in tplpageData"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图标" :label-width="formLabelWidth">
                            <el-input v-model="menuModel.icon" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="排序" :label-width="formLabelWidth">
                            <el-input v-model="menuModel.sort" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="显示" :label-width="formLabelWidth">
                            <el-switch v-model="menuModel.isshow" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveMenu">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="设计" name="metauidesign">
                <el-container>
                    <el-aside  style="background:#EDF2FC">
                        <el-tabs v-model="designActive" type="border-card" @tab-click="handleClick">
                            <el-tab-pane label="组件" name="comtotal">
                                <el-card class="box-card">
                                    <div v-for="item in designData.comtotal"  class="text item">
                                         {{item.chname}}
                                    </div>
                                 </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="图标" name="icontotal">
                                <el-card class="box-card">
                                    <div class="text item">
                                         图标
                                    </div>
                                 </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="页面" name="pagetotal">
                                <el-card class="box-card">
                                    <div v-for="item in designData.pagetotal"  class="text item">
                                         {{item.chname}}
                                    </div>
                                 </el-card>
                            </el-tab-pane>
                        </el-tabs>
                    </el-aside>
                    <el-main>Main</el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="测试" name="123">
                <el-table :data="ceshidata" style="width: 100%">
                    <el-table-column
                        prop="ceshibabababab"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'comdata',
    data() {
        return {
            ceshidata: [{
            ceshibabababab: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            ceshibabababab: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }],
            isRules: false,
            datevalue: '',
            designActive: 'comtotal',
            isShowComattr: false,
            showModel: false,
            isshowModel: false,
            showText: '编辑属性',
            activeName: 'metauicom',
            tplFiled: [],
            tplmodeldata: [],
            tableData: [],
            saverulesData: [],
            attrData: {
                chname: '组件名',
                enname: '',
                type: '',
                attrs: [{ attrtype: '', attrname: '', value: '', func: '', disable: false, key: Date.now() }],
                _id: 0,
            },
            pageData: {
                chname: '表单',
                com_id: '',
                attrs: [{ com_id: '', sort: 0, isshow: true }],
                isshow: true,
                _id: 0,
            },
            rulesData: {
                chname: '校验名',
                rules: [{ ruletype: '', ruleval: '', key: Date.now() }],
                _id: 0
            },
            modelData: {
                chname: '表单',
                modelname: '',
                dbname: '',
                attrs: [
                    {
                        attrname: '',
                        attrfield: '',
                        value: '',
                        func: '',
                        isvalidate: false,
                        disable: false,
                        key: Date.now()
                    },
                ],
                isshow: true,
                _id: 0,
            },
            templateData: {
                model_id: '',
                name: '默认名称',
                tplFiled: [],
                tpltotalfield: [],
                tpltype: '',
                _id: 0
            },
            totalData: [],
            comData: [],
            tpltotalData: [],
            cateTree: [],
            sellabel: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tplmodledata: [],
            pagetotal: [],
            menuModel: {},
            tplcomattrinfo: {
                com_id: '',
                comattrs: [],
                width: '',
                attr: '',
                value: '',
                func: '',
                disable: false
            },
            tpltotalfield: [],
            tplcomdata: [],
            modelsData: [],
            tableData: [],
            tplData: [],
            tplpageData: [],
            designData: {
                comtotal: [],
                pagetotal: []
            }
        }
    },
    created() {
        this.getData()
        this.getPageData()
        this.getTree()
        this.getModel()
    },
    mounted() {
    },
    computed: {

    },
    methods: {
        savetplcom(data) {
            let index = _.findIndex(this.tpltotalfield, { attrname: this.sellabel })
            if (index == '-1') {
                this.tpltotalfield.push(JSON.parse(JSON.stringify(this.tplcomattrinfo)))
            } else {
                this.tpltotalfield[index] = JSON.parse(JSON.stringify(this.tplcomattrinfo))
            }
            this.putHttp('meta', 'metauitpl', data._id, { tpltotalfield: this.tpltotalfield }).then(obj => {
                console.log('savetpl', obj)
                this.isShowComattr = false
            })
        },
        searchId(data) {
            let id = null
            let attrdata = data.parentElement.attributes
            if (attrdata.datatpl) {
                id = attrdata.datatpl.nodeValue
            } else {
                id = this.searchId(data.parentElement)
            }
            return id
        },
        setComData(column, event) {
            let id = this.searchId(event.target)
            let tplsel = _.find(this.totalData, { _id: id })
            let fliedLabel = column.label
            console.log('column---', column)
            let attrfield = column.property
            this.sellabel = fliedLabel
            this.isShowComattr = true
            this.tpltotalfield = tplsel.tpltotalfield
            let tpldata = _.find(tplsel.tpltotalfield, { attrname: fliedLabel })
            console.log('--000---', tplsel.tpltotalfield, tpldata)
            if (tpldata) {
                tpldata.attrfield = attrfield
                this.tplcomattrinfo = JSON.parse(JSON.stringify(tpldata))
            } else {
                this.tplcomattrinfo = {
                    attrname: fliedLabel,
                    attrfield: attrfield,
                    com_id: '',
                    comattrs: [],
                    width: '',
                    attr: '',
                    value: '',
                    func: '',
                    disable: false
                }
            }
        },
        searchData(data) {
            let tableData = []
            data.tplFiled.forEach(item => {
                data.modelfiled.forEach(value => {
                    if (item == value.key) {
                        tableData.push(value)
                    }
                })
            })
            this.tplcomdata = tableData
            return tableData
        },
        setBack(data) {
            data.tplFiled = data.model_back.tplFiled
            data.tpltotalfield = data.model_back.tpltotalfield
        },
        gettpmmodeldata(item) {
            let modelfiled = []
            let modeldata = _.find(this.tplmodledata, { _id: item.model_id })
            item.tplFiled = []
            modeldata.attrs.forEach(value => {
                let filed = {}
                filed.key = value.key
                filed.attrname = value.attrname
                filed.disabled = false
                modelfiled.push(filed)
                item.tplFiled.push(value.key)
            })
            item.tpltotalfield = []
            item.modelfiled = modelfiled
            console.log('modelfiled', modelfiled)
        },
        getModel() {
            this.getPageHttp("meta", 'metauimodel', 0, 1000).then(obj => {
                console.log('2----', obj.data)
                this.modelsData = obj.data
            })
        },
        saveMenu() {
            this.putHttp('meta', 'metauimenu', this.menuModel._id, this.menuModel).then(obj => {
                this.isshowModel = false
                this.getTree()
            })
        },
        append(store, data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            store.append(newChild, data); // append 不会改变 data
            data.children = data.children || [];
            data.children.push(newChild);
        },
        remove(store, node, data) {
            const parent = node.parent;
            const index = parent.data.children.findIndex(d => d.id === data.id);
            parent.data.children.splice(index, 1);
            store.remove(data); // remove 不会改变 data
        },
        renderContent(h, { node, data, store }) {
            return h('ng-listtree', {
                props: {
                    data,
                    pageData: this.pagetotal,
                    table: this.activeName
                },
                on: {
                    update: this.getTree,
                }
            })
        },
        renderMenuContent(h, { node, data, store }) {
            return h('ng-menutree', {
                props: {
                    data,
                    pageData: this.pagetotal
                },
                on: {
                    update: this.getTree,
                    showMenuModel: this.showModel,
                    getmodel: this.getModelData
                }
            })
        },
        renderContenttpl(h, { node, data, store }) {
            return h('ng-listtree', {
                props: {
                    data,
                    pageData: this.pagetotal,
                    table: this.activeName
                },
                on: {
                    update: this.getTree,
                }
            })
        },
        getModelData(id) {
            this.getHttp("meta", 'metauimenu', id, 0, 1000).then(obj => {
                this.menuModel = obj[0]
                this.isshowModel = true
            })
        },
        getRulesData(data) {
            let rules = []
            this.saverulesData.forEach((item) => {
                console.log('item---', item)
                data.rules_id.forEach((obj) => {
                    if (item._id == obj) {
                        rules.push(JSON.parse(JSON.stringify(item.rules)))
                    }
                })
            })
            console.log('rules--', rules)
            data.rules = rules
        },
        getComAttr(data) {
            this.comData.forEach((item) => {
                if (item._id == data.com_id) {
                    data.tagname = item.enname
                    data.comattrs = JSON.parse(JSON.stringify(item.attrs))
                }
            })
        },
        showAttr() {
            if (this.isShowAttr) {
                this.isShowAttr = false
                this.showText = '编辑属性'
            } else {
                this.isShowAttr = true
                this.showText = '关闭属性'
            }
        },
        getTab() {
            if (this.activeName == 'metauiproject' || this.activeName == 'metauimenu') {
                this.getTree()
            } else {
                this.getData()
            }
        },
        removeTpl(item, arr) {
            let index = arr.indexOf(item)
            arr.splice(index, 1)
        },
        removeAttr(item, arr) {
            let totaldata = null
            if (this.activeName == 'metauirules') {
                totaldata = arr.rules
            } else {
                totaldata = arr.attrs
            }
            let index = totaldata.indexOf(item)
            totaldata.splice(index, 1)
        },
        delAttr(data) {
            let id = data._id
            console.log(id)
            if (id != 0) {
                axios.delete("http://app.bullstech.cn/meta/api/" + this.activeName + '/' + id)
                    .then((obj) => {
                        this.getData()
                    })
            }
        },
        saveAttr(data) {
            let id = data._id
            if (this.activeName == 'metauitpl') {
                data.model_back = null
                delete data.model_back
                console.log('activeName', this.activeName, this.tpltotalfield)
                data.tpltotalfield = this.tpltotalfield
            }
            if (id != 0) {
                console.log('data11111', data)
                axios.put("http://app.bullstech.cn/meta/api/" + this.activeName + '/' + id, data)
                    .then((obj) => {

                        this.getData()
                    })
            } else {
                this.submitForm(data)
            }
        },
        addAttr(data) {
            console.log(data)
            if (this.activeName == 'metauicom') {
                data.attrs.push({ attrtype: '', attrname: '', value: '', func: '', disable: false, key: Date.now() })
            } else if (this.activeName == 'metauitplpage') {
                data.push({ tpl_id: '', sort: '', isshow: '', key: Date.now() })
            } else if (this.activeName == 'metauirules') {
                console.log('data---', data)
                data.rules.push({ ruletype: '', ruleval: '', key: Date.now() })
            } else if (this.activeName == 'metauimodel') {
                data.attrs.push({
                    attrname: '',
                    attrfield: '',
                    value: '',
                    func: '',
                    isvalidate: false,
                    disable: false,
                    key: Date.now(),
                })
            } else {
                data.attrs.push({ com_id: '', sort: 0, isshow: true })
            }

        },
        submitForm(data) {
            let newdata = JSON.parse(JSON.stringify(data))
            newdata._id = null
            delete newdata._id
            axios.post("http://app.bullstech.cn/meta/api/" + this.activeName, newdata)
                .then((obj) => {
                    console.log(obj)
                    this.getData()
                })
        },
        getDesignCom() {
            return this.getPageHttp("meta", 'metauicom', 0, 1000).then(obj => {
                this.designData.comtotal = obj.data
                return this.getPageHttp("meta", 'metauipage', 0, 1000)
            }).then(obj => {
                this.designData.pagetotal = obj.data
            })
        },
        getData() {
            // let dictpldata={
            //     defvalue:false,
            //     label:'北京',
            //     count:'6',
            //     total:'24'   
            // }
            // this.postHttp('meta','testprogress',dictpldata).then(obj=>{
            //     return this.getPageHttp("meta", 'testprogress', 0, 1000).then(item=>{
            //         console.log('testdata---',item.data)
            //     })
            // })

            this.totalData = []
            this.loginHttp("18960828505", "123456").then(login => {
                return this.getPageHttp("meta", this.activeName, 0, 1000)
            }).then(obj => {
                if (obj.data.length == 0) {
                    if (this.activeName == 'metauicom') {
                        this.totalData.push(JSON.parse(JSON.stringify(this.attrData)))
                    } else if (this.activeName == 'metauitplpage') {
                        this.totalData.push({ name: '模板', isshow: '', tpldata: [], _id: 0 })
                    } else if (this.activeName == 'metauimodel') {
                        this.totalData.push(JSON.parse(JSON.stringify(this.modelData)))
                    } else if (this.activeName == 'metauitpl') {
                        this.totalData.push(JSON.parse(JSON.stringify(this.templateData)))
                    } else if (this.activeName == 'metauirules') {
                        this.totalData.push(JSON.parse(JSON.stringify(this.rulesData)))
                    } else {
                        this.totalData.push(JSON.parse(JSON.stringify(this.pageData)))
                    }
                } else {
                    if (this.activeName == 'metauicom') {
                        this.comData = obj.data
                    }
                    if (this.activeName == 'metauitplpage') {
                        this.tplpageData = obj.data
                    }
                    if (this.activeName == 'metauidesign') {
                        this.getDesignCom()
                    }
                    if (this.activeName == 'metauirules') {
                        this.saverulesData = obj.data
                    }
                    let tempdata = obj.data
                    if (this.activeName == 'metauitpl') {
                        this.getPageHttp("meta", 'metauimodel', 0, 1000).then(obj => {
                            this.tplmodledata = obj.data
                            tempdata.forEach(item => {
                                let modelfiled = []
                                item.model_back = null
                                item.model_back = JSON.parse(JSON.stringify(item))
                                let modeldata = _.find(obj.data, { _id: item.model_id })
                                console.log('11111----', modeldata)
                                if (modeldata && modeldata.attrs) {
                                    console.log('11111', modeldata.attrs)
                                    modeldata.attrs.forEach(value => {
                                        let filed = {}
                                        filed.key = value.key
                                        filed.attrname = value.attrname
                                        filed.attrfield = value.attrfield
                                        filed.disabled = false
                                        modelfiled.push(filed)
                                    })
                                }
                                item.modelfiled = modelfiled
                            })
                            this.tpltotalData = tempdata
                            this.totalData = tempdata
                            console.log('totalData', this.totalData)
                        })
                    } else {
                        this.totalData = tempdata
                        console.log(this.totalData)
                    }
                }
            })
        },
        getPageData() {
            return this.getPageHttp("meta", 'metauipage', 0, 1000).then(obj => {
                this.pagetotal = obj.data
            })
        },
        getTree() {
            return this.getPageHttp("meta", this.activeName, 0, 1000).then(obj => {
                console.log("meta", this.activeName)
                if (obj.count == 0) {
                    let vm = this
                    let form = {}
                    if (this.activeName == 'metauiproject') {
                        form = {
                            name: '首页',
                            pid: '',
                            save: false
                        }
                    } else if (this.activeName == 'metauimenu') {
                        form = {
                            name: '首页',
                            pid: '',
                            save: false,
                            icon: '',
                            to: '',
                            sort: '',
                            isshow: true
                        }
                    }
                    vm.postHttp('meta', this.activeName, form).then(() => {
                        this.getTree()
                    }, (e) => {
                        console.log('----', e)
                    })
                } else {
                    let cateData = obj.data
                    let cateTreeMap = {}
                    this.cateTree = []
                    for (let item of cateData) {
                        let treeitem = item
                        if (cateTreeMap[item._id]) {
                            treeitem.children = cateTreeMap[item._id].children
                        } else {
                            treeitem.children = []
                        }
                        cateTreeMap[item._id] = treeitem
                        if (item.pid == '') {
                            this.cateTree.push(treeitem)
                        } else {
                            if (cateTreeMap[item.pid]) {
                                cateTreeMap[item.pid].children.push(treeitem)
                            } else {
                                cateTreeMap[item.pid] = {}
                                cateTreeMap[item.pid].children = []
                                cateTreeMap[item.pid].children.push(treeitem)
                            }
                        }
                    }
                    console.log(this.cateTree)
                }
            })
        }
    }
}
</script>
export default {
    methods: {
        exeConfig(func, obj) {
            let vm = this
            if (vm.ngFunc) {
                if (vm.ngFunc[func]) {
                    vm.ngFunc[func](vm, obj)
                } else if (vm.ngFunc.methods && vm.ngFunc.methods[func]) {
                    vm.ngFunc.methods[func](vm, obj)
                }
            }
        },
        setObj2Value(obj, field, obj2, field2, itemobj, ...items) {
            if (obj && field && obj[field]) {
                this.setObjValueArray(obj2, field2, itemobj, items)
            }
        },
        setObjValue(obj, field, itemobj, ...items) {
            this.setObjValueArray(obj, field, itemobj, items)
        },
        getObjField(obj,field){
            let fieldarray = field.split('.') 
            let lastfield = fieldarray.pop()
            fieldarray.forEach((fielditem)=>{
                obj = obj[fielditem]
            })
            return obj[lastfield]
        },
        getObjFuncField(obj,field){
            let objfield = null
            let fieldfunc =  field.indexOf('(')
            if (fieldfunc>0){
                let fieldfuncName = field.substring(0,fieldfunc)
                let fieldfuncParam = field.substring(fieldfunc+1,field.length-1)
                let fieldfuncarray = fieldfuncParam.split(',') 
                let ffparray = fieldarray.map((fieldParamitem)=>{
                   return getObjField(obj,field)
                })
            }else{
                objfield = getObjField(obj,field)
            }
            return objfield
        },
        setObjValueArray(obj, field, itemobj, items) {
            if (obj && field) {
                let lastobj = itemobj
                let lastName = items.pop()
                items.forEach((item) => {
                    if (!_.isObject(lastobj[item])) {
                        lastobj[item] = {}
                    }
                    lastobj = lastobj[item]
                })
                lastobj[lastName] = this.getObjField(obj,field)
            }
        }
    }
}
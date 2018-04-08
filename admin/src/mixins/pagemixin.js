export default {
    methods: {
        showselectdata(data){
            console.log('showshowshowshowshow')
            console.log('selectdata----',data)
        },
        rowclick(row, event, column){
            console.log('rowclick',row)
        },
        chatamedata(data){
            let vm=this
            _.forEach(data, function (value, key) {
                let arrkey=0
                if (data[key + 1]) {
                    if (data[key][0].com_id == data[key + 1][0].com_id) {
                        data.splice(key, 1)
                        vm.chatamedata(data)
                    }
                }
            })
            return data
        }
    }
}
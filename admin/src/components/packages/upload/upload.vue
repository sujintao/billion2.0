<template>
    <div>
        <el-row v-if="showupload">
            <el-row>
                <el-upload :before-upload="beforeUpload" ref="newupload" :auto-upload="false" 
                     :limit="3" :file-list="fileList" list-type="picture" :show-file-list="isshowlist" :on-remove="handleRemove">
                    <el-button size="small" :disabled="isdisabled" @click="handleclick">选择文件</el-button>
                </el-upload>
            </el-row>
            <el-row>
              <el-button type="success" size="small" @click="newSubmitForm()" class="yes-btn">确定上传</el-button>
            </el-row>
        </el-row>
        <el-row v-if="!showupload">
            <el-alert type="success" show-icon @close="handleshow(imageid)">
              <img :src="imageurl" style="width:100px">
            </el-alert>
        </el-row>
    </div>
</template>
<script>
export default {
  name: 'NgUpload',
  props: ['value'],
  data() {
    return {
      fileList: [],
      showupload: true,
      imageurl:null,
      isdisabled:false,
      imageid:null
    }
  },
  watch:{
    value:function(val){
        this.getimage(val)
    }
  },
  mounted() {
      this.getimage(this.value)
  },
  computed: {},
  methods: {
    getimage(id){
      this.isdisabled=false
      if(id){
        console.log('---this.value',id)
          this.getHttp('nanguo','images',id).then(obj=>{
            console.log('obj--',obj)
              let imageurl=obj[0].fileurl
              this.imageurl='http://'+imageurl
              this.showupload=false
          })
      }else{
        this.imageurl=null
        this.showupload=true
      }
    },
    handleRemove(){
      this.isdisabled=false
    },
    handleclick(){
      this.isdisabled=true
    },
    handleshow(id){
      console.log('imageid',id)
      if(id){
          this.deleteHttp('nanguo','images',id).then(res=>{
              console.log('deleteHttp',res)
          })
      }
        this.showupload=true
    },
    upload(file) {
      var bucket = new upyun.Bucket('wxnanguo')
      let listname = moment().format('YYYYMMDD')
      let filename = moment().format('hhmmss')
      let filetype = null
      let upyunpath = null
      if (file.name.lastIndexOf('.') != -1) {
        let index = file.name.lastIndexOf('.')
        filetype = file.name.slice(index + 1)
        console.log('filetype', index, filetype)
        upyunpath = '/' + listname + '/' + filename + '.' + filetype
      } else {
        upyunpath = '/' + listname + '/' + file.name
      }
      var client = new upyun.Client(bucket, (bucket, method, path) => {
        var params = {
          bucket: bucket.bucketName,
          method,
          path: upyunpath
        }
        return axios.post('http://114.55.7.22:8899/upaiyunsign/', params)
          .then(function (response) {
            if (response.status !== 200) {
              return;
            }
            return response.data
          })
      })
      client.putFile(upyunpath, file).then(result => {
        console.log(upyunpath, 'put file to upyun ' + (result ? 'success' : 'failed'))
        console.log('result', result)
        if (result) {
          console.log('result', result)
          let to = 'wx.nanguopc.com' + upyunpath
          this.imageurl='http://'+to
          console.log('this.imageurl',this.imageurl)
          this.postHttp('nanguo', 'images', { fileurl: to }).then((res) => {
            console.log('to', res)
            this.imageid = res._id
            this.$emit('input', this.imageid)
            this.showupload=false
          })
        }
      })
    },
    newSubmitForm() {
      this.$refs.newupload.submit()
    },
    beforeUpload(file) {
      this.upload(file)
      return false
    },
  }
} 
</script>
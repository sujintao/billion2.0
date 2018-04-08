<template>
  <div>
    <lb-body></lb-body>
    <lb-footer v-if="this.$route.path == '/'||this.$route.path == '/home'||this.$route.path == '/detailview'||this.$route.path == '/explain'||this.$route.path == '/person'||this.$route.path == '/abnormal'"></lb-footer>
  </div>
</template>
<script>
import footer from './footer.vue'
import body from './body.vue'

export default {
  name: 'app',
  data() {
    return {

    }
  },
   mounted() {
    console.log(this.$route.path)
  },
  components: {
    'lb-footer': footer,
    'lb-body': body
  },
  methods: {

  }
}
</script>

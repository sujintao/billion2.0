<template>
    <component :is="icon">
    </component>
</template>
<script>
var req = require.context('~/components/icons/src', true, /^\.\/*\/.*\.vue$/)
let comps = (r => {
    return _.keyBy(r.keys().map(key => r(key)), 'name')
})(req)
export default {
    name: 'LbIcons',
    props: ['icon'],
    components: comps,
}
</script>
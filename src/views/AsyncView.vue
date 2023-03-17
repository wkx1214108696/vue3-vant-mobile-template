<template>
  <div>异步组件</div>
</template>

<script setup>
const res = async () => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
await res()
</script>
<style scoped lang="less"></style>
<UserName v-model:first-name="first" v-model:last-name="last" />



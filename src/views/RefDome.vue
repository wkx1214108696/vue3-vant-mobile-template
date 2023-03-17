<template>
  <div>state:{{ state }}{{ state2 }}</div>
  <button @click="change">修改 customRef</button>
  <hr />
  <div>reactive 基础用法：count: {{ obj }}</div>
  <hr />
  <div>异步赋值问题：arr: {{ arr }}</div>
  <hr />
  <div>shallowReactive：state:{{ state }}</div>
  <button @click="change1">test1</button>
  <button @click="change2">test2</button>
  <hr />
  <div>toRef：state:{{ state }}</div>
  <button @click="change">改变barRef</button>
  <button @click="change2">改变obj</button>
  <hr />
  css modules
  <p :class="$style.red">red</p>
  <!-- 自定义注入名称 -->
  <p :class="classes.green">green</p>
  <hr />
  自定义hooks
  <p>当前鼠标点击的坐标：x:{{ pointX }},y:{{ pointY }}，xy：{{ point }}</p>
  <hr />
  异步组件
  <Suspense>
    <AsyncView />
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
  <hr />
  <p>自定义v-model</p>
  姓名：{{ first }}{{ last }}
  <UserName v-model:first-name="first" v-model:last-name="last" />
  <hr />
  <p>自定义指令</p>
  <input type="text" v-model="color" />
  <div style="width: 200px; height: 200px" v-color="color"></div>
</template>

<script setup>
import UserName from './UserName.vue'
// const state = ref(1)
// console.log('state---', state)
// console.log('state.value---', state.value)

// // shallowRef
// const state = shallowRef({ count: 1 })
// const state2 = ref({ a: 1 })
// 不会触发更改
// setTimeout(() => {
//   state.value.count = 2
//   // shallowRef 和 ref同时使用的副作用
//   // state2.value.a = 2
// }, 1000)
// // 会触发更改
// setTimeout(() => {
//   state.value = { count: 3 }
// }, 4000)

// // triggerRef
// const state = shallowRef({ count: 1 })
// // 不会触发更改
// setTimeout(() => {
//   state.value.count = 2
//   // 会触发更改
//   triggerRef(state)
// }, 2000)

// // customRef
// const myRef = value => {
//   let timer
//   return customRef((track, trigger) => {
//     return {
//       get() {
//         track()
//         return value
//       },
//       set(newVal) {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//           console.log('触发了set')
//           value = newVal
//           trigger()
//         }, 500)
//       },
//     }
//   })
// }
// const name = myRef('ceshi')
// const change = () => {
//   name.value = 'ceshi变了'
// }

// reactive 基础用法
// const obj = reactive({ count: 0 })
// setTimeout(() => {
//   obj.count = 2
// }, 1000)

// 异步赋值问题
// let arr = reactive([])
// setTimeout(() => {
//   arr = [1, 2, 3]
//   console.log(arr)
// }, 1000)
// // 解决办法
// setTimeout(() => {
//   arr.push(...[1, 2, 3])
//   console.log(arr)
// }, 1000)
// // 解决方法2
// let arr = reactive({
//   list: [],
// })
// setTimeout(() => {
//   arr.list = [1, 2, 3]
//   console.log(arr)
// }, 1000)

// // shallowReactive
const obj = {
  a: 1,
  first: {
    b: 2,
    second: {
      c: 3,
    },
  },
}
const state = shallowReactive(obj)
const change1 = () => {
  state.a = 7
}
const change2 = () => {
  state.first.b = 8
  state.first.second.c = 9
  triggerRef(state)
  console.log(state)
}

// // readonly
// const state = reactive({ count: 1 })
// const copy = readonly(state)

// copy.count++

// toRef toRefs toRaw
// const obj = reactive({
//   foo: 2,
//   bar: 1,
// })
// const barRef = toRef(obj, 'bar')
// // bar 转化为响应式对象
// const change = () => {
//   barRef.value++
//   console.log('obj', obj)
//   console.log('barRef', barRef)
// }
// const change2 = () => {
//   obj.bar++
//   console.log('obj', obj)
//   console.log('barRef', barRef)
// }
// const { foo, bar } = obj
// console.log('foo', foo)
// console.log('bar', bar)

// toRefs
// const state = reactive({
//   foo: 1,
//   bar: 2,
// })
// const stateAsRefs = toRefs(state)
// const { foo, bar } = toRefs(state)
// foo.value = 999
// console.log('state：', state)
// console.log('stateAsRefs：', stateAsRefs)
// console.log('foo：', foo)
// console.log('bar：', bar)

// toRaw
// const foo = {}
// const reactiveFoo = reactive(foo)
// reactiveFoo.a = 1
// const toRawFoo = toRaw(reactiveFoo)
// console.log('foo：', foo)
// console.log('reactiveFoo：', reactiveFoo)
// console.log('toRawFoo：', toRawFoo)
// console.log('toRawFoo === foo：', toRawFoo === foo)

// computed
// let price = ref(1)
// // 只读
// let cPrice = computed(() => {
//   return '￥' + price.value
// })
// console.log('cPrice:', cPrice.value)
// // 可写
// let cWritePrice = computed({
//   get() {
//     return '￥' + price.value
//   },
//   set(value) {
//     price.value = 'set' + value
//   },
// })
// cWritePrice.value = 2
// console.log('price:', price.value)
// console.log('cWritePrice:', cWritePrice.value)

// watch
// const state = reactive({ count: 0 })
// watch(
//   () => state.count,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal)
//   }
// )
// const state = reactive({
//   foo: {
//     a: 1,
//   },
//   bar: {
//     b: 2,
//   },
// })
// watch(state, (newVal, oldVal) => {
//   console.log(newVal, oldVal)
// })
// watch(
//   [() => state.foo, () => state.bar],
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue)
//   },
//   {
//     deep: true,
//   }
// )
// setTimeout(() => {
//   state.foo.a = 2
// }, 1000)
// watchEffect(() => {
//   const bar = state.bar
//   const foo = state.foo
//   console.log('watchEffect配置的回调执行了')
// })

// 自定义HOOK
// import usePoint from './usePoint'
// const point = usePoint()
// const { x: pointX, y: pointY } = usePoint()

// // 异步组件
// const AsyncView = defineAsyncComponent(() => import('./AsyncView.vue'))

// // 自定义v-model
// let first = ref('')
// let last = ref('')

// // 自定义指令
// const color = ref('red')
// const vColor = (el, binding) => {
//   el.style.background = binding.value
// }
</script>
<style scoped>
hr {
  margin: 10px 0;
}
</style>
<style module>
.red {
  color: red;
}
</style>
<style module="classes">
/* 自定义注入名称 */
.green {
  color: green;
}
</style>

import { reactive, onMounted, onBeforeUnmount, toRefs } from 'vue'
export default function () {
  let point = reactive({
    x: 0,
    y: 0,
  })

  const savePoint = event => {
    point.x = event.pageX
    point.y = event.pageY
    console.log(event.pageX, event.pageY)
  }

  onMounted(() => {
    window.addEventListener('click', savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })

  return toRefs(point)
}

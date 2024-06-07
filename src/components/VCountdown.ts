import { defineComponent } from "vue";
import dayjs from 'dayjs'

const VCountdown = defineComponent({
  props: {
    tag: {
      type: String,
      default: 'span',
    },
  },
  template: `
    <component :is="props.tag">
      {{ dayjs().get('second') }}
    </component>
  `
})

export default VCountdown
import { Component, defineComponent } from "vue";
import { h } from "vue";
import dayjs from "dayjs";

const VCountdown: Component = defineComponent({
  name: "VCountdown",
  props: {
    tag: {
      type: String,
      default: "span",
    },
  },
  render() {
    return h(this.tag, dayjs().get('second').toString());
  },
})

export default VCountdown
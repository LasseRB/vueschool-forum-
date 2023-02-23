<template>
  <span :title="localTimestamp()">
    {{fromNowDate()}}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default {
  name: "BaseDate",
  props: {
    timestamp: {
      required: true,
      type: Number
    },
  },
  methods : {
    fromNowDate() {
      return dayjs.unix(this.timestamp).fromNow()
    },

    localTimestamp() {
      return dayjs.unix(this.timestamp).format('llll')
    }
  }

}
</script>

<style scoped>

</style>

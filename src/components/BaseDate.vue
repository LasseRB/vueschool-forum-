<template>
  <span :title="localTimestamp">
    {{ fromNowDate }}
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
      type:[Object, Number]
    },
  },
  computed: {
    normalizedTimestamp() {
      return this.timestamp?.seconds || this.timestamp
    },
    fromNowDate() {
      return dayjs.unix(this.normalizedTimestamp).fromNow()
    },
    localTimestamp() {
      return dayjs.unix(this.normalizedTimestamp).format('llll')
    }
  }
}
</script>

<style scoped>

</style>

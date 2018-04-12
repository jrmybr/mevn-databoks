<template>
  <ul v-if="errors" class="error-messages">
    <li
      v-for="(v, k) in errors"
      :key="k">
      {{k}} {{ v }}
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RwvListErorrs',
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>

<style scoped lang="sass">
  .error-messages
    list-style: none
    color: #f5f5f5
    background: #DB3445
    border-radius: 3px
    font-size: 90%

    li
      margin: 5px 0
      //border-bottom: 1px solid red
</style>

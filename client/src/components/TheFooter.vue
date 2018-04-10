<template>
  <footer>
    <p> Databoks - An application to make athletes life better</p>
    <p> Created in 2018 - By BlueBear </p>
  </footer>
</template>
<script>
export default {
  name: 'rwvFooter'
}
</script>

<style scoped lang="sass">
  @import "./../assets/styles/colors"
  @import "./../assets/styles/mixins"
  footer
    display: flex
    flex-direction: column
    justify-content: flex-end
    align-items: center
    width: 100%
    min-height: 5vh
    background-color: $dark-blue
    @media screen and ('min-width': 768px)
      flex-direction: row
      background-color: #3334
      position: absolute
      bottom: 0
    p
      min-width: 50%
      text-align: center
      color: $white
      font-size: 12px
      margin: 0



</style>

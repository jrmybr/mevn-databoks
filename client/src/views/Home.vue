<template>
  <section id='home-page'>
    <div id="home-main">
      <div id="title-wrapper">
        <h1> Databoks </h1>
        <h2> Create your 2.0 fitness event </h2>
        <button type="button" class="more-white">Show more</button>
      </div>

      <div id="home-form">
        <h3>New to Databoks?</h3>
        <h4>Create your free account to get started</h4>
        <signupForm></signupForm>

        <hr>

        <button v-on:click="onGoogle" type="button">Sign up with Google</button>
        <!-- <button type="button">Sign up with Facebook</button> -->
      </div>
  </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import signupForm from '@/components/SignupForm'
  // import { FETCH_TAGS } from '@/store/actions.type'

  export default {
    name: 'home',
    components: {
      signupForm
    },
    computed: {
      ...mapGetters([
        'isAuthenticated'
      ])
    }
  }
</script>

  <style scoped lang='sass'>
    @import "./../assets/styles/colors"
    @import "./../assets/styles/mixins"

    #home-page
      height: auto
      min-height: 90vh
      background-color: $blue
      color: $white
      padding-bottom: 50px
      #home-main
        display: flex
        // justify-content: space-around
        align-items: center
        flex-direction: column
        // min-height: 90%
        @media screen and ('min-width': 768px)
          flex-direction: row
        #title-wrapper
          @include home-title
          margin: 50px
          text-align: center
          h2
            font-size: 90%
          button.more-white
            @include button-more
        #home-form
          display: flex
          flex-direction: column
          min-width: 66%
          h3
            margin-bottom: 0
            letter-spacing: -1px
          h4
            margin-top: 10px
        //   form
        //     display: flex
        //     flex-direction: column
        //     input
        //       @include input-style


  </style>

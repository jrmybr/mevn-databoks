<template>
  <section id='home-page'>
    <div id="home-main">
      <div id="title-wrapper">
        <div class="on-top">
          <h1><span class="bg-orange">Data</span>boks </h1>
          <h2> Bring your fitness in digital world </h2>
          <router-link class="more-white" :to="{ name: 'about'}">Show more</router-link>
          <!-- <button type="button" class="more-white">Show more</button> -->
        </div>
        <div class="on-bottom scroll-down">
          <p>Scroll down to register</p>
          <span class="fa fa-angle-down"></span>
        </div>
      </div>

      <div id="home-form">
        <h3>New to Databoks?</h3>
        <h4>Create your free account to get started</h4>
        <signupForm></signupForm>

        <hr>

        <!-- <button v-on:click="onGoogle" type="button">Sign up with Google</button> -->
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

    @keyframes upndown
      0%
        margin-bottom: 0px
      50%
        margin-bottom: 15px
      100%
        margin-bottom: 0px


    #home-page
      height: auto
      min-height: 100vh
      background-color: $blue
      color: $white
      //padding-bottom: 50px
      @media screen and ('min-width': 768px)
        display: flex
      #home-main
        display: flex
        align-items: center
        flex-direction: column
        min-height: 90%
        @media screen and ('min-width': 768px)
          flex-direction: row
          min-width: 100%
        #title-wrapper
          display: flex
          flex-direction: column
          justify-content: space-between
          min-height: 80vh
          .scroll-down
            margin-bottom: 25px
            animation-name: upndown
            animation-duration: 2s
            animation-iteration-count: infinite
            p
              margin: 0
            .fa
              font-size: 30px

          @media screen and ('min-width': 768px)
            min-height: auto
            margin: 50px 0
            min-width: 50%
            display: block
            .scroll-down
              display: none
          h1
            @include home-title
          margin: 150px 50px 0px 50px
          text-align: center
          span.bg-orange
            background-color: $orange
            padding: 5px
          h2
            font-size: 100%
            margin-bottom: 25px
          a.more-white
            @include button-more
            min-width: 12.5%
            padding: 15px 5px
            text-decoration: none
        #home-form
          @media screen and ('min-width': 768px)
            min-width: 40%
            padding: 0 20px
          display: flex
          flex-direction: column
          min-width: 66%
          h3
            margin-bottom: 0
            letter-spacing: -1px
          h4
            margin-top: 10px

  </style>

<template>
  <div id="home-header">
    <div id="header-title"> <router-link :to="{ name: 'home'}">Databoks</router-link></div>
    <div id="header-link" v-if="!isAuthenticated">
      <router-link class="nav-link"
        active-class="active"
        exact
        :to="{ name: 'about' }">
        About
      </router-link>
      <router-link class="nav-link"
        active-class="active"
        exact
        :to="{ name: 'login' }">
        <span class="fa fa-sign-in-alt"></span> Sign in
      </router-link>
      <router-link
        class="nav-link"
        active-class="active"
        exact
        :to="{ name: 'register' }">
        <span class="far fa-user"></span> Sign up
      </router-link>
    </div>
    <div id="header-link" v-if="isAuthenticated">
      <a href="#">About</a>
      <a href="#" style="text-transform: capitalize;">{{ currentUser.firstname.toLowerCase() }}</a>
      <button type="button" @click="logout">logout</button>
    </div>

  </div>

</template>
<script>
  import { mapGetters } from 'vuex'
  import { LOGOUT } from '@/store/actions.type'

  export default {
    name: 'RwvHeader',
    computed: {
      ...mapGetters([
        'currentUser',
        'isAuthenticated'
      ])
    },
    methods: {
      logout () {
        this.$store
          .dispatch(LOGOUT)
          .then(() => {
            this.$router.push({ name: 'home' })
          })
      }
    }
  }
</script>

<style scoped lang='sass'>
  @import "./../assets/styles/colors"
  @import "./../assets/styles/mixins"

  #home-header
    position: absolute
    min-width: 100%
    display: flex
    flex-direction: row
    min-height: 50px
    align-items: center
    justify-content: space-between
    background-color: #3334
    color: $white
    #header-title, #header-link
      padding: 0 15px
    #header-title
      @include header-title
      min-width: 40%
      @media screen and ('min-width': 768px)
        min-width: 60%
      a, a:hover
        color: $white
        text-decoration: none
    #header-link
      display: flex
      flex-grow: 2
      justify-content: space-around
      a
        min-width: 33%
        text-align: center
        color: white
        text-decoration: none
        font-size: 90%
</style>

<template>
  <div id="home-header">
    <div id="header-title"> Databoks </div>
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
        <span class="fa fa-user"></span> Sign in
      </router-link>
      <router-link
        class="nav-link"
        active-class="active"
        exact
        :to="{ name: 'register' }">
        <span class="fa fa-user"></span> Sign up
      </router-link>
      <!-- <a href="#">Sign In</a>
      <a href="#">Sign up</a> -->
    </div>
    <div id="header-link" v-if="isAuthenticated">
      <a href="#">About</a>
      <a href="#">{{ currentUser.username }}</a>
      <button type="button" @click="logout">logout</button>
    </div>

  </div>
  <!-- <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand"
        :to="{ name: 'home' }">
        databoks
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }">
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }">
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            :to="{ name: 'article-edit' }">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.username">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'profile', params: { username: currentUser.username } }">
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav> -->
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

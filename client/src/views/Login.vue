<template>
  <div class="auth-page">
    <RwvHeader></RwvHeader>
    <div class="container page">
          <div id="login-header">
            <h1> Welcome to Databoks </h1>
            <p> Please, login with your email address </p>
          </div>
          <div id="login-form">
          <listErrors></listErrors>

          <form v-on:submit="onSubmit(email, password)">
              <input
                class=""
                type="text"
                v-model="email"
                placeholder="Email">
              <input
                class=""
                type="password"
                v-model="password"
                placeholder="Password">
            <button class="">
              Sign in
            </button>
          </form>
        </div>
        <div id="login-foot">
          <router-link :to="{ name: 'home'}">
            Forgot your password ?
          </router-link>
          --
          <router-link :to="{ name: 'register'}">
            Create an account
          </router-link>
        </div>
    </div>
    <RwvFooter></RwvFooter>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { LOGIN } from '@/store/actions.type'
import listErrors from '@/components/ListErrors'
import RwvHeader from '@/components/TheHeader'
import RwvFooter from '@/components/TheFooter'

export default {
  name: 'RwvLogin',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit (email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: 'profile', params: {username: this.currentUser.username }}))
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  components: {
    listErrors,
    RwvHeader,
    RwvFooter
  }
}
</script>

<style scoped lang="sass">
@import './../assets/styles/colors'
@import './../assets/styles/mixins'
.auth-page
  min-height: 100vh
  background-color: $blue
  color: $white
  .container
    min-height: 80vh
    padding: 10vh 0
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    h1
      @include home-title
      letter-spacing: -2px
      text-transform: capitalize
      font-size: 200%
    form
      display: flex
      flex-direction: column
      input
        @include input-style
      button
        @include button-style
        &:hover
          background-color: #3336
    #login-foot
      font-size: 12px
      a
        color: $white
        text-decoration: none
        &:hover
          text-decoration: underline
</style>

<template>
  <div class="auth-page">
    <RwvHeader></RwvHeader>
    <div class="container page">
      <div id="login-header">
        <h1> New to Databoks? </h1>
        <p> Create your profile for free </p>
      </div>
      <signupForm></signupForm>
      <div id="login-foot">
        <router-link :to="{ name: 'login' }">
          Have an account?
        </router-link>
      </div>
    </div>
    <RwvFooter></RwvFooter>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import signupForm from '@/components/SignupForm'
import { REGISTER } from '@/store/actions.type'
import RwvHeader from '@/components/TheHeader'
import RwvFooter from '@/components/TheFooter'

export default {
  name: 'RwvRegister',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  components: {
    signupForm,
    RwvHeader,
    RwvFooter
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
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
      #login-foot
        font-size: 12px
        a
          color: $white
          text-decoration: none
          &:hover
            text-decoration: underline
</style>

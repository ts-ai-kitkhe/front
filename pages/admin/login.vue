<template>
  <div class="login-form-container">
    <b-form @submit.prevent="login()">
      <b-icon icon="person"></b-icon>
      <h4 class="modal-title">ავტორიზაცია</h4>
      <b-form-group>
        <b-form-input
          v-model="credentials.email"
          :state="validation"
          type="email"
          class="form-control"
          placeholder="Email"
          required
          autofocus
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="credentials.password"
          :state="validation"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </b-form-group>
      <b-form-invalid-feedback :state="validation">
        მომხმარებელი ან პაროლი არასწორია
      </b-form-invalid-feedback>
      <b-button type="submit" :disabled="isDisabled">შესვლა</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'operator',

  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      correctCredentials: null,
      isDisabled: false,
    }
  },

  computed: {
    validation() {
      return this.correctCredentials
    },
  },

  methods: {
    ...mapMutations('admin', ['setAdminEmail']),

    async login() {
      try {
        this.isDisabled = true
        this.correctCredentials = null
        await this.$auth.loginWith('cognito', {
          data: {
            username: this.credentials.email,
            password: this.credentials.password,
          },
        })
        this.setAdminEmail(this.credentials.email)
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error)
        this.credentials.password = ''
        this.correctCredentials = false
      } finally {
        this.isDisabled = false
      }
    },
  },
}
</script>

<style lang="scss">
.login-form-container {
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    padding: 30px;
    color: black;
    border: 1px solid #f3f3f3;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    background-color: white;
    width: 320px;
    border-radius: 8px;

    svg {
      display: block !important;
      margin: 0 auto 20px;
      color: #fff;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: black;
      padding: 15px;
    }

    h4 {
      text-align: center;
      font-size: 22px;
      margin-bottom: 20px;
    }

    fieldset {
      margin-bottom: 20px;

      .form-control {
        border-color: #ddd;

        &:focus {
          border-color: black;
        }
      }
    }

    .invalid-feedback {
      margin-bottom: 1rem;
      text-align: center;
    }

    button {
      min-height: 40px;
      transition: all 0.5s;
      background-color: black;
      border: none;
      width: 100%;

      &:hover {
        background: rgb(56, 56, 56);
      }
    }
  }
}
</style>

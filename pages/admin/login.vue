<template>
  <div class="login-form-container">
    <b-form action="/admin/books" method="POST" @submit="onSubmit">
      <b-icon icon="person"></b-icon>
      <h4 class="modal-title">ავტორიზაცია</h4>
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          class="form-control"
          placeholder="Email"
          required="required"
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
        />
      </b-form-group>
      <b-button type="submit">შესვლა</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit(event) {
      // Some Auth Logic Here
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

<template>
  <header class="admin-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <NuxtLink to="/#feed" class="navbar-brand">LOGO</NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button v-b-modal.upload-book-modal>წიგნის ატვირთვა</button>
          <b-modal id="upload-book-modal" centered title="წიგნის ატვირთვა">
            <form>
              <b-form-group label="სათაური" label-for="title-input">
                <b-form-input id="title-input" required></b-form-input>
              </b-form-group>
              <b-form-group label="ავტორი" label-for="author-input">
                <b-form-input id="author-input" required></b-form-input>
              </b-form-group>
              <b-form-group label="მთავარი სურათი" label-for="cover-image">
                <b-form-file id="cover-image" required></b-form-file>
              </b-form-group>
            </form>
          </b-modal>
          <b-nav-item-dropdown :text="adminEmail">
            <b-dropdown-item v-b-modal.logout-modal>გამოსვლა</b-dropdown-item>
            <b-modal
              id="logout-modal"
              centered
              title="გამოსვლა"
              cancel-title="გაუქმება"
              ok-title="დიახ"
              @ok="$auth.logout()"
            >
              <p>დარწმუნებული ხართ, რომ გსურთ პროფილიდან გამოსვლა?</p>
            </b-modal>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('admin', ['adminEmail']),
}
</script>

<style lang="scss"></style>

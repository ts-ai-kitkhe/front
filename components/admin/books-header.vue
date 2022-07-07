<template>
  <header class="admin-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <NuxtLink to="/#feed" class="navbar-brand">LOGO</NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <div class="upload-btn">
            <button v-b-modal.upload-modal>წიგნის ატვირთვა</button>
            <b-modal id="upload-modal" centered title="წიგნის ატვირთვა">
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
          </div>
          <b-nav-item-dropdown text="lorem@ipsum.com">
            <b-dropdown-item v-b-modal.logout-modal>გამოსვლა</b-dropdown-item>
            <b-modal id="logout-modal" centered title="Are you sure?">
              <p>Some text</p>
            </b-modal>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>

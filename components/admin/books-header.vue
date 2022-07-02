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
                  <b-form-input
                    id="title-input"
                    v-model="title"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="ავტორი" label-for="author-input">
                  <b-form-input
                    id="author-input"
                    v-model="author"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="მთავარი სურათი" label-for="cover-image">
                  <b-form-file
                    id="cover-image"
                    v-model="coverImage"
                    required
                  ></b-form-file>
                </b-form-group>
              </form>
            </b-modal>
          </div>
          <button>lorem@ipsum.com</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>

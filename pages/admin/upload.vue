<template>
  <div class="form-wrapper">
    <form action="">
      <div class="form-group">
        <label for="title">სათაური</label>
        <input id="title" type="text" required />
      </div>
      <div class="form-group">
        <label for="title">ავტორი</label>
        <input id="title" type="text" />
      </div>
      <div class="form-group">
        <input id="files" type="file" multiple required />
      </div>
      <button type="submit" class="btn-submit">შემდეგი</button>
    </form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Upload Files',
    }
  },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    padding: 20px;

    .form-group {
      margin: 10px 0;

      label {
        display: block;
        margin: 10px 0;
      }

      input {
        width: 100%;
      }
    }

    .btn-submit {
      align-self: center;
      margin: 10px 0;
    }
  }
}
</style>

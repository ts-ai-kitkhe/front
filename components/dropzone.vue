<template>
  <form class="dropzone">
    <div id="dropzone-message" style="display: none">
      <b-icon class="display-icon" icon="cloud-upload"></b-icon>
      <div class="upload-txt">
        <span>Choose a file</span>
        <span>or</span>
        <span>drag it here</span>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

Dropzone.autoDiscover = false

export default {
  name: 'VueDropzone',

  props: {
    bookId: {
      type: String,
      default: null,
    },
  },

  mounted() {
    const vm = this

    const options = {
      url: '/',
      method: 'put',
      acceptedFiles: '.jpeg,.jpg,.png,.webp',

      sending(file, xhr) {
        const _send = xhr.send
        xhr.send = () => {
          _send.call(xhr, file)
        }
      },

      parallelUploads: 10000,
      uploadMultiple: true,
      header: '',
      dictDefaultMessage: document.querySelector('#dropzone-message').innerHTML,
      autoProcessQueue: false,

      async accept(file, done) {
        const endpoint = `https://api.ts-ai-kitkhe.ge/core/books/${vm.bookId}/pages/signed-url`

        const payload = {
          filePath: file.name,
          contentType: file.type,
        }

        await axios
          .post(endpoint, payload, {
            headers: {
              authorization:
                'Bearer ' +
                vm.$auth.strategies.cognito.token.session.idToken.jwtToken,
            },
          })
          .then((res) => res.data.url)
          .then((url) => {
            file.uploadURL = url
            done()
            setTimeout(() => vm.dropzone.processFile(file))
          })
          .catch((err) => {
            done('Failed to get an S3 signed upload URL', err)
          })
      },
    }

    this.dropzone = new Dropzone(this.$el, options)
    vm.dropzone.on('processing', (file) => {
      vm.dropzone.options.url = file.uploadURL
    })

    vm.dropzone.on('queuecomplete', async function () {
      const oldFiles = vm.$store.state.admin.adminBookPages.map((page) =>
        page.url.split('/').pop()
      )
      const newFiles = this.getAcceptedFiles().map(
        (file) => file.upload.filename
      )
      const pages = [...oldFiles, ...newFiles]

      await axios.patch(
        `https://api.ts-ai-kitkhe.ge/core/admin/books/${vm.bookId}/pages`,
        { pages },
        {
          headers: {
            authorization:
              'Bearer ' +
              vm.$auth.strategies.cognito.token.session.idToken.jwtToken,
          },
        }
      )
      window.location.reload(true)
    })
  },
}
</script>

<style lang="scss">
.dropzone {
  padding: 20px;
  border: 2px dashed rgb(150, 150, 150);
  transition: all 0.1s ease-in-out;
  text-align: center;

  .dz-message {
    margin: 2em 0;

    svg {
      width: 70px;
      height: 70px;
    }

    .upload-txt {
      margin-top: 10px;
      font-size: 18px;

      span {
        &:nth-child(1),
        &:nth-child(3) {
          font-weight: bold;
          color: $admin-blue;
        }
      }
    }
  }

  &:hover {
    border: 2px dashed black;
  }
}
</style>

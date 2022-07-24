<template>
  <form class="dropzone">
    <div id="dropzone-message" style="display: none">
      <span class="dropzone-title">Drop files here or click to select</span>
      <span class="dropzone-info">You can upload multiple files at once</span>
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
  mounted() {
    const vm = this

    const options = {
      url: '/',
      method: 'put',

      sending(file, xhr) {
        const _send = xhr.send
        xhr.send = () => {
          _send.call(xhr, file)
        }
      },

      parallelUploads: 10,
      uploadMultiple: false,
      header: '',
      dictDefaultMessage: document.querySelector('#dropzone-message').innerHTML,
      autoProcessQueue: false,

      async accept(file, done) {
        const endpoint =
          'https://lpqpsnmep6gcc22gwtycn5sjwu0kopqd.lambda-url.eu-central-1.on.aws'
        const payload = {
          filePath: file.name,
          contentType: file.type,
        }
        await axios
          .post(endpoint, payload)
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
  },
}
</script>

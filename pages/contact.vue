<template>
  <div class="contact-container">
    <div class="container contact-upper">
      <h1>კონტაქტი</h1>
      <div class="row contact-icons-row">
        <div class="col-md-4 envelope-col">
          <b-icon icon="envelope" class="contact-icon"></b-icon>
          <h2 class="email-top">ელექტრონული</h2>
          <h2>ფოსტა</h2>
          <a href="mailto: ts.ai.kitkhe@gmail.com">ts.ai.kitkhe@gmail.com</a>
        </div>
        <div class="col-md-4 map-col">
          <b-icon icon="pin-map" class="contact-icon"></b-icon>
          <h2>მისამართი</h2>
          <p>კახა ბენდუქიძის კამპუსი</p>
          <p>თბილისი, დავით აღმაშენებლის ხეივანი, #240</p>
        </div>
        <div class="col-md-4 github-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="contact-icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          <h2 class="email-top">GitHub</h2>
          <a href="https://github.com/ts-ai-kitkhe"> ts-ai-kitkhe</a>
        </div>
      </div>
    </div>
    <div class="container-fluid contact-map">
      <iframe
        width="100%"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=free%20university%20tbilisi+()&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'catalogue',
}
</script>

<style lang="scss" scoped>
.contact-container {
  font-family: $geo-font-primary;

  .contact-upper {
    text-align: center;

    h1 {
      word-break: break-all;
      margin-bottom: 40px;
      letter-spacing: 1px;
      font-size: 54px;

      @include sm {
        font-size: 42px;
      }
    }

    .contact-icons-row {
      margin-top: 75px;
      margin-bottom: 80px;
      align-items: center;

      .contact-icon {
        height: 60px;
        width: 60px;
        margin-bottom: 20px;
      }

      h2 {
        color: $txt-color-main-hover;
        letter-spacing: 2px;
        font-size: 26px;
        margin-bottom: 15px;
      }

      p {
        margin: 0 auto;
        width: 90%;
        font-weight: 200;
        font-size: 20px;
        letter-spacing: 1px;
        font-family: 'BPG Nino Mkhedruli Book';
      }

      a {
        color: #beb3ec;
        font-weight: 200;
        font-size: 20px;
        letter-spacing: 1px;
        text-decoration: none;
        transition: 0.1s ease-out;

        &:hover {
          color: #7c66d8;
        }
      }

      .envelope-col {
        .email-top {
          margin-bottom: 5px;
        }
      }

      .map-col {
        @include md {
          margin-top: 50px;
        }
      }

      .github-col {
        svg {
          height: 60px;
          width: 60px;
        }

        @include md {
          margin-top: 50px;
        }
      }

      @include md {
        margin-top: 40px;
        margin-bottom: 40px;
      }
    }
  }

  .contact-map {
    padding: 0;
    margin-top: 50px;

    iframe {
      background-color: #e5e3df;
      height: max(550px, 50vh);
    }
  }
}
</style>

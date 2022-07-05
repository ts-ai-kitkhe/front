<template>
  <div class="contact-container">
    <div class="container contact-upper">
      <h1>დაგვიკავშირდით</h1>
      <p class="contact-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div class="row contact-icons-row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <b-icon icon="pin-map" class="contact-icon"></b-icon>
          <h2>მისამართი</h2>
          <p>კახა ბენდუქიძის კამპუსი</p>
          <p>თბილისი, დავით აღმაშენებლის ხეივანი, #240</p>
        </div>
        <div class="col-md-4 envelope-col">
          <b-icon icon="envelope" class="contact-icon"></b-icon>
          <h2 class="email-top">ელექტრონული</h2>
          <h2>ფოსტა</h2>
          <a href="mailto: ts.ai.kitkhe@gmail.com">ts.ai.kitkhe@gmail.com</a>
        </div>
        <div class="col-md-2"></div>
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
  .contact-upper {
    margin-top: 30px;
    text-align: center;

    h1 {
      word-break: break-all;
      margin-bottom: 40px;
      letter-spacing: 1px;

      @include sm {
        font-size: 30px;
      }
    }

    .contact-text {
      width: 60%;
      margin: 0 auto;
      color: #999999;
      font-weight: 300;
      letter-spacing: 1px;

      @include sm {
        font-size: 15px;
      }
    }

    .contact-icons-row {
      margin-top: 50px;
      align-items: center;

      .contact-icon {
        height: 60px;
        width: 60px;
        margin-bottom: 20px;
      }

      h2 {
        color: #5e5e5e;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 18px;
        margin-bottom: 15px;
      }

      p {
        margin: 0 auto;
        width: 90%;
        font-weight: 200;
        letter-spacing: 1px;
      }

      a {
        color: darkblue;
        font-weight: 200;
        letter-spacing: 1px;
      }

      .envelope-col {
        .email-top {
          margin-bottom: 5px;
        }

        @include md {
          margin-top: 30px;
        }
      }

      @include md {
        align-items: flex-start;
      }
    }
  }

  .contact-map {
    padding: 0;
    margin-top: 50px;

    iframe {
      height: max(550px, 50vh);
    }
  }
}
</style>

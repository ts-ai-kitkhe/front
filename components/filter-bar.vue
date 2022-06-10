<template>
  <div class="sidebar-container pb-4">
    <b-navbar toggleable="lg p-0">
      <b-navbar-toggle target="nav-collapse">
        <template #default>Filters</template>
      </b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <div class="sidebar-dropdown my-3">
          <p>Dropdown:</p>
          <b-dd text="Choice 1">
            <b-dd-item>Choice 1</b-dd-item>
            <b-dd-item>Choice 2</b-dd-item>
            <b-dd-item>Choice 3</b-dd-item>
          </b-dd>
        </div>
        <div class="sidebar-form-group my-5">
          <b-form-group label="Form Group">
            <b-check-group :options="options" stacked></b-check-group>
          </b-form-group>
        </div>
        <div class="sidebar-range my-5">
          <label for="range">Range with step</label>
          <b-input
            v-model="rangeValue"
            type="range"
            min="0"
            max="5"
            step="0.5"
          ></b-input>
          <div>Value: {{ rangeValue }}</div>
        </div>
        <div class="sidebar-radio my-5">
          <b-form-group label="Radio buttons">
            <b-form-radio v-model="radio" value="A">Option A</b-form-radio>
            <b-form-radio v-model="radio" value="B">Option B</b-form-radio>
          </b-form-group>
          <div class="mt-3">
            Selected: <strong>{{ radio }}</strong>
          </div>
        </div>
        <div class="sidebar-tags">
          <label for="tags-basic">Tags</label>
          <b-form-tags v-model="tags"></b-form-tags>
          <p class="mt-2">tags: {{ tags }}</p>
        </div>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { text: 'Choice 1', value: 'Choice 1' },
        { text: 'Choice 2', value: 'Choice 2' },
        { text: 'Choice 3', value: 'Choice 3' },
        { text: 'Choice 4', value: 'Choice 4' },
      ],
      radio: '',
      rangeValue: '2',
      tags: ['tag1', 'tag2'],
    }
  },
}
</script>

<style lang="scss">
.sidebar-container {
  .navbar {
    justify-content: center;

    .navbar-toggler {
      color: black;
      border: 1px solid black;
    }

    .navbar-collapse {
      flex-direction: column;
      align-items: flex-start;

      .sidebar-dropdown {
        .dropdown {
          button {
            display: flex;
            align-items: center;
            background-color: white;
            color: black;
          }

          .dropdown-toggle::after {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>

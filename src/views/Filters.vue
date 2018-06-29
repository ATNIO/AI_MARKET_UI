<template>
  <section class="filters">
    <h2>Filters</h2>
    <i-row class-name="filter-wrapper">
      <i-col :lg="12">
        <i-checkboxGroup v-model="filterChecked">
          <i-checkbox 
            v-for="item in filters" 
            :key="item.name" 
            :label="item.name"
          >
            <span class="checkbox-text">{{ item.name }}</span>
          </i-checkbox>
        </i-checkboxGroup>
        <div class="btn-group">
          <i-button size="large" type="warning" @click="resetFilterChecked">reset</i-button>
          <i-button size="large" type="primary" @click="filter">filter</i-button>
        </div>
      </i-col>
      <i-col :lg="4" offset="8">
        <i-input v-model="searchValue">
          <i-button slot="append" icon="ios-search"></i-button>
        </i-input>
      </i-col>
    </i-row>
  </section>
</template>

<script>
const filters = [
  {
    name: "Computer vision",
    checked: false
  },
  {
    name: "Voice recognition",
    checked: false
  },
  {
    name: "Optimization",
    checked: false
  },
  {
    name: "Finance",
    checked: false
  },
  {
    name: "Tracking AI",
    checked: false
  },
  {
    name: "Robotics",
    checked: false
  },
  {
    name: "Data",
    checked: false
  },
  {
    name: "Security",
    checked: false
  },
  {
    name: "AI type",
    checked: false
  }
];

export default {
  name: "Filters",
  data() {
    return {
      filters,
      filterChecked: [],
      searchValue: ""
    };
  },
  methods: {
    // reset checked filters array
    resetFilterChecked() {
      this.filterChecked = [];
      // TODOS: storage the checked filters array in store for page refresh or page switch
    },
    filter() {
      // TODOS: will filter base on checked filters
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  margin-bottom: 1rem;
  padding: 0 2rem;

  .filter-wrapper {
    padding: 1rem 0;

    .checkbox-text {
      margin-left: 4px;
    }

    .btn-group {
      margin-top: 1rem;

      button {
        &:first-child {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>

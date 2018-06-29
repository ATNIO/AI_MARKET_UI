<template>
  <section class="filters">
    <h2>Filters</h2>
    <a-row 
      type="flex" 
      justify="space-between" 
      class="filter-wrapper"
    >
      <!-- left filter -->
      <a-col :xs="24" :md="14" :lg="12" class="filter-col">

        <!-- checkbox group -->
        <a-checkbox-group v-model="filterCheckedList">
          <a-row>
              <a-col 
                :xs="12"
                :sm="8"
                :md="8"
                :lg="8"
                v-for="item in filters"
                :key="item.name"
              >
                <a-checkbox :value="item.name">
                  {{ item.name }}
                </a-checkbox>
              </a-col>
          </a-row>
        </a-checkbox-group>
        
        <!-- button group -->
        <div class="btn-group">
          <a-button size="large" @click="resetFilterChecked">Reset</a-button>
          <a-button size="large" type="primary" @click="filter">Filter</a-button>
        </div>
      </a-col>

      <!-- right search -->
      <a-col :xs="24" :md="10" :lg="6">
        <a-input-search 
          placeholder="Search Dbot" 
          @search="onSearch" 
          enterButton="Search" 
          size="large"
        />
      </a-col>
    </a-row>
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
      filterCheckedList: [],
      searchValue: ""
    };
  },
  methods: {
    // reset checked filters array
    resetFilterChecked() {
      this.filterCheckedList = [];
      // TODOS: storage the checked filters array in store for page refresh or page switch
    },
    filter() {
      // TODOS: will filter base on checked filters
    },
    onSearch(value) {
      console.log(value);
      // TODOS: search
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  padding: 0 2rem;

  .filter-wrapper {
    padding: 1rem 0;

    .filter-col {
      margin-bottom: 1rem;

      .btn-group {
        margin-top: 1rem;

        button {
          width: 100px;

          &:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>

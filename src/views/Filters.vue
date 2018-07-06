<template>
  <section class="filters">
    <h2>Filters</h2>
    <Row 
      type="flex" 
      justify="space-between" 
      class-name="filter-wrapper"
    >
      <!-- left filter -->
      <i-col :xs="24" :md="14" :lg="12" class="filter-col">

        <!-- checkbox group -->
        <Checkbox-group v-model="filterCheckedList">
          <Row>
              <i-col 
                :xs="12"
                :sm="8"
                :md="8"
                :lg="8"
                v-for="item in filters"
                :key="item.name"
              >
                <Checkbox size="large" :label="item.name">
                  {{ item.name }}
                </Checkbox>
              </i-col>
          </Row>
        </Checkbox-group>
        
        <!-- button group -->
        <div class="btn-group">
          <Button size="large" @click="resetFilterChecked">Reset</Button>
          <Button size="large" type="primary" @click="filter">Filter</Button>
        </div>
      </i-col>

      <!-- right search -->
      <i-Col :xs="24" :md="10" :lg="6">
        <Input size="large" v-model="searchValue" placeholder="Search Dbot">
          <Button 
            slot="append"
            icon="ios-search"
            @click="onSearch"
          >Search</Button>
        </Input>
      </i-Col>
    </Row>
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
  max-width: 1460px;
  margin: 0 auto;
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

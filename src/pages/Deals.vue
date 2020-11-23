<template>
  <q-page class="q-pa-none">
    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      elevated
      bordered
      content-class="bg-grey-2"
    >
      <left-filters-menu
        :filters="filters"
        :filterPrice="filterPrice"
        :ratingValue="ratingValue"
        :checkFilters="checkFilters"
      />
    </q-drawer>
    <dialog-window :card="card" :stores="stores" />
    <q-table
      ref="mainTable"
      class="table-class"
      title="Deals"
      :data="data"
      :columns="columns"
      :visible-columns="[
        'price',
        $q.screen.lt.sm ? null : 'store',
        $q.screen.lt.md ? null : 'release',
        'metacritic'
      ]"
      :loading="loading"
      row-key="index"
      virtual-scroll
      :virtual-scroll-slice-size="20"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      dense
      no-data-label="I didn't find anything for you"
    >
      <template v-slot:top>
        <top-filters-menu
          :filters="filters"
          :filterPrice="filterPrice"
          :ratingValue="ratingValue"
          :checkFilters="checkFilters"
          :filtersVisible="filtersVisible"
          @toggleDrawer="leftDrawerOpen = !leftDrawerOpen"
          @filtersVisibleToggle="filtersVisible = $event"
          :leftDrawerOpen="leftDrawerOpen"
        />
      </template>
      <template v-slot:body="props">
        <table-body-content :props="props" :card="card" :stores="stores" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { columns, stores } from "../bin/variables";
import DialogWindow from "src/components/dialog-window.vue";
import LeftFiltersMenu from "src/components/left-filters-menu.vue";
import TopFiltersMenu from "src/components/top-filters-menu.vue";
import TableBodyContent from "src/components/table-body-content.vue";

const pageSize = 60;
const nextPage = 2;

export default {
  name: "Deals",
  data() {
    return {
      rawData: [],
      filtersVisible: false,
      nextPage,
      stores,
      loading: true,
      columns,
      filters: {
        title: "",
        exactMatch: false,
        price: {
          min: 0,
          max: 50
        },
        rating: 40,
        aaaOnly: false,
        steamworks: false,
        onSale: false
      },
      oldCopy: {},
      leftDrawerOpen: false,
      card: {
        visible: false,
        data: {}
      }
    };
  },
  components: {
    DialogWindow,
    LeftFiltersMenu,
    TopFiltersMenu,
    TableBodyContent
  },
  beforeMount: async function() {
    this.rawData = await this.fetchData();
    this.loading = false;
  },
  activated: function() {
    this.oldCopy = { ...this.filters };
    this.$refs.mainTable.resetVirtualScroll();
  },
  computed: {
    data() {
      return this.rawData;
    },
    ratingValue() {
      return this.filters.rating > 40 ? `above ${this.filters.rating}%` : "any";
    },
    filterPrice() {
      return this.filters.price.max > 49 ? `any` : `$${this.filters.price.max}`;
    },
    filtersParams() {
      let parsedFilters = [];
      if (this.filters.title) {
        parsedFilters.push(
          `&title=${this.filters.title
            .trim()
            .split(" ")
            .join("%20")}`
        );
      }
      if (this.filters.exactMatch) {
        parsedFilters.push(`&exact=1`);
      }
      if (this.filters.rating > 40) {
        parsedFilters.push(`&steamRating=${this.filters.rating}`);
      }
      if (this.filters.price.min > 0) {
        parsedFilters.push(`&lowerPrice=${this.filters.price.min}`);
      }
      if (this.filters.price.max < 50) {
        parsedFilters.push(`&upperPrice=${this.filters.price.max}`);
      }
      if (this.filters.aaaOnly) {
        parsedFilters.push(`&AAA=1`);
      }
      if (this.filters.steamworks) {
        parsedFilters.push(`&steamworks=1`);
      }
      if (this.filters.onSale) {
        parsedFilters.push(`&onSale=1`);
      }
      return parsedFilters.join("");
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let result = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${this.nextPage -
          2}${this.filtersParams}`
      )
        .then(response => {
          this.$refs.mainTable.$refs.virtScroll.scrollTo(0);
          return response.json();
        })
        .catch(error => console.log("error", error));

      this.loading = false;
      return result;
    },

    async applyFilters() {
      this.oldCopy = { ...this.filters };
      this.rawData = await this.fetchData();
      this.$q.notify({
        message: "Filters updated!",
        type: "positive",
        timeout: 1000
      });
    },
    checkFilters() {
      for (const item in this.filters) {
        if (item === "price") {
          if (
            this.oldCopy[item].min !== this.filters[item].min ||
            this.oldCopy[item].max !== this.filters[item].max
          ) {
            this.applyFilters();
            break;
          }
        } else if (this.oldCopy[item] !== this.filters[item]) {
          this.applyFilters();
          break;
        }
      }
    },
    async onScroll({ to, ref }) {
      const lastIndex = this.data.length - 1;

      if (this.loading !== true && lastIndex > 58 && to === lastIndex) {
        this.loading = true;
        this.nextPage++;
        let nextData = await this.fetchData();
        this.rawData.push(...nextData);
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.table-class::v-deep {
  /* height or max-height is important */
  max-height: calc(100vh - 110px);
  width: 100%;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #fff;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  /* this will be the loading indicator */
  thead tr:last-child th {
    /* height of all previous header rows */
    top: 28px;
  }
  thead tr:first-child th {
    top: 0;
  }
}
</style>

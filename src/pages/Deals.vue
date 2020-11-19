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
    <dialog-window :card="card" />
    <q-table
      class="table-class"
      title="Treats"
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
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      dense
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
import { data } from "./tempVariables";
import { columns, stores } from "../bin/variables";
import DialogWindow from "src/components/dialog-window.vue";
import LeftFiltersMenu from "src/components/left-filters-menu.vue";
import TopFiltersMenu from "src/components/top-filters-menu.vue";
import TableBodyContent from "src/components/table-body-content.vue";

const pageSize = 60;
const nextPage = 2;
const lastPage = Math.ceil(data.length / pageSize);

export default {
  name: "Deals",
  data() {
    return {
      rawData: [],
      filtersVisible: false,
      nextPage,
      stores,
      loading: false,
      columns,
      filters: {
        title: "",
        exactMatch: false,
        price: {
          min: 10,
          max: 35
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
  },
  activated: function() {
    this.oldCopy = { ...this.filters };
    this.nextPage = 1;
  },
  computed: {
    data() {
      return this.rawData.slice(0, pageSize * this.nextPage);
    },
    ratingValue() {
      return this.filters.rating > 40 ? `above ${this.filters.rating}%` : "any";
    },
    filterPrice() {
      return this.filters.price.max > 49 ? `any` : `$${this.filters.price.max}`;
    }
  },
  methods: {
    async fetchData() {
      return await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageNumber=${this.nextPage -
          2}`
      )
        .then(response => response.json())
        .catch(error => console.log("error", error));
    },

    applyFilters() {
      this.oldCopy = { ...this.filters };
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

      if (this.loading !== true && to === lastIndex) {
        this.loading = true;

        this.nextPage++;
        let nextData = await this.fetchData();
        this.rawData.push(...nextData);
        this.$nextTick(() => {
          ref.refresh();
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
  min-height: 320px;
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
    top: 48px;
  }
  thead tr:first-child th {
    top: 0;
  }
}
</style>

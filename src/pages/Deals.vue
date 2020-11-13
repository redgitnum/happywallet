<template>
  <q-page class="q-pa-md">
    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      elevated
      bordered
      content-class="bg-grey-2"
    >
      <div class="flex">
        <q-item-label header class="text-h5 filter-title">Filters</q-item-label>
        <q-btn
          @click="checkFilters"
          color="positive"
          class="q-px-md q-mx-md col self-center"
        >
          Apply
        </q-btn>
      </div>
      <q-list bordered padding>
        <q-item dense class="flex">
          <q-input v-model="filters.title" label="Title" />
          <q-checkbox
            class="self-end q-pr-sm text-no-wrap"
            v-model="filters.exactMatch"
            label="exact match"
          />
        </q-item>
        <q-separator spaced />
        <q-item-label header>Price range</q-item-label>
        <q-item>
          <q-range
            v-model="filters.price"
            :min="0"
            :max="50"
            label-always
            :left-label-value="'$' + filters.price.min"
            :right-label-value="filterPrice"
          />
        </q-item>
        <q-separator spaced />
        <q-item-label header>Steam rating</q-item-label>
        <q-item>
          <q-slider
            v-model="filters.rating"
            :min="40"
            :max="95"
            :step="5"
            label
            label-always
            :label-value="ratingValue"
            color="light-green"
          />
        </q-item>
        <q-separator spaced />
        <q-item-label header>Other</q-item-label>
        <q-item>
          <q-checkbox
            class="self-end q-pr-sm text-no-wrap"
            v-model="filters.aaaOnly"
            label="AAA only"
          />
          <q-btn flat round color="dark" icon="help_outline">
            <q-tooltip>
              Filters out games with current retails price &lt;$29
            </q-tooltip>
          </q-btn>
        </q-item>
        <q-item>
          <q-checkbox
            class="self-end q-pr-sm text-no-wrap"
            v-model="filters.steamworks"
            label="Steamworks"
          />
          <q-btn flat round color="dark" icon="help_outline">
            <q-tooltip>
              Steamworks games register and download on Steam no matter which
              store you buy the game from
            </q-tooltip>
          </q-btn>
        </q-item>
        <q-item>
          <q-checkbox
            class="self-end q-pr-sm text-no-wrap"
            v-model="filters.onSale"
            label="On sale"
          />
        </q-item>
      </q-list>
    </q-drawer>

    <q-table
      class="table-class"
      title="Treats"
      :data="data"
      :columns="columns"
      :loading="loading"
      row-key="index"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
    >
      <template v-slot:top>
        <q-btn
          v-if="$q.platform.is.mobile || $q.screen.lt.sm"
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          color="primary"
          icon="settings"
          size="md"
        />
        <div class="col" v-if="$q.screen.gt.xs">
          <q-expansion-item
            class="relative-postition"
            expand-separator
            icon="filter_alt"
            label="Filters"
            @show="filtersVisible = true"
            @hide="filtersVisible = false"
          >
            <div class="row" style="maxWidth: 800px">
              <div class="col-6">
                <q-item-label header class="q-pb-none row">
                  Price range:&nbsp;
                  <p class="text-bold q-pa-none q-ma-none text-primary">
                    ${{ filters.price.min }} - {{ filterPrice }}
                  </p>
                </q-item-label>
                <q-item>
                  <q-range v-model="filters.price" :min="0" :max="50" dense />
                </q-item>
              </div>
              <div class="col-6">
                <q-item-label header class="q-pb-none row">
                  Steam rating:&nbsp;
                  <p class="text-bold q-pa-none q-ma-none text-light-green">
                    {{ ratingValue }}
                  </p>
                </q-item-label>
                <q-item>
                  <q-slider
                    v-model="filters.rating"
                    :min="40"
                    :max="95"
                    :step="5"
                    color="light-green"
                    dense
                  />
                </q-item>
              </div>
              <div class="col-12 q-pb-sm q-pl-sm">
                <q-checkbox
                  class="q-pr-xs text-no-wrap"
                  v-model="filters.aaaOnly"
                  label="AAA only"
                />
                <q-icon name="help_outline" style="cursor: help;">
                  <q-tooltip>
                    Filters out games with current retails price &lt;$29
                  </q-tooltip>
                </q-icon>
                <q-checkbox
                  class="q-ml-md q-pr-xs text-no-wrap"
                  v-model="filters.steamworks"
                  label="Steamworks"
                />
                <q-icon name="help_outline" style="cursor: help;">
                  <q-tooltip>
                    Steamworks games register and download on Steam no matter
                    which store you buy the game from
                  </q-tooltip>
                </q-icon>
                <q-checkbox
                  class="q-ml-md text-no-wrap"
                  v-model="filters.onSale"
                  label="On sale"
                />
              </div>
            </div>
          </q-expansion-item>
          <transition name="fade">
            <div
              class="absolute-top q-py-md row no-wrap"
              style="left: 150px; right: 100px;"
              v-if="filtersVisible"
            >
              <q-input
                v-model="filters.title"
                v-on:keyup.enter="checkFilters"
                placeholder="Title"
                style="width: 300px;"
                dense
                outlined
              />
              <q-checkbox
                class="self-end q-mx-sm text-no-wrap"
                v-model="filters.exactMatch"
                label="exact match"
              />
              <q-btn
                @click="checkFilters"
                color="positive"
                class="q-ml-md text-no-wrap self-center"
              >
                Apply Filters
              </q-btn>
            </div>
          </transition>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { data } from "./tempVariables";

const pageSize = 10;
const nextPage = 2;
const lastPage = Math.ceil(data.length / pageSize);

export default {
  name: "Deals",
  data() {
    return {
      filtersVisible: false,
      nextPage,
      loading: false,
      pagination: {
        rowsPerPage: 0,
        rowsNumber: data.length
      },
      columns: [
        {
          name: "index",
          label: "#",
          field: "index"
        },
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: "title",
          sortable: true
        },
        {
          name: "price",
          align: "center",
          label: "price",
          field: "salePrice",
          sortable: true
        },
        { name: "savings", label: "saving", field: "savings", sortable: true },
        { name: "dealRating", label: "deal rating", field: "dealRating" },
        { name: "release", label: "Release", field: "releaseDate" },
        { name: "reviews", label: "reviews", field: "steamRatingText" }
      ],
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
      leftDrawerOpen: false
    };
  },
  activated: function() {
    this.oldCopy = { ...this.filters };
  },
  computed: {
    data() {
      return data.slice(0, pageSize * (this.nextPage - 1));
    },
    ratingValue() {
      return this.filters.rating > 40 ? `above ${this.filters.rating}%` : "any";
    },
    filterPrice() {
      return this.filters.price.max > 49 ? `any` : `$${this.filters.price.max}`;
    }
  },
  methods: {
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
    onScroll({ to, ref }) {
      const lastIndex = this.data.length - 1;

      if (
        this.loading !== true &&
        this.nextPage < lastPage &&
        to === lastIndex
      ) {
        this.loading = true;

        setTimeout(() => {
          this.nextPage++;
          this.$nextTick(() => {
            ref.refresh();
            this.loading = false;
          });
        }, 2500);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-title {
  color: #000;
}
.table-class::v-deep {
  /* height or max-height is important */
  min-height: 400px;
  max-height: 75vh;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

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
    <dialog-window :card="card" :getHeaderImage="getHeaderImage" />
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
        <q-btn
          v-if="$q.platform.is.mobile || $q.screen.lt.sm"
          @click="leftDrawerOpen = !leftDrawerOpen"
          rounded
          color="primary"
          icon="settings"
          size="md"
          label="Filters"
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
              class="absolute-top q-py-sm row no-wrap"
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
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="
            card.visible = true;
            card.data = props.row;
          "
          class="cursor-pointer"
        >
          <q-td
            key="title"
            :props="props"
            style=""
            class="ellipsis"
            :class="{ 'full-width': $q.screen.lt.sm }"
          >
            <q-img
              :src="props.row.thumb"
              style="height: 45px; max-width: 120px"
              :ratio="120 / 45"
              class="q-mr-xs"
              spinner-color="primary"
            />
            <span
              class="text-body2 "
              :class="{ 'custom-wrap': $q.screen.lt.sm }"
            >
              {{ props.row.title }}
            </span>
          </q-td>
          <q-td key="price" :props="props">
            <div class="row justify-end no-wrap">
              <div>
                <div>
                  <q-badge color="grey-7" outline class="text-strike">
                    ${{ props.row.normalPrice }}
                  </q-badge>
                </div>
                <q-badge color="purple" class="text-bold text-body2">
                  ${{ props.row.salePrice }}
                </q-badge>
              </div>
              <q-badge
                class="text-bold text-body2 bg-light-green-9"
                :class="{
                  'bg-deep-orange-10': parseInt(props.row.savings) > 85,
                  'bg-amber-10': parseInt(props.row.savings) > 70,
                  'bg-blue-grey-13': parseInt(props.row.savings) < 40
                }"
              >
                {{ parseInt(props.row.savings) }}%
              </q-badge>
            </div>
          </q-td>

          <q-td key="store" :props="props">
            <q-badge color="primary" class="text-bold text-body1">
              {{ props.row.storeID }}
            </q-badge>
          </q-td>
          <q-td key="release" :props="props">
            <q-badge color="grey-7" outline class="">
              {{
                new Date(props.row.releaseDate * 1000)
                  .toUTCString()
                  .slice(5, 16)
              }}
            </q-badge>
          </q-td>
          <q-td key="metacritic" :props="props">
            <q-badge
              class="text-body1 "
              :class="{
                'bg-positive': props.row.metacriticScore > 80,
                'bg-negative': props.row.metacriticScore < 50
              }"
            >
              {{ props.row.metacriticScore }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { data } from "./tempVariables";
import { columns } from "../bin/variables";
import DialogWindow from "src/components/dialog-window.vue";
import LeftFiltersMenu from "src/components/left-filters-menu.vue";

const pageSize = 20;
const nextPage = 2;
const lastPage = Math.ceil(data.length / pageSize);

export default {
  name: "Deals",
  data() {
    return {
      filtersVisible: false,
      nextPage,
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
    LeftFiltersMenu
  },
  activated: function() {
    this.oldCopy = { ...this.filters };
    this.nextPage = 1;
  },
  computed: {
    data() {
      return data.slice(0, pageSize * this.nextPage);
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
        }, 1000);
      }
    },
    getHeaderImage(src) {
      return src.replace("capsule_sm_120", "header");
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-title {
  color: #000;
}
.custom-wrap {
  white-space: pre-line;
}
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

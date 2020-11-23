<template>
  <div class="full-width">
    <q-btn
      v-if="$q.platform.is.mobile || $q.screen.lt.sm"
      @click="$emit('toggleDrawer')"
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
        @show="$emit('filtersVisibleToggle', true)"
        @hide="$emit('filtersVisibleToggle', false)"
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
                Filters out games with current retails price &gt;$29
              </q-tooltip>
            </q-icon>
            <q-checkbox
              class="q-ml-md q-pr-xs text-no-wrap"
              v-model="filters.steamworks"
              label="Steamworks"
            />
            <q-icon name="help_outline" style="cursor: help;">
              <q-tooltip>
                Steamworks games register and download on Steam no matter which
                store you buy the game from
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
  </div>
</template>

<script>
export default {
  props: {
    filters: Object,
    filterPrice: String,
    checkFilters: Function,
    filtersVisible: Boolean,
    ratingValue: String,
    leftDrawerOpen: Boolean
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

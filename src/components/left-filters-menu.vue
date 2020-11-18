<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    filters: Object,
    filterPrice: String,
    ratingValue: String,
    checkFilters: Function
  }
};
</script>

<style></style>

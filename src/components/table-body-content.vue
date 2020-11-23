<template>
  <q-tr
    ref="tableBody"
    :props="props"
    @click="fetchCard(props.row)"
    class="cursor-pointer"
  >
    <q-td
      key="title"
      :props="props"
      :style="{ maxWidth: $q.screen.lt.md ? '260px' : '450px' }"
      class="ellipsis"
    >
      <q-img
        :src="props.row.thumb"
        style="maxHeight: 45px; max-width: 120px"
        contain
        :ratio="120 / 45"
        class="q-mr-xs"
        spinner-color="primary"
      />
      <span class="text-body2" :class="{ 'custom-wrap': $q.screen.lt.sm }">
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
      <q-badge color="blue-grey-8">
        <img
          class="q-pa-xs "
          style="width: 24px; height: 24px"
          :src="
            `https://www.cheapshark.com/img/stores/icons/${props.row.storeID -
              1}.png`
          "
        />
        {{ stores[props.row.storeID - 1].storeName }}
      </q-badge>
    </q-td>
    <q-td key="release" :props="props">
      <q-badge color="grey-7" outline>
        {{
          props.row.releaseDate
            ? new Date(props.row.releaseDate * 1000).toUTCString().slice(5, 16)
            : "N/A"
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
        {{ props.row.metacriticScore > 0 ? props.row.metacriticScore : "N/A" }}
      </q-badge>
    </q-td>
  </q-tr>
</template>

<script>
import { Loading } from "quasar";

export default {
  props: {
    props: Object,
    card: Object,
    stores: [Object, Array]
  },
  methods: {
    async fetchCard(gameData) {
      Loading.show();
      fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameData.gameID}`)
        .then(response => response.json())
        .then(details => {
          this.card.data = gameData;
          this.card.details = details;
          this.card.visible = true;
          Loading.hide();
        })
        .catch(error => console.log("error", error));
    }
  }
};
</script>

<style scoped>
.custom-wrap {
  white-space: pre-line;
}
</style>

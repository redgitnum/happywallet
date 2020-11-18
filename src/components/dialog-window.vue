<template>
  <q-dialog v-if="card.visible" v-model="card.visible">
    <q-card class="full-width" square>
      <q-img :src="getHeaderImage(card.data.thumb)"> </q-img>
      <q-separator />
      <q-card-section class="q-py-sm">
        <div>
          <q-chip
            class="absolute-right q-ma-none q-mr-md glossy"
            style="top: 25px; right: 10px"
            color="yellow-10"
            text-color="white"
            icon-right="star"
            icon="star"
            size="sm"
          >
            All time cheapest!
          </q-chip>
          <q-chip
            class="absolute-right q-ma-none q-mr-md text-bold"
            style="top: 25px;"
            color="light-blue-9"
            text-color="white"
            size="sm"
          >
            cheapest on 12/03/2012
          </q-chip>
          <q-chip
            class="absolute-right q-ma-none q-mr-md glossy text-bold"
            style="top: 0; transform: translateY(-50%)"
            color="deep-orange-13"
            clickable
            text-color="white"
            size="xl"
          >
            <q-avatar>
              <img
                class="q-pa-xs"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-avatar>
            ${{ card.data.salePrice }}
          </q-chip>
          <div class="full-width">
            <div
              :class="{
                'text-h5': $q.screen.gt.xs,
                'text-body1': $q.screen.lt.sm
              }"
              :style="{ maxWidth: $q.screen.lt.sm ? '135px' : 'initial' }"
            >
              {{ card.data.title }}
            </div>
            <div v-if="card.data.releaseDate" class="text-caption">
              {{
                new Date(card.data.releaseDate * 1000)
                  .toUTCString()
                  .slice(12, 16)
              }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none q-px-none">
        <q-list separator class="bg-grey-1">
          <q-item-label header class="q-pt-sm">Other stores</q-item-label>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pr-md">
        <q-btn
          color="primary"
          label="Go to Deal"
          class="glossy q-px-lg q-py-xs"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    card: Object,
    getHeaderImage: Function
  }
};
</script>

<style></style>

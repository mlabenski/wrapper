<template>
    <section class="store-list">
    <v-data-table :headers="headers" :items="storeData">
      <template #item="row">
          <tr>
            <td>{{row.item.hppName}}</td>
            <td>{{row.item.numProducts}}</td>
            <td>
                <v-btn class="mx-2" fab dark small color="pink" @click="$emit('edit', item.storeID)">
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
            </td>
          </tr>
      </template>
    </v-data-table>
    </section>
</template>

<script>
export default {
    props: {
        storeData: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'hppName',
                },
                {
                    text: '# items',
                    value: 'numProducts',
                }
            ]
        }
    }
}
</script>

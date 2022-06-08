<template>
    <section class="store-list">
    <v-data-table :headers="headers" :items="storeData">
      <template #item="row">
          <tr>
            <td>{{row.item.hppName}}</td>
            <td>{{row.item.numProducts}}</td>
            <td>
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="$emit('editStore', row.item.storeID)"
                    >
                    <v-icon dark>mdi-archive-edit</v-icon>
                    </v-btn>
                </template>
                <span>Edit Store</span>
                </v-tooltip>                
            </td>
            <td>
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="secondary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="$emit('goLive', row.item.storeID)"
                    >
                    <v-icon dark>mdi-truck-delivery</v-icon>
                    </v-btn>
                </template>
                <span>Go Live</span>
                </v-tooltip>                
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

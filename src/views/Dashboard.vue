<template>
    <div class="column-container">
        <column
        class="item"
        v-for="item in columns"
        :id="item.id"
        :key="item.id"
        :title="item.name"
        :cards="item.cards"
         @columnChange="columnChange"
         @columnArchive="columnArchive"
         @cardSave="cardSave"
         @cardArchive="cardArchive"
         @cardAdd="cardAdd"
          />
          <div class="column-new item">
              <div>
                  <header>Nova coluna</header>
                  <input type="text" class="form-control" @keyup.enter="clickSaveColumn" v-model="coluna" />
                  <button class="btn btn-success" @click="clickSaveColumn">Salvar</button>
              </div>
          </div>
    </div>
</template>

<script>
import Column from '../components/Column.vue';
import ApiColumn from '../api/Column';
import ApiCard from '../api/Card';
import Vue from 'vue';
export default {
    name: 'Dashboard',
    components: {
        Column
    },
    data: () => {
        return {
            columns:[],
            coluna: ''
        };
    },
    created() {
        this.atualizarDados();
    },
    methods: {
        atualizarDados() {
        },
        columnChange(column) {
        },
        columnArchive(column) {
        },

        cardSave(idColumn,card) {
        },

        cardArchive(idColumn,card) {
        },

        cardAdd(idColumn,card) {
        },

        clickSaveColumn() {
        }
    }
}
</script>

<style>
div.column-container {
    padding: 2rem;
    height: calc(100vh - 4rem);
    overflow-x: auto;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
div.column-container .item {
    flex-grow: 0;
    min-width: 15rem;
    max-width: 15rem;
}
div.column-container > .item +  .item {
    margin-left: 1rem;
}

div.column-container > .column-new > div {
    background-color: rgb(255,255,255,0.5);
    padding: 0.5rem;
    border-radius: 0.5rem;
}

div.column-container > .column-new > div header {
    font-weight: bold;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

div.column-container > .column-new > div button {
    margin-top: 0.3rem;
}
</style>

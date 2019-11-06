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
        <input type="text" class="form-control" @keyup.enter="clickSaveColumn" v-model="column" />
        <button class="btn btn-success" @click="clickSaveColumn">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import Column from '../components/Column.vue';
import ApiColumn from '../api/Column';
import ApiCard from '../api/Card';

export default {

  name: 'Dashboard',
  components: {
    Column
  },

  data: () => {
    return {
      columns:[],
      column: ''
    };
  },

  created() {
    this.atualizarDados();
  },

  methods: {

    columnArchive(column) {

      let cIndex = this.columns.findIndex((c) => c.id == column.id);

      if (cIndex >= 0) {
        
        ApiColumn.arquivar(column, () => {
          this.columns.splice(cIndex, 1);
        }, (err) => {
          
          if (typeof err !== 'undefined') {
            Vue.$toast.open({
              type: 'error',
              position: 'top',
              message: err
            }); 
          }
           
        });
      } else {
        this.$toast.error('Não foi possível localizar a coluna localmente');
      }

    },

    clickSaveColumn() {

      ApiColumn.adicionar(this.column, () => {
        this.atualizarDados();
        this.column = '';
      },(err) => {

        if ((typeof err.response.status !== 'undefined') 
          && (err.response.status === 422)) {

          this.$toast.error(err.response.data.map((e) => e.message).join(', '));

        } else {
          this.$toast.error('Ocorreu um erro no cadastro do cartão');
        }

      });

    },

    atualizarDados() {
      ApiColumn.carregar((data) => {
        this.columns = data;
      }, () => {
        this.$toast.error('Erro ao carregar os dados');
      });
    },

    columnChange(obj) {

      ApiColumn.atualizar(obj, () => {
        this.atualizarDados();
      }, () => {
        this.$toast.error('Ocorreu um erro ao atualizar o titulo da coluna.');
      });

    },

    cardSave(idColumn, card) {

        ApiCard.atualizar(card, () => {
          this.atualizarDados();
        }, () => {
          this.$toast.error(`Ocorreu um erro ao atualizar o card ${card.todo}`);
        });

    },

    cardAdd(idColumn, card) {
      ApiCard.adicionar(idColumn, card, () => {
        this.atualizarDados();
      }, () => {
        this.$toast.error(`Ocorreu um erro ao adicionar o card ${card.todo}`);
      }); 
    },

    cardArchive(idColumn, card) {
      ApiCard.arquivar(card, () => {
        this.atualizarDados();
      }, () => {
        this.$toast.error(`Ocorreu um erro ao arquivar o card ${card.todo}`);
      });
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

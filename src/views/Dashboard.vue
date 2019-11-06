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
            ApiColumn.carregar((data) => {
                this.columns = data;
            },() => {
                this.$toast.error('Erro ao carregar os dados');
            });
        },
        columnChange(column) {
            let cIndex = this.columns.findIndex((c) => c.id == column.id);
            if (cIndex >= 0) {
                ApiColumn.atualizar(column,(data) => {
                    this.columns[cIndex].name = data.name;
                    this.columns[cIndex].cards = data.cards;
                },(err) => {
                    if (typeof err != 'undefined') Vue.$toast.open({type: 'error',position: 'top',message: err});
                });
            } else {
                this.$toast.error('Não foi possível localizar a coluna localmente');
            }
        },
        columnArchive(column) {
            let cIndex = this.columns.findIndex((c) => c.id == column.id);
            if (cIndex >= 0) {
                ApiColumn.arquivar(column,() => {
                    this.columns.splice(cIndex,1);
                },(err) => {
                    if (typeof err != 'undefined') Vue.$toast.open({type: 'error',position: 'top',message: err});
                });
            } else {
                this.$toast.error('Não foi possível localizar a coluna localmente');
            }
        },

        cardSave(idColumn,card) {
            let index = this.columns.findIndex((c) => c.id == idColumn);
            if (index >= 0) {
                ApiCard.atualizar({id: card.id, todo: card.todo},(data) => {
                    let cardIndex = this.columns[index].cards.findIndex((x) => x.id == card.id);
                    if (cardIndex >= 0) {
                        //atualiza os dados do cartão localmente
                        this.columns[index].cards[cardIndex] = data;
                    }
                },(err) => {
                    let msg = 'Não foi possível atualizar o cartao remotamente';
                    if ((typeof err.status != 'undefined') && (Math.floor(err.status/100) == 4)) {
                        msg = err.response.data.map((x) => x.message).join(', ');
                    }

                    this.$toast.error(msg);
                });
            }
        },

        cardArchive(idColumn,card) {
            let index = this.columns.findIndex((c) => c.id == idColumn);
            if (index >= 0) {
                ApiCard.arquivar(card,() => {
                    let cardIndex = this.columns[index].cards.findIndex((x) => x.id == card.id);
                    if (cardIndex >= 0) {
                        this.columns[index].cards.splice(cardIndex,1);
                    } else {
                        this.atualizarDados();
                    }
                },() => {
                    this.$toast.error('Não foi possível arquivar o cartão '+card.todo);
                })
            }
        },

        cardAdd(idColumn,card) {
            ApiCard.adicionar(idColumn,card,() => {
                this.atualizarDados();
            },() => {
                this.$toast.error('Não foi possível cadastrar o cartão');
            });
        },

        clickSaveColumn() {
            ApiColumn.adicionar(this.coluna,() => {
                this.atualizarDados();
                this.coluna = '';
            },(err) => {
                if ((typeof err.response.status != 'undefined') && (err.response.status == 422)) {
                    this.$toast.error(err.response.data.map((e) => e.message).join(', '));
                } else {
                    this.$toast.error('Ocorreu um erro no cadastro do cartão');
                }
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

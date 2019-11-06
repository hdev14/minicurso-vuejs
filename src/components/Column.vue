<template>
    <section class="column">
        <header>
            <div v-if="!edit" class="column-not-edit">
                <strong>{{titulo}}</strong>
                <div class="actions">
                    <a href="javascript:;" title="Arquivar" class="archive" @click="clickArquivar"><i class="fas fa-archive"></i></a>
                    <a href="javascript:;" title="Editar" class="edit" @click="edit = !edit"><i class="fas fa-edit"></i></a>
                </div>
            </div>
            <div v-else class="column-edit">
                <input type="text" v-model="titulo" @keyup.enter="clickSalvar" class="form-control" /><button class="btn btn-success" @click="clickSalvar">Ok</button>
            </div>
        </header>

        <section class="column-content">
            <card v-for="card in cards"
            :key="card.id"
            :id="card.id"
            :order="card.order"
            :todo="card.todo"

            @cardSave="cardSave"
            @cardArchive="cardArchive"

             />

             <div v-if="add" class="form-add">
                 <input type="text" ref="tarefaInput" v-model="tarefa" @keyup.enter="clickAdicionar" class="form-control" />
                 <button class="btn btn-success" @click="clickAdicionar">Salvar</button>
             </div>
        </section>
        <footer>
            <button class="btn btn-primary" @click="clickAdd">Adicionar cartão</button>
        </footer>
    </section>
</template>

<script>
import Card from '../components/Card.vue';
export default {
    name: 'Column',
    components: {
        Card
    },
    props: {
        id: Number,
        title: String,
        cards: Array
    },
    data: () => {
        return {
            edit: false,
            add:false,
            titulo: '',
            tarefa:''
        };
    },
    mounted() {
        this.titulo = this.title;
    },
    methods: {
        clickSalvar() {
            if (this.titulo != '') {
                this.$emit('columnChange',{id: this.id, title: this.titulo});
                this.edit = false;
            }
        },
        clickArquivar() {
            if (confirm('Deseja arquivar a coluna '+this.titulo+'?')) {
                this.$emit('columnArchive',{id: this.id, title: this.titulo})
            }
        },

        cardSave(card) {
            let index = this.cards.findIndex((x) => x.id == card.id);
            if (index >= 0) {
                this.cards[index].todo = card.todo;
                this.$emit('cardSave',this.id,card);
            } else this.$toast.error('Não foi possível localizar o cartão localmente');
        },
        cardArchive(card) {
            this.$emit('cardArchive',this.id,card);
        },
        clickAdd() {
            this.tarefa = '';
            this.add = true;
        },
        clickAdicionar() {
            if (this.tarefa != '') {
                this.$emit('cardAdd',this.id,{ todo: this.tarefa });
            }
            this.add = false;
        }
    }
}
</script>
<style>

section.column .actions a {
    margin-right: 0.4rem;
}

section.column > header {
    background-color: #fff;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

section.column > header, section.column > section.column-content, section.column > footer {
    padding: 0.9rem;
}

section.column > header > div.column-not-edit, div.column-edit, section.colum .form-add {
    display:flex;
    justify-content: space-between;
}

section.column-content{
    padding: 0.5rem 0;
    overflow-y: auto;
}

section.column-content, section.column > footer {
    background-color: #789ad3;

}

section.column > footer {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

section.column-content .column-card {
    margin: 0.2rem 0;
}


</style>

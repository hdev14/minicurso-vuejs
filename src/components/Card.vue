<template>
    <div class="column-card">
        <div v-if="!edit" class="column-card-display">
            <div class="task">
                {{ tarefa }}
            </div>
            <div class="card-actions">
                <a href="javascript:;" title="Arquivar" class="archive" @click="clickArquivar"><i class="fas fa-archive"></i></a>
                <a href="javascript:;" title="Editar" class="edit" @click="edit = !edit"><i class="fas fa-edit"></i></a>
            </div>
        </div>
        <div v-else class="form-edit">
            <input type="text" v-model="tarefa" @keyup.enter="clickSalvar" class="form-control" />
            <button class="btn btn-success" @click="clickSalvar">Salvar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        id:Number,
        order:Number,
        todo:String
    },
    data: () => {
        return {
            tarefa: '',
            edit:false
        };
    },
    created() {
        this.tarefa = this.todo;
    },
    methods: {
        clickArquivar() {
            if (confirm('O cartão '+this.tarefa+' deve ser arquivado?')) {
                this.$emit('cardArchive',{id: this.id, todo: this.tarefa});
            }
        },
        clickSalvar() {
            this.$emit('cardSave',{id: this.id, todo: this.tarefa});
            this.edit = false;
        }
    }
}
</script>

<style>
.column-card {
    padding: 0.5rem;

    border-radius: 0.2rem;
    background-color: rgba(255,255,255,0.5);
}

.column-card .column-card-display, .column-card .form-edit {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.column-card .card-actions {
    min-width: 1rem;
}
.column-card .card-actions a {
    margin-right: 0.4rem;
}
</style>

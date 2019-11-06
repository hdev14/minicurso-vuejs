import Vue from 'vue';

export default {
    
    atualizar(card, success, error) {

        Vue.axios.patch('card/'+card.id,{
            id: card.id,
            todo: card.todo
        }).then((response) => {
            if (Math.floor(response.status/100) === 2) {
                if (success) success(response.data);
            } else {
                if (error) error();
            }
        }).catch((err) => {
            if (error) error(err);
        })
    },

    arquivar(card, success, error) {
        
        Vue.axios.delete('card/'+card.id).then((response) => {
            
            if (Math.floor(response.status/100) === 2) {
                if (success) success(response.data);
            } else if (error) {
                error();
            }

        }).catch((err) => {
            if (error) error(err);
        });

    },

    adicionar(idColumn, card, success, error) {
        
        Vue.axios.post('card', {
            column_id: idColumn,
            todo: card.todo
        }).then((response) => {
            if (success) success(response.data);
        }).catch((err) => {
            if (error) error(err);
        });

    }
}

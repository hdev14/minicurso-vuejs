import Vue from 'vue';

export default {
    
    carregar(success, error) {
        
        Vue.axios.get('column').then((response) => {
            if (success) success(response.data);
        }).catch((err) => {
            if (error) error(err);
        });

    },

    adicionar(name, success, error) {
        Vue.axios.post('column', {
            name: name
        }).then((response) => {
            if (success) success(response.data);
        }).catch((err) => {
            if (error) error(err);
        });
    },

    atualizar(obj, success, error) {
        
        if (typeof obj.id !== 'undefined') {
            
            Vue.axios.patch('column/'+obj.id,{
                name: obj.title
            }).then((response) => {
                //Vue.$toast.success('Coluna atualizada');
                if (success) success(response.data);
            }).catch((err) => {
                let message = 'Não foi possível atualizar a coluna remotamente';
                
                if (typeof err !== 'undefined') message = err;
                
                Vue.$toast.error(message);
                
                if (error) error(err);
            });

        }
        
        if (error) error();
    },

    arquivar(column, success, error) {

        Vue.axios.delete('column/'+column.id).then((response) => {
            
            if (Math.floor(response.status/100) === 2) {
                if (success) success(response.data);
            } else {
                if (error) error();
            }

        }).catch((err) => {
            if (error) error(err);
        })
    }
}

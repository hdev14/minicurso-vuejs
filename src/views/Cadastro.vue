<template>
    <div class="cadastro">
        <h1>Cadastro de novo usuário</h1>
        <form @submit.prevent="cadastrar">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" v-model="nome" class="form-control" />
            </div>

            <div class="form-group">
                <label for="nome">Login</label>
                <input type="text" v-model="login" class="form-control" />
            </div>

            <div class="form-group">
                <label for="nome">Senha</label>
                <input type="password" v-model="senha" class="form-control" />
            </div>
            <div class="form-group">
                <button class="btn btn-success">Cadastrar</button>
            </div>

        </form>
    </div>
</template>
<script>
import UserApi from '../api/User'
export default {
    name: 'Cadastro',
    data: () => {
        return {
            nome: '',
            login: '',
            senha: '',
        };
    },
    methods: {
        cadastrar() {
            UserApi.cadastrar(this.nome,this.login,this.senha,() => {
                this.$router.push('/dashboard');
            },(err) => {
                if ((typeof err.response.status != 'undefined') && (err.response.status == 422)) {
                    this.$toast.error(err.response.data.map((e) => e.message).join(', '));
                } else {
                    this.$toast.error('Ocorreu um erro no cadastro do usuário');
                }
            });
        }
    }
}
</script>
<style>
    div.cadastro {
        max-width: 50rem;
        margin: 10rem auto;
    }
</style>

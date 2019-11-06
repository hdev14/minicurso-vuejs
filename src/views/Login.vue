<template>
    <div class="login">
        <h1>Autenticação</h1>
        <form @submit.prevent="autenticar">
            <label class="sr-only" for="login">Login</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">L</div>
                </div>
                <input type="text" class="form-control" id="login" v-model="login" placeholder="Login">
            </div>

            <label class="sr-only" for="senha">Senha</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">S</div>
                </div>
                <input type="password" class="form-control" id="senha" v-model="senha" placeholder="Senha">
            </div>


            <div class="form-group">
                <button class="btn btn-success">Logar</button>
            </div>

            <div class="form-group">
                <p>Não é cadastrado? <router-link to="/cadastro">Clique aqui</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import UserApi from '../api/User'
export default {
    name: 'Login',
    data: () => {
        return {
            login: '',
            senha: '',
        };
    },
    methods: {
        autenticar() {
            this.error = false;
            UserApi.autenticar(this.login,this.senha,() => {
                this.login = this.senha = '';
                this.$router.push('/dashboard');
            },()=> {
                //login/senha incorretos
                this.$toast.error('Login/senha incorretos');
            });


        }
    }
}
</script>

<style>
div.login {
    width: 20rem;
    margin: 10rem auto;
}


</style>

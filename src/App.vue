<template>

	<layout id="app" />

	<!-- <a v-bind:href="link" target="_blank">{{ message }}</a> -->
	
<!-- 	<div>
		
		<div v-if="display"> Exibindo a primeira opção</div>
		<div v-else>Outra opção no caso contrário</div>
		
		<h1>Lista de Compra</h1>
		<ul>
			<li v-for="item in products" :key="item">{{ item }}</li>
		</ul>

		<button class="btn btn-success" v-on:click="insert">
			Inserir
		</button>
	
		<input type="text" name="" v-model="newItem">
		<button class="btn btn-success" @click="insert" >
			Inserir
		</button>

	</div> -->

</template>



<script>

	import Layout from './layouts/Layout.vue';

	export default {
		name:'App',
		components: {
			Layout
		},

		created() {
			/*setTimeout(() => {
				this.link = 'https://expotec2019.com.br';
				this.display = false;

			}, 6000);*/

		},

		data: () => {
			return {
				// message: 'Hello World',
				// link: 'https://google.com',
				// display: true,
				products: ['Arroz', 'Feijão', 'Suco Fruta'],
				newItem: ''
			};
		},

		methods: {
			insert() {
				this.products.push(this.newItem);
				this.newItem = '';

			}
		}

	}

</script>

<template>
<div>
	<!-- Header section -->
	<header class="header-section clearfix">
		<div class="container-fluid">
			<a href="/" class="site-logo">
				<img src="img/logo.png" alt="">
			</a>
			<div class="responsive-bar"><i class="fa fa-bars"></i></div>
			<a href="" class="user"><i class="fa fa-user"></i></a>
			<nav class="main-menu">
				<ul class="menu-list">
					<li><a><router-link to="/">Home</router-link></a></li>
					<li><a><router-link to="/transaction-history">Transaction History</router-link></a></li>
				</ul>
			</nav>
		</div>
	</header>
	<!-- Header section end -->

	<!-- Hero section -->
	<section class="hero-section">
		<div class="container">
			<div class="row">
				<div class="col-md-6 hero-text">
					<h2>Create <span>Wallet</span></h2>
					<form class="hero-subscribe-from">
						<button class="site-btn sb-gradients"
								v-on:click = "createWallet">Get Created</button>
					</form>
				</div>
				<div class="col-md-6">
					<img src="img/laptop.png" class="laptop-image" alt="">
				</div>
			</div>
		</div>
	</section>
	<!-- Hero section end -->

	<!-- Process section -->
  <section id="transactionHistory" class="team-section spad">
		<div class="container">
			<div class="section-title text-center">
				<h2>Wallets</h2>
			</div>
		</div>
		<div class="team-members">
			<!-- Team member -->
			<div class="member">
				<div class="member-text">
					<div class="row">
						<div class="five columns">
							<table>
								<thead>
									<tr class="member-tr">
										<th><h2>#</h2></th>
										<th class="member-td"><h2>Address</h2></th>
									</tr>
								</thead>
						
								<tbody>
									<tr class="member-tr" v-for="wallet in wallets" :key="wallet">
										<td><span>{{ wallet.index }}</span></td>
										<!-- <td class="member-td"><a href = "index.html">{{ block.hash }}</a></td> -->
										<td class="member-td"><router-link :to="{ name: 'Wallet', params: { address: wallet.publicKey }}"><span>{{ wallet.publicKey }}</span></router-link></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			wallets: [],
		}
	},
	mounted () {
		this.load()
	},

	methods: {
		load: function (){
			axios.get('http://localhost:3001/wallets')
			.then(response => (this.wallets = response.data));
		},
		sortBlocks : function(blocks) {
			return blocks.slice()
			.reverse();
		},
		createWallet: function(){
			axios.post('http://localhost:3001/create-wallet')
			.then(response => (this.wallets = response.data));
		}
	}
}
</script>

<style>

</style>
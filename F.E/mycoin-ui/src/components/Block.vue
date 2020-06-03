<template>
 <!-- eslint-disable no-mixed-spaces-and-tabs  -->
  <div>
      <!-- Header section -->
	<header class="header-section clearfix">
		<div class="container-fluid">
			<a href="index.html" class="site-logo">
				<!-- <img src="img/logo.png" alt=""> -->
			</a>
			<div class="responsive-bar"><i class="fa fa-bars"></i></div>
			<a href="" class="user"><i class="fa fa-user"></i></a>
			<nav class="main-menu">
				<ul class="menu-list">
					<li><a><router-link to="wallet">Wallet</router-link></a></li>
					<li><a><router-link to="transaction-history">Transaction History</router-link></a></li>
				</ul>
			</nav>
		</div>
	</header>
	<!-- Header section end -->

	<!-- Page info section -->
	<section class="page-info-section">
		<div class="container">
			<h2>Transaction History</h2>
			<div class="site-beradcamb">
				<a href="/">Home</a>
				<span><i class="fa fa-angle-right"></i>Transaction History</span>
			</div>
		</div>
	</section>
	<!-- Page info end -->

	<!-- Team section -->
	<section id="transactionHistory" class="team-section spad">
		<div class="container">
			<div class="section-title text-center">
				<h2>History</h2>
			</div>
		</div>
  <div v-if="block.hash">

    <h3>Block #{{ block.index }}</h3>
    <table>
      <tbody>
      <tr>
        <td>Hash</td>
        <td>{{ block.hash }}</td>
      </tr>
      <tr>
        <td>Previous hash</td>
        <td>{{ block.previousHash}}</td>
      </tr>
      <tr>
        <td>Timestamp</td>
        <td>{{ block.timestamp}}</td>
      </tr>
      <tr>
        <td>Difficulty</td>
        <td>{{ block.difficulty}}</td>
      </tr>
      <tr>
        <td>Nonce</td>
        <td>{{ block.nonce}}</td>
      </tr>
      <tr>
        <td>Number of transactions</td>
        <td>{{ block.data.length}}</td>
      </tr>

      </tbody>
    </table>
    <h3>Transactions</h3>
    <div class="transaction" v-for="tx in block.data" :key="tx">
      <div class="row">
        <router-link :to="{ name: 'Transaction', params: { id: tx.id }}"> <span >{{ tx.id }}</span></router-link>

      </div>
      <div class="row">
        <div class="five columns">
          <div v-for="txIn in tx.txIns" :key="txIn">
            <div v-if="txIn.signature === ''">coinbase</div>
            <div class="break-word" v-else>{{ txIn.txOutId }} {{ txIn.txOutIndex }}</div>
          </div>
        </div>
        <div class="one columns">
          ->
        </div>
        <div class="six columns">
          <div class="row" v-for="txOut in tx.txOuts" :key="txOut">
            <div class="break-word"><router-link :to="{ name: 'Address', params: {address: txOut.address}}">
              <span>{{ txOut.address }}</span>
            </router-link>  amount: {{ txOut.amount}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>

	</section>
	<!-- Team section -->
  </div>
</template>


<script>
  export default {
    name: 'Block',
    data() {
      return {
        block :{}
      }
    },
    created() {
      this.getBlock(this.$route.params.id)
    },
    methods: {
      getBlock: function (hash) {
        this.$http.get('/api/block/' + hash)
          .then(resp => {
            this.block = resp.data;
          })
      },
      trimAddress: function(address) {
        return address.substr(0,24) + '...';
      }
    }
  }
</script>

<style>

</style>
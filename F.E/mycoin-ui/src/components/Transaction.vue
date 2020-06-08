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
					<li><a><router-link to="/">Home</router-link></a></li>
					<li><a><router-link to="/transaction-history">Transaction History</router-link></a></li>
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
    <section class="contact-page">
		<div class="container">
			<div class="row">
				<div class="col-md-12 hero-text">
                    <h3>Transaction:  <br><span>{{ transaction.id }}</span> </h3>
					<h4>Total amount: <span>{{ totalValue(transaction) }}</span> </h4>
                </div>
			</div>
            <div class="row">
                <br>
			</div>
		</div>
	</section>

	<section class="team-section spad">
        <div class="team-members">
            <div class="member">
                <!-- Team member -->
                <!-- <div class="member-text"> -->
                    <div class="row">
                        <div class="five columns">
                            <h4>TxIns</h4>
                            <br>
                            <div class="item" v-for="txIn in transaction.txIns" :key="txIn">
                                <div class="" v-if="txIn.signature ===''"><b>Coinbase transaction</b></div>
                                <div class="">TxOutId: <router-link :to="{ name: 'Transaction', params: {id: txIn.txOutId }}"> <span>{{ txIn.txOutId }}</span></router-link></div>
                                <div class="">TxOutIndex:  {{ txIn.txOutIndex }}</div>
                                <div class="">Signature: {{ txIn.signature }}</div>
                            </div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>

            <div class="member">
                <!-- Team member -->
                <div class="member-text">
                    <div class="row">
                        <div class="six columns">
                            <h4>TxOuts</h4>
                            <br>
                            <div class="item" v-for="txOut in transaction.txOuts" :key="txOut">
                                <div class="">Address: <router-link :to="{ name: 'Address', params: {address: txOut.address}}"> <span>{{ txOut.address }}</span></router-link> </div>
                                <div class="">Amount: {{ txOut.amount}}</div>
                            </div>
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
import axios from 'axios'
export default {
  name: 'Block',
    data() {
        return {
            transaction :{}
        }
    },
	mounted () {
		this.getTransaction(this.$route.params.id)
	},
	methods: {
        getTransaction: function (id) {
            axios.get('http://localhost:3001/transaction/' + id)
            .then(response => (this.transaction = response.data));
        },
        trimAddress: function(address) {
            return address.substr(0,24) + '...';
        },
        totalValue: function(transaction) {
            var sum = 0;
            transaction.txOuts.map(txOut => sum += txOut.amount);
            // return transaction.txOuts.map(txOut => txOut.amount).sum()
            return sum;
        }
	}
}
</script>

<style>

</style>
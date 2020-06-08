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
					<li><a><router-link to="/transaction-history">Transaction History</router-link></a></li>
				</ul>
			</nav>
		</div>
	</header>
	<!-- Header section end -->

	<!-- Page info section -->
	<section class="page-info-section">
		<div class="container">
			<h2>Wallet</h2>
			<div class="site-beradcamb">
				<a href="/">Home</a>
				<span><i class="fa fa-angle-right"></i>Wallet</span>
			</div>
		</div>
	</section>
	<!-- Page info end -->

	<!-- Infomation wallet section -->
	<section class="contact-page">
		<div id = "infoWallet" class="container">
			<div class="row">
				<div class="col-md-12 hero-text">
					<h3>Address:  <span>{{address}}</span> </h3>
					<h3>Balance: <span>{{balance}}</span> </h3>
				</div>
			</div>
		</div>
	</section>
	<!-- Infomation wallet section end -->

	<!-- Form send transaction section -->
	<section class="contact-page spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-7">
					<form class="contact-form">
							<div class="col-md-12">
								<div class="form-group">
									<input v-model="receiverAddress" class="check-form" type="text" placeholder="Address:">
									<span><i class="ti-check"></i></span>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<input v-model="receiverAmount" class="check-form" type="text" placeholder="Amount:">
									<span><i class="ti-check"></i></span>
								</div>
							</div>
							<div class="col-md-12">
								<button class="site-btn sb-gradients mt-4" 
										v-on:click = "sendTransaction">Send</button>
							</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- Form send transaction section end -->

    <!-- Team section -->
	<section id="transaction" class="team-section spad">
		<div class="container">
			<div class="section-title text-center">
				<h2>Transaction Pool</h2>
			</div>
		</div>

		<div class="team-members"
			v-if="transactionPool.length === 0">
			<div class="member">
				<div class="member-text">
		            <span>No transactions in transaction pool</span>
		        </div>
            </div>
		</div>

		<div class="team-members"
			v-if="transactionPool.length !== 0">
			<!-- Team member -->
			<div class="member" v-for="tx in transactionPool" :key="tx">
				<div class="member-text">
					<div class="row">
						<div class="five columns">
							<div class="row member-meta">
								<h2>TxId: <span >{{ tx.id }}</span></h2>
							</div>

							<div v-for="txIn in tx.txIns" :key="txIn">
								<div v-if="txIn.signature === ''">coinbase</div>
								<div class="row member-meta" v-else>txOutId: {{ txIn.txOutId }}<br>
																	txOutIndex: {{ txIn.txOutIndex }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="member-text">
					<div class="row">
						<div class="five columns">
							<div class="row">
								<h2><i class="fa fa-angle-right"></i></h2>
							</div>
						</div>
					</div>
				</div>	

				<div class="member-text">
					<div class="six columns">
						<div class="row" v-for="txOut in tx.txOuts" :key="txOut">
						  	<div class="member-meta">
								<h2>address: <span>{{ txOut.address }}</span></h2>		
								amount: {{ txOut.amount}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-12 text-center">
			<form>
				<button class="site-btn sb-gradients mt-4"
						v-on:click="mineBlock">Mine Block</button>
			</form>
		</div>
	</section>
	<!-- Team section -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            address: '',
            balance: '',
            receiverAddress: '',
            receiverAmount: '',
            transactionPool: [],
        }
    },
    mounted(){
        this.load();
    },
    methods: {
        load: function () {
			this.address = this.$route.params.address;
            // axios.get('http://localhost:3001/address')
            // .then(response => (this.address = response.data.address));

            axios.get('http://localhost:3001/balance/' + this.$route.params.address)
			.then(response => (this.balance = response.data.balance,
								console.log(response.data.balance)));

            axios.get('http://localhost:3001/transactionPool')
            .then((response) => (this.transactionPool = response.data));
        },

        sendTransaction: function (e) {
            e.preventDefault();
			axios.post(`http://localhost:3001/sendTransaction/` + this.$route.params.address, 
						{receiverAddress: this.receiverAddress,
                        amount: parseInt(this.receiverAmount)})
            .then(() => (this.receiverAddress = null,
                        this.receiverAmount = null),
                        this.load())
        },

        mineBlock: function () {
            axios.post(`http://localhost:3001/mineBlock/` + this.$route.params.address)
            .then(() => (this.load()))
        }
    }
    
    
}


</script>

<style>

</style>
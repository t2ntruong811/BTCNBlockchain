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
                    <h3>Address: <br><span>{{$route.params.address }}</span></h3>
                    <h4>Total amount: <span>{{ totalAmount(addressData.unspentTxOuts) }}</span></h4>
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
                            <h4>Unspent transaction outputs</h4>
                            <br>
                            <div class="item" v-for="uTxo in addressData.unspentTxOuts" :key="uTxo">
                                <div class="">txOutId:
                                    <router-link :to="{ name: 'Transaction', params :{ id: uTxo.txOutId}}"><span>{{ uTxo.txOutId }}</span>
                                    </router-link></div>
                                <div class="">txOutIndex: {{ uTxo.txOutIndex }}</div>
                                <div class="">amount: {{ uTxo.amount }}</div>
                                <div class="">address: {{ uTxo.address }}</div>
                            </div>
                        </div>
                    </div>
                <!-- </div> -->
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
            addressData :{}
        }
    },
	mounted () {
		this.getAddress(this.$route.params.address)
	},
	methods: {
        getAddress: function (address) {
            axios.get('http://localhost:3001/address/' + address)
            .then(response => {
                this.addressData = response.data;
            })
        },
        totalAmount: function(unspentOutputs) {
            var sum = 0;
            unspentOutputs.map(uTxo => sum += uTxo.amount);
            return sum;
        },
        trimAddress: function(address) {
            return address.substr(0,24) + '...';
        }
	}
}
</script>

<style>

</style>
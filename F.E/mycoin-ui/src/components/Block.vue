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
	<section id="transactionHistory" class="team-section spad">
    <div class="container">
			<div class="section-title text-center">
				<h2>Block #{{ block.index }}</h2>
			</div>
		</div>

    <div class="team-members">
        <!-- Team member -->
        <div class="member">
          <div class="member-text">
            <div class="row">
              <div class="five columns" v-if="block.hash">
                <table>
                  <tbody>
                    <tr class="member-tr">
                      <td><h2>Hash</h2></td>
                      <td class="member-td">{{ block.hash }}</td>
                    </tr>
                    <tr class="member-tr">
                      <td><h2>Previous hash</h2></td>
                      <td class="member-td">{{ block.previousHash}}</td>
                    </tr>
                    <tr class="member-tr">
                      <td><h2>Timestamp</h2></td>
                      <td class="member-td">{{ block.timestamp}}</td>
                    </tr>
                    <tr class="member-tr">
                      <td><h2>Difficulty</h2></td>
                      <td class="member-td">{{ block.difficulty}}</td>
                    </tr>
                    <tr class="member-tr">
                      <td><h2>Nonce</h2></td>
                      <td class="member-td">{{ block.nonce}}</td>
                    </tr>
                    <tr class="member-tr">
                      <td><h2>Number of transactions</h2></td>
                      <td class="member-td">{{ block.data.length}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
	</section>
	<!-- Team section -->

  <!-- Team section -->
	<section id="transactionHistory" class="team-section spad">
    <div class="container">
			<div class="section-title text-center">
				<h2>Transaction</h2>
			</div>
		</div>

    <!-- Team member -->
    <div class="team-members">
      <div class="member" v-for="tx in block.data" :key="tx">
        <div class="member-text">
          <div class="row">
            <div class="five columns" v-if="block.hash">
              <div class="row member-meta">
                  <router-link :to="{ name: 'Transaction', params: { id: tx.id }}"><span >{{ tx.id }}</span></router-link>
              </div>

              <div v-for="txIn in tx.txIns" :key="txIn">
                <div class="row member-meta" v-if="txIn.signature === ''">coinbase</div>
                <div class="row member-meta" v-else>{{ txIn.txOutId }} - 
                                                    {{ txIn.txOutIndex }}</div>
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
                <router-link :to="{ name: 'Address', params: {address: txOut.address}}"><span>{{ txOut.address }}</span></router-link>		
                {{ txOut.amount}}
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
      block :{}
    }
  },
	mounted () {
		this.getBlock(this.$route.params.id)
	},

	methods: {
		getBlock: function (hash){
			axios.get('http://localhost:3001/block/' + hash)
			.then(response => (this.block = response.data));
		},
    trimAddress: function(address) {
      return address.substr(0,24) + '...';
    }
	}
}
</script>

<style>

</style>
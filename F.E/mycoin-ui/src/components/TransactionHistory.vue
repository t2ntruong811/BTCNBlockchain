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
										<th class="member-td"><h2>Hash</h2></th>
										<th class="member-td"><h2>Transactions</h2></th>
										<th class="member-td"><h2>Timestamp</h2></th>
									</tr>
								</thead>
						
								<tbody>
									<tr class="member-tr" v-for="block in sortBlocks(blocks)" :key="block">
										<td><span>{{ block.index }}</span></td>
										<!-- <td class="member-td"><a href = "index.html">{{ block.hash }}</a></td> -->
										<td class="member-td"><router-link :to="{ name: 'block', params: { id: block.hash }}"><span>{{ block.hash }}</span></router-link></td>
										<td class="member-td"><span>{{ block.data.length }}</span></td>
										<td class="member-td"><span>{{ block.timestamp}}</span></td>
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			blocks: [],
		}
	},
	mounted () {
		this.load()
	},

	methods: {
		load: function (){
			axios.get('http://localhost:3001/blocks')
			.then(response => (this.blocks = response.data));
		},
		sortBlocks : function(blocks) {
			return blocks.slice()
			.reverse();
		}
	}
}
</script>

<style>

</style>
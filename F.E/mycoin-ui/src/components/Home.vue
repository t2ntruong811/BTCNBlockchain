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
					<li><a><router-link to="wallet">Wallet</router-link></a></li>
					<li><a><router-link to="transaction-history">Transaction History</router-link></a></li>
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
						<input type="password" placeholder="Enter your password">
						<button class="site-btn sb-gradients">Get Created</button>
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
  <section class="process-section spad">
    <div class="container">
      <div class="section-title text-center">
        <h2>Get Started With Bitcoin</h2>
        <p>Start learning about Bitcoin with interactive tutorials. It’s fun, easy, and takes only a few minutes! </p>
      </div>
      <div class="row">
        <div class="col-md-4 process">
          <div class="process-step">
            <figure class="process-icon">
              <img src="img/process-icons/1.png" alt="#">
            </figure>
            <h4>Create Your Wallet</h4>
            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
        </div>
        <div class="col-md-4 process">
          <div class="process-step">
            <figure class="process-icon">
              <img src="img/process-icons/2.png" alt="#">
            </figure>
            <h4>Create Your Wallet</h4>
            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
        </div>
        <div class="col-md-4 process">
          <div class="process-step">
            <figure class="process-icon">
              <img src="img/process-icons/3.png" alt="#">
            </figure>
            <h4>Create Your Wallet</h4>
            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
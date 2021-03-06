import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Wallet from '@/components/Wallet'
import TransactionHistory from '@/components/TransactionHistory'
import Block from '@/components/Block'
import Transaction from '@/components/Transaction'
import Address from '@/components/Address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wallet/:address',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: TransactionHistory
    },
    {
      path: '/block/:id',
      name: 'block',
      component: Block
    },
    {
      path: '/transaction/:id',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/address/:address',
      name: 'Address',
      component: Address
    }
  ]
})

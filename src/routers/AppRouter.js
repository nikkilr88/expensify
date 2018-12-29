import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'

import App from '../components/App'
import ExpenseDashboard from '../components/ExpenseDashboard'
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import Header from '../components/Header'
import NotFound from '../components/NotFound'
import Help from '../components/Help'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/dashboard" component={ExpenseDashboard} />
        <Route path="/create" component={AddExpense} />
        <Route path="/edit" component={EditExpense} />
        <Route path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
import React from 'react'

const ExpenseListItem = ({ description, amount, createdAt }) => (
  <div>
    <p>
      {amount} - {description} (Date:{createdAt})
    </p>
  </div>
)

export default ExpenseListItem

import React from 'react'
import ReactDOM from 'react-dom'

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>Info: {props.info}</p>
  </div>
)

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share</p>}
      <WrappedComponent {...props} />
    </div>
  )
}

const AdminInfo = withAdminWarning(Info)

// CHALLENGE - requireAuth

const requireAuth = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Sorry, you cannot view this content.</p>
      )}
    </div>
  )
}

const AuthInfo = requireAuth(Info)

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="This is the info." />,
  document.getElementById('root')
)

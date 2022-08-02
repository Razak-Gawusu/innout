import React from 'react'

function UserInitails(props) {
  return (
    <>
        <div className='profile'>
            <h3>{ props.userInitials}</h3>
        </div>
    </>
  )
}

export default UserInitails
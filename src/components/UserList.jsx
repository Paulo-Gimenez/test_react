import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [searchTerm])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteUser = (userId) => {
    const userIndex = users.findIndex(user => user.id === userId)
    users.splice(userIndex, 1)
    setUsers(users)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)

    setTimeout(() => {
      console.log('Searching for:', e.target.value)
    }, 500)
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="card">
      <h2>User List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div>
        <button className="button" onClick={fetchUsers}>
          Refresh Users
        </button>
        <span style={{ marginLeft: '10px' }}>
          Showing {filteredUsers.length} of {users.length} users
        </span>
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong>
              <div>{user.email}</div>
              <div>{user.phone}</div>
            </div>
            <button 
              className="button" 
              onClick={() => deleteUser(user.id)}
              style={{ background: '#dc3545' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList

import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'
import { debounce } from '../utils/debounce'

interface User {
  id: number
  name: string
  email: string
  phone: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)
    }, 400),
    []
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }

  const deleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId))
  }

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, users])

  return (
    <div className="card">
      <h2>User List</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search users..."
          onChange={onSearchChange}
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      {loading && <div className="loading">Loading users...</div>}
      {error && <div className="error">{error}</div>}

      <div>
        <button className="button" onClick={fetchUsers}>Refresh Users</button>
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

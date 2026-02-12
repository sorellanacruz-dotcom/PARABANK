import React, { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export default function App(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');

  async function register(){
    try{
      const r = await axios.post(`${API}/auth/register`, { email, password });
      setToken(r.data.token);
      setMessage('Registered and logged in');
    }catch(e){ setMessage(e.response?.data?.error || e.message) }
  }

  async function login(){
    try{
      const r = await axios.post(`${API}/auth/login`, { email, password });
      setToken(r.data.token);
      setMessage('Logged in');
    }catch(e){ setMessage(e.response?.data?.error || e.message) }
  }

  async function fetchAccounts(){
    try{
      const r = await axios.get(`${API}/accounts`, { headers: { Authorization: `Bearer ${token}` } });
      setAccounts(r.data.accounts || []);
    }catch(e){ setMessage(e.response?.data?.error || e.message) }
  }

  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h1>ParaBank (scaffold)</h1>
      {!token ? (
        <div>
          <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={fetchAccounts}>Load Accounts</button>
          <ul>
            {accounts.map(a=> <li key={a.id}>{a.type}: ${a.balance}</li>)}
          </ul>
        </div>
      )}
      <div style={{marginTop:10,color:'red'}}>{message}</div>
    </div>
  )
}

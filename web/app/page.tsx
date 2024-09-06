"use client";
import React, { useState, FormEvent } from 'react';

export default function Page() {
  const [address, setAddress] = useState("");
  const baseUrl = "localhost:3000"

  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleRedirection = () => {

  }

  https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input type="text" onChange={handleAddress}  />
      <a href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/actions/squad?address=${address}`}>Make transaction</a>
      <a href="https://github.com/solana-labs/solana-program-library">Config wallet</a>
      <a href="https://github.com/solana-labs/solana-program-library">Deposit</a>
    </div>
  )
}

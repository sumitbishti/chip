'use client'
import ChipContainer from '../components/ChipContainer';

export default function Home() {
  return (
    <main style={{ height: '100vh', display: 'flex' }}>
      <div style={{ backgroundColor: 'grey', height: '40%', width: '50%', margin: "auto", borderRadius: '10px' }}>
        <ChipContainer />
      </div>
    </main>
  )
}

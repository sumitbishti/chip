'use client'
import ChipContainer from '../components/ChipContainer';

export default function Home() {
  return (
    <main style={{ height: '100vh', display: 'flex' }}>
      <div style={{ backgroundColor: 'grey', height: '30%', width: '50%', margin: "auto" }}>
        <ChipContainer />
      </div>
    </main>
  )
}

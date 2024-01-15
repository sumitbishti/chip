'use client'
import ChipComponent from '../components/chip';

export default function Home() {

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <main style={{ height: '100vh', display: 'flex' }}>
      <div style={{ backgroundColor: 'grey', height: '30%', width: '50%', margin: "auto" }}>
        <ChipComponent />
      </div>
    </main>
  )
}

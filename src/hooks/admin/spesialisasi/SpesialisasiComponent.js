import React from 'react'
import { useSpesialisasiMutations } from '@/hooks/spesialisasi'

const SpesialisasiComponent = ({ spesialisasi }) => {
  const { activate } = useSpesialisasiMutations()

  const handleActivate = () => {
    activate.mutate(spesialisasi.id)
  }

  return (
    <div>
      <h3>{spesialisasi.nama}</h3>
      <button onClick={handleActivate} disabled={activate.isLoading}>
        {activate.isLoading ? "Aktivasi..." : "Aktifkan Spesialisasi"}
      </button>
      {activate.isError && <p>Gagal mengaktifkan spesialisasi!</p>}
    </div>
  )
}

export default SpesialisasiComponent;

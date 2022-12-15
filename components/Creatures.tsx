import { useEffect, useState } from 'react'
import Image from 'next/image'
import apiService from '../lib/apiService'
import type { ICreature } from '../types/creature.js'

export default function Creatures() {
  const [creatures, setCreatures] = useState<ICreature[]>([])

  const imageName = (creature: string) => {
    return '/images/' + creature.replaceAll(' ', '-').toLowerCase() + '.jpg'
  }

  useEffect(() => {
    apiService.GetCreatures()
      .then(data => {
        console.log(data)
        setCreatures(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <ul>
      {creatures.map((creature, index: number) => (
        <li key={index}>
          <h2>{creature.name}</h2>
          <p>{creature.desc}</p>
          <Image src={imageName(creature.name)} alt={creature.name} width={200} height={200} />
        </li>
      ))}
    </ul>
  )
}
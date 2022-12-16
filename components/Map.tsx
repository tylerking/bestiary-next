
import { useState } from 'react'
import Image from 'next/image'
import _ from 'lodash'
import apiService from '../lib/apiService'
import type { ICreature } from '../types/creature.js'

import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
import topology from '@highcharts/map-collection/countries/us/us-all.geo.json'
import {states} from '../mapData'

export default function Map() {
  const [creature, setCreature] = useState<ICreature[]>([])

  const [options] = useState({
    chart: {
      map: topology
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox'
      }
    },

    series: [
      {
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },
        allAreas: false,
        data: states,
        point: {
          events: {
            click: (e: any) => {
              console.log(e.point.name)
              getCreature(e.point.name)
            }
          }
        }
      }
    ]
  })

  const getCreature = (state: string) => {
    apiService.GetCreature(state)
      .then(data => {
        console.log(data)
        setCreature(data)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <HighchartsReact
        constructorType = {'mapChart'}
        highcharts={Highcharts}
        options={options}
      />
      <ul>
        {creature.map((creature, index: number) => (
          <li key={index}>
            <h2>{creature.name}</h2>
            <p>{creature.desc}</p>
            <Image src={creature.image} alt={creature.name} width={200} height={200} />
            <p>{creature.state}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

import { useEffect, useState } from 'react'
import Image from 'next/image'
import _ from 'lodash'
import apiService from '../lib/apiService'
import type { ICreature } from '../types/creature.js'

import Highcharts from 'highcharts/highmaps'
import HighchartsReact from 'highcharts-react-official'
import highchartsAccessibility from 'highcharts/modules/accessibility'
import topology from '@highcharts/map-collection/countries/us/us-all.geo.json'
import { states } from '../lib/mapData'

import { useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Code,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function Map() {
  const [creature, setCreature] = useState<ICreature[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [options] = useState({
    accessibility: {
      enabled: false
    },
    colors: ['#9E9D99'],
    chart: {
      map: topology,
      backgroundColor: '#0F0617',
      plotBorderColor: '#606063'
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
            color: '#CCC8BC'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },
        allAreas: false,
        borderColor: '#6e6d6a',
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

  const getLoader = () => {
    return <Spinner/>
  }

  const getCreature = (state: string) => {
    apiService.GetCreature(state)
      .then(data => {
        console.log(data)
        setCreature(data)
        onOpen()
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    highchartsAccessibility(Highcharts)
  }, [])

  return (
    <>
      <h1>The American Bestiary</h1>

      Creatures Endpoint: <Code>https://bestiary-next.netlify.app/api/creatures</Code>
      State Endpoint: <Code>https://bestiary-next.netlify.app/api/creature/Oregon</Code>


      <HighchartsReact
        constructorType={'mapChart'}
        highcharts={Highcharts}
        options={options}
      />

      {creature.map((creature, index: number) => (
        <Modal key={index} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{creature.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <strong>State:</strong>
              <span> {creature.state}</span>
              <div dangerouslySetInnerHTML={{__html: creature.desc}} />
              
              <Image
                alt={creature.name}
                src={creature.image}
                width={420} height={420}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </>
  )
}
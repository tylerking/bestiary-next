import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    
    global: (props: any) => ({
      body: {
        bg: '#0F0617',
        //color: '#ffffff'
      },
      fonts: {
        heading: 'Fugaz One',
        body: '\'Raleway\', sans-serif',
      },
    })
  }
})

export default theme

import { Button, Box, AppBar, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar  style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <div>
              <Typography sx={{ flexGrow: 1 }} variant='h6' >
                <Link to='/'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  RDBot Database Backend
                </Link>
              </Typography>
            </div>

            <div>
            <Button
                variant='contained'
                color='primary'
               // onClick={() => navigate('/pathologies/')}
                onClick={() => navigate('/')}
              >
                Inicio
              </Button>

              <Button
                variant='contained'
                color='primary'
                //onClick={() => navigate('/pathologies/new')}
                onClick={() => navigate('/')}
                style={{
                  marginLeft: '.5rem'
                }}
              >
                Cerrar sesion
              </Button>
            </div>
          </Toolbar>

        </Container>

      </AppBar>

    </Box>

  )
}

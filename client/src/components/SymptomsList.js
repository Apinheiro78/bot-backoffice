import { useEffect, useState } from "react"
import { Button, Card, CardContent, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function SymptomsList() {

  const [sintomas, SetSintomas] = useState([])
  const [sintomascount, SetSintomasCount] = useState({
    'count': '0'
  });
  const navigate = useNavigate();

  //PIDO LOS DATOS AL BACKEND
  const loadSymptoms = async () => {

    try {
      const response = await fetch('http://localhost:4000/symptoms')
      const data = await response.json()
      // console.log(data)
      SetSintomas(data)
    } catch (error) {

      //console.log(error)
      console.log(error.message)
    }

  }

  const loadSymptomsCount = async () => {

    try {
      const response = await fetch('http://localhost:4000/count/symptoms')
      const data = await response.json()
      // console.log(data)
      SetSintomasCount(data)
    } catch (error) {

      //console.log(error)
      console.log(error.message)
    }

  }


  //recibe parametro para BORRAR la id seleccionada en el backend
  const handleDelete = async (id) => {

    //borra la id seleccionada en el frontend
    SetSintomas(sintomas.filter(sintoma => sintoma.sym_id !== id))

    try {
      //borra la id seleccionada en el back end
      const resp = await fetch(`http://localhost:4000/symptoms/${id}`, {
        method: 'DELETE'
      })

      //devuelve status = 2o4 si sale bien no un json
      //const data = await resp.json();
      //console.log(data);
      console.log(resp);

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {
    loadSymptomsCount()
    loadSymptoms()
   
  }, [])


  return (
    <>
      <h2>Listado de Sintomas del sistema</h2>

      <h3>Mostrando 20 registros de {  (sintomascount.count !== '0') ? sintomascount[0].count : '0'}</h3>

      {

        (sintomas.length !== 0) ?

          sintomas.map(sintoma => (
            <Card
              style={
                {
                  marginBottom: '.7rem',
                  backgroundColor: '#1e272e'
                }
              }
              key={sintoma.sym_id}
            >
              <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div style={{ color: 'white' }}>
                  <Typography variant='h6'>{sintoma.name}</Typography>
                  <Typography>{'SYM Id: ' + sintoma.sym_id}</Typography>
                  <Typography>{'HPO Id: ' + sintoma.hpo_id}</Typography>

                </div>
                <div>
                  <Button
                    variant="contained"
                    color="inherit"
                    //onClick={() => console.log('Editando')}
                    onClick={() => navigate(`/symptoms/${sintoma.sym_id}/edit`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    //onClick={() => console.log('Editando')}
                    onClick={() => navigate(`/categories_symptoms/${sintoma.sym_id}`)}
                    style={{
                      marginLeft: '.5rem'
                    }}
                  >
                    Categorías asociadas
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    //onClick={() => console.log('Borrando')}
                    onClick={() => handleDelete(sintoma.sym_id)}
                    style={{
                      marginLeft: '.5rem'
                    }}
                  >
                    Borrar
                  </Button>
                </div>
              </CardContent>
            </Card >
          )

          )

          :
          <Grid container spacing={3}>
            <Grid item xs={1} >

            </Grid>

            <Grid item xs={10} >
              <h4>No hay resultados para la búsqueda.</h4>
            </Grid>

            <Grid item xs={1} >

            </Grid>
          </Grid>

      }

    </>
  )
}

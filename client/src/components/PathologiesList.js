import { useEffect, useState } from "react"
import { Button, Card, CardContent, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';


export default function PathologiesList() {

  /// const { request } = require("express");

  const [patologias, SetPatologias] = useState([])
  const [patologiascount, SetPatologiasCount] = useState({
    'count': '0'
});
  const navigate = useNavigate();

  //PIDO LOS DATOS AL BACKEND
  const loadPathologies = async () => {

    try {
      const response = await fetch('http://localhost:4000/pathologies')
      const data = await response.json()
      //console.log(data)
      SetPatologias(data)
    } catch (error) {

      //console.log(error)
      console.log(error.message)
    }

  }

  //PIDO LOS DATOS AL BACKEND
  const loadPathologiesCount = async () => {

    try {
      const response = await fetch('http://localhost:4000/count/pathologies')
      const data = await response.json()
      console.log(data)
      SetPatologiasCount(data)
    } catch (error) {

      //console.log(error)
      console.log(error.message)
    }

  }

  //recibe parametro para BORRAR la id seleccionada en el backend
  const handleDelete = async (id) => {
    //borra la id seleccionada en el frontend
    SetPatologias(patologias.filter(patologia => patologia.pat_id !== id))

    try {
      //borra la id seleccionada en el back end
      const resp = await fetch(`http://localhost:4000/pathologies/${id}`,
        {
          method: 'DELETE'
        }
      )

      //devuelve status = 2o4 si sale bien no un json
      //const data = await resp.json();
      //console.log(data);
      console.log(resp);

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {
    loadPathologiesCount()
    loadPathologies()

  }, [])


  return (
    <>
      <h2>Listado de Patologías del sistema</h2>

      <h3>Mostrando 20 registros de {  (patologiascount.count !== '0') ? patologiascount[0].count : '0'} </h3>

      {

        (patologias.length !== 0) ?


          patologias.map(patologia => (
            <Card
              style={
                {
                  marginBottom: '.7rem',
                  backgroundColor: '#1e272e'
                }
              }
              key={patologia.pat_id}
            >
              <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div style={{ color: 'white' }}>


                  <Typography variant='h6'>{patologia.name}</Typography>


                  <Typography>{'Pat ID: ' + patologia.pat_id}</Typography>
                  <Typography>{'Orpha: ' + patologia.orpha_id}</Typography>
                  <Typography>{'Omim: ' + patologia.omim_id}</Typography>

                </div>
                <div>
                  <Button
                    variant="contained"
                    color="inherit"
                    //onClick={() => console.log('Editando')}
                    onClick={() => navigate(`/pathologies/${patologia.pat_id}/edit`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    //onClick={() => console.log('Editando')}
                    onClick={() => navigate(`/pathologies_symptoms/${patologia.pat_id}`)}
                    style={{
                      marginLeft: '.5rem'
                    }}
                  >
                    síntomas asociados
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    //onClick={() => console.log('Borrando')}
                    onClick={() => handleDelete(patologia.pat_id)}
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


import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function PathologiesForm() {

  const [patologia, SetPatologia] = useState({
    'pat_id': '',
    'name': '',
    'orpha_id': '',
    'omim_id': ''

  });

  const [cargando, SetCargando] = useState(false);
  const [editando, SetEditando] = useState(false);
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit')
    //console.log(patologia)

    SetCargando(true)

    if (editando) {


      console.log('Editado')

      //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA ACTUALIZAR UNA PATOLOGIA
      const res = await fetch(`http://localhost:4000/pathologies/${params.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(patologia),
          headers: { "Content-Type": "application/json" }
        }
      )
      const data = await res.json()
      console.log(data)

    } else {

      //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA CREAR UNA PATOLOGIA
      const res = await fetch('http://localhost:4000/pathologies/', {
        method: 'POST',
        body: JSON.stringify(patologia),
        headers: { "Content-Type": "application/json" }
      })

      // OBTENGO LOS DATOS REALES DE LA RESPUESTA EL POST ANTERIOR
      const data = await res.json()
      console.log(data)
    }



    //TERMINO EL PROCESO 
    SetCargando(false)

    //LO ENVIO AL INICIO 
    navigate('/')

  }

  const handleOnChange = e => {
    //  console.log(e.target.name, e.target.value)
    SetPatologia({ ...patologia, [e.target.name]: e.target.value })
  }

  //// AGREGO CODIGO PARA CUANDO VENGO A EDITAR USANDO EL MISMO FORM DE CREAR

  const cargarPatologia = async (id) => {
    const res = await fetch(`http://localhost:4000/pathologies/${id}`)
    const data = await res.json()
    //console.log(data)
    SetPatologia({ pat_id: data.pat_id, name: data.name, orpha_id: data.orpha_id, omim_id: data.omim_id })
    SetEditando(true)
  }

  const zeroPad = (num, places) => String(num).padStart(places, '0')


  const cargarUltimaPatologia = async () => {
    try {
        const res = await fetch(`http://localhost:4000/last/pathologies/`)
        const data = await res.json()

        console.log(data.max)
        let dato = data.max.split("_")
        console.log(dato[1])
        let numeroultimo = parseInt(dato[1]) + 1
        console.log(numeroultimo)
        numeroultimo = zeroPad(numeroultimo, 6)
        numeroultimo = 'PAT_' + numeroultimo
        TextField.pat_id = numeroultimo

        SetPatologia({ pat_id: numeroultimo })

    } catch (error) {

        console.log(error)

    }

}



  useEffect(() => {
    //si viene con algun id..
    if (params.id) {
      // console.log('viene con un dato')
      cargarPatologia(params.id)
    }
    else {
      cargarUltimaPatologia();
    }

  }, [params.id])




  return (

    <Grid container direction={'column'} alignContent={'center'} justifyContent={'center'} >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: '#bdbdbd',
            padding: '1 rem'
          }}
        >
          <Typography variant='5' textAlign='center' color='black'>
            {editando ? "Editar Patologia" : "Crear Nueva Patologia"}

          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Nombre de la patologia'
                name='name'
                value={patologia.name}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Codigo Patologia'
                name='pat_id'
                value={patologia.pat_id}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Codigo Orpha'
                name='orpha_id'
                value={patologia.orpha_id}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Codigo Omim'
                name='omim_id'
                value={patologia.omim_id}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />

              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!patologia.pat_id || !patologia.name || !patologia.omim_id || !patologia.orpha_id}
              >
                {cargando ? < CircularProgress
                  color='inherit'
                  size={24}

                /> : 'Guardar'}

              </Button>


            </form>
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  )
}

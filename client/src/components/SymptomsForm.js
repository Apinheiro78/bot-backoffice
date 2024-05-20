
import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function SymptomsForm() {

  const [sintoma, SetSintoma] = useState({
    'name': '',
    'sym_id': '',
    'hpo_id': ''
  });

  const [cargando, SetCargando] = useState(false);
  const [editando, SetEditando] = useState(false);
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit')
    //console.log(sintoma)

    SetCargando(true)

    if (editando) {


      console.log('Editado')

      //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA ACTUALIZAR UNA SINTOMA
      const res = await fetch(`http://localhost:4000/symptoms/${params.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(sintoma),
          headers: { "Content-Type": "application/json" }
        }
      )
      const data = await res.json()
      console.log(data)

    } else {

      //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA CREAR UN SINTOMA
      const res = await fetch('http://localhost:4000/symptoms/', {
        method: 'POST',
        body: JSON.stringify(sintoma),
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
    SetSintoma({ ...sintoma, [e.target.name]: e.target.value })
  }

  //// AGREGO CODIGO PARA CUANDO VENGO A EDITAR USANDO EL MISMO FORM DE CREAR

  const cargarSintoma = async (id) => {
    const res = await fetch(`http://localhost:4000/symptoms/${id}`)
    const data = await res.json()
    //console.log(data)
    SetSintoma({ name: data.name, sym_id: data.sym_id, hpo_id: data.hpo_id })
    SetEditando(true)
  }

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  const cargarUltimoSintoma = async () => {
      try {
          const res = await fetch(`http://localhost:4000/last/symptoms/`)
          const data = await res.json()

          console.log(data.max)
          let dato = data.max.split("_")
          console.log(dato[1])
          let numeroultimo = parseInt(dato[1]) + 1
          console.log(numeroultimo)
          numeroultimo = zeroPad(numeroultimo, 6)
          numeroultimo = 'SYM_' + numeroultimo
          TextField.sym_id = numeroultimo
 
          SetSintoma({ sym_id: numeroultimo})

      } catch (error) {

          console.log(error)

      }

  }


  useEffect(() => {
    //si viene con algun id..
    if (params.id) {
      // console.log('viene con un dato')
      cargarSintoma(params.id)
    }
    else {
      cargarUltimoSintoma();
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
            {editando ? "Editar Sintoma" : "Crear Nuevo Sintoma"}

          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Nombre del sintoma'
                name='name'
                value={sintoma.name}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Codigo sintoma'
                name='sym_id'
                value={sintoma.sym_id}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />

              <TextField
                variant='filled'
                label='Codigo HPO'
                name='hpo_id'
                value={sintoma.hpo_id}
                onChange={handleOnChange}
                sx={{ display: 'block', margin: '.5rem 0' }}
                inputprops={{ style: { color: 'white' } }}
                inputlabelprops={{ style: { color: 'white' } }}
              />

              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!sintoma.name || !sintoma.sym_id || !sintoma.hpo_id}
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

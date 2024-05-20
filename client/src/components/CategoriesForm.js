
import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export default function CategoriesForm() {

    const [categoria, SetCategoria] = useState({
        'cat_id': '',
        'name': '',
        'type': ''
    });

    //const [ultimacategoria, SetUltimaCategoria] = useState({
   //     'max': ''
   //});
    

    const [cargando, SetCargando] = useState(false);
    const [editando, SetEditando] = useState(false);
    const [tiposdecategoria, SetTiposDeCategoria] = useState([]);
    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('submit')
        //console.log(categoria)

        SetCargando(true)

        if (editando) {


            console.log('Editado')

            //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA ACTUALIZAR UNA categoria
            const res = await fetch(`http://localhost:4000/categories/${params.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(categoria),
                    headers: { "Content-Type": "application/json" }
                }
            )
            const data = await res.json()
            console.log(data)

        } else {

            //HAGO EL POST Y RECIBO LA RESPUESTA EN RES PARA CREAR UNA categoria
            const res = await fetch('http://localhost:4000/categories/', {
                method: 'POST',
                body: JSON.stringify(categoria),
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
        SetCategoria({ ...categoria, [e.target.name]: e.target.value })
    }

    //// AGREGO CODIGO PARA CUANDO VENGO A EDITAR USANDO EL MISMO FORM DE CREAR

    const cargarCategoria = async (id) => {
        const res = await fetch(`http://localhost:4000/categories/${id}`)
        const data = await res.json()
        console.log(data)

        SetCategoria({ cat_id: data.cat_id, name: data.name, type: data.type })
        TextField.type = data.type
        SetEditando(true)
    }

    const buscarTiposDeCategoria = async () => {
        try {
            const res = await fetch(`http://localhost:4000/types/categories/`)
            const data = await res.json()
            console.log(data)
            SetTiposDeCategoria(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const cargarUltimaCategoria = async () => {
        try {
            const res = await fetch(`http://localhost:4000/last/categories/`)
            const data = await res.json()

            console.log(data.max)
            let dato = data.max.split("_")
            console.log(dato[1])
            let numeroultimo = parseInt(dato[1]) + 1
            console.log(numeroultimo)
            numeroultimo = zeroPad(numeroultimo, 6)
            numeroultimo = 'CAT_' + numeroultimo
            TextField.cat_id = numeroultimo
            TextField.type = 'diagnostic'

            //SetUltimaCategoria(data)

            SetCategoria({ cat_id: numeroultimo, type: 'diagnostic' })
   

        } catch (error) {

            console.log(error)

        }

    }


    useEffect(() => {
        buscarTiposDeCategoria();
        //si viene con algun id..
        if (params.id) {
            // console.log('viene con un dato')
            cargarCategoria(params.id)
        }
        //voy a crear uno nuevo cargo la ultima para poder crear una nueva
        else {
            cargarUltimaCategoria();
          
        }
     }, [params.id])




    return (

        <Grid xs={12} container direction={'column'} alignContent={'center'} justifyContent={'center'} >
            <Grid item xs={8}>
                <Card
                    xs={8}
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: '#bdbdbd',
                        padding: '1 rem'
                    }}
                >
                    <Typography variant='5' textAlign='center' color='black'>
                        {editando ? "Editar Categoria" : "Crear Nueva Categoria"}

                    </Typography>
                    <CardContent >
                        <form onSubmit={handleSubmit}  >
                            <TextField
                                variant='filled'
                                label='Nombre de la categoria'
                                name='name'
                                value={categoria.name}
                                onChange={handleOnChange}
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant='filled'
                                label='Codigo Categoria'
                                name='cat_id'
                                // {  params.id ?  'value = {categoria.cat_id}'  :  'value = {ultimacategoria.max}' }
                                //   value={ ultimacategoria.max  }
                                value={categoria.cat_id}
                                // value={ (params.id) ? {categoria.cat_id} : {ultimacategoria.max}  }
                                onChange={handleOnChange}
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            />


                            <FormControl fullWidth>
                                <InputLabel id="Tipo">Tipo</InputLabel>
                                <Select
                                    //labelId="demo-simple-select-label"
                                    //id="demo-simple-select"
                                    value={categoria.type}
                                    label=""
                                    name='type'
                                    onChange={handleOnChange}
                                    inputprops={{ style: { color: 'white' } }}
                                    inputlabelprops={{ style: { color: 'white' } }}
                                >

                                    {
                                        tiposdecategoria.map(tipo => (
                                            <MenuItem
                                                inputprops={{ style: { color: 'white' } }}
                                                inputlabelprops={{ style: { color: 'white' } }}
                                                key={tipo.type}
                                                value={tipo.type}>{tipo.type}</MenuItem>

                                        )
                                        )

                                    }
                                </Select>
                            </FormControl>


                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                disabled={!categoria.cat_id || !categoria.name || !categoria.type}
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

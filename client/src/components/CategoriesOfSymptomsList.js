import { useEffect, useState } from "react"
import { Button, Card, CardContent, Typography, Grid, TextField } from '@mui/material'
import { useParams } from 'react-router-dom';

export default function CategoriesOfSymptomsList() {

    //  const navigate = useNavigate();
    const params = useParams()

    const [categorias, SetCategorias] = useState([])

    const [busquedadecategorias, SetBusquedaDeCategorias] = useState([])

    const [palabraparabuscar, SetPalabraParaBuscar] = useState({
        'palabra': ''
    });

    const handleOnChange = e => {
        //  console.log(e.target.name, e.target.value)
        SetPalabraParaBuscar({ ...palabraparabuscar, [e.target.name]: e.target.value })
    }

    //PIDO LOS DATOS AL BACKEND
    const loadTheCategoriesOfSymptoms = async () => {

        try {

            const response = await fetch(`http://localhost:4000/cat_sym/${params.id}`)
            const data = await response.json()
            console.log(data)
            SetCategorias(data)

        } catch (error) {

            console.log(error)

        }

    }


    //PIDO LOS DATOS AL BACKEND
    const loadCategories = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:4000/search/categories/${palabraparabuscar.palabra}`)
            const data = await response.json()
            console.log(data)

            ///(data.rows.length != 0) then 

            SetBusquedaDeCategorias(data)

        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }

    }




    //recibe parametro para BORRAR la id seleccionada en el backend
    const handleDelete = async (cat_id, sym_id) => {
        //e.preventDefault();

        SetCategorias(categorias.filter(categoria => categoria.cat_id !== cat_id))

        try {
            //borra la id seleccionada en el back end
            const resp = await fetch(`http://localhost:4000/remove/cat_sym/${cat_id}/${sym_id}`, {
                method: 'DELETE'
            })

            //borra la id seleccionada en el frontend
            //SetBusquedaDeCategorias(busquedadecategorias.filter(categoria => categoria.sym_id !== sym_id))

            // console.log(sym_id);
            // SetCategorias(categorias.filter(categoria => categoria.sym_id !== sym_id))

            //FALTA AGREGAR AL VECTOR DE ARRIBA!!!!!!!!!!!
            //loadTheCategoriesOfSymptoms();
            //devuelve status = 2o4 si sale bien no un json
            //const data = await resp.json();
            //console.log(data);
            console.log(resp);

        } catch (error) {

            console.log(error)

        }

    }


    //recibe parametro para BORRAR la id seleccionada en el backend
    const handleAdd = async (cat_id, sym_id, name, type) => {

        try {
            //AGREGA la id seleccionada en el back end
            const resp = await fetch(`http://localhost:4000/add/cat_sym/${cat_id}/${sym_id}`, {
                method: 'POST',
            })
            //console.log(pat_id);
            //console.log(params.id);
            // console.log(sym_id);
            //borra la id seleccionada en el frontend
            // busquedadecategorias(busquedadecategorias.filter(categoria => categoria.sym_id !== sym_id))

            // Agrega en el front end


            //devuelve status = 2o4 si sale bien no un json
            const data = await resp.json();
            console.log(data);
            //agrego los datos que se pierden en la consulta!
            data.name= name;
            data.type= type;
            SetCategorias(categorias => [...categorias, data])
            //console.log(resp);

        } catch (error) {

            console.log(error)

        }

    }


    useEffect(() => {
        loadTheCategoriesOfSymptoms()
    }, [])


    return (
        <>
            <h2>Listado de Categorías para el Síntoma: {params.id}</h2>
            {

                (categorias.length !== 0) ?

                    categorias.map(categoria => (
                        <Card
                            style={
                                {
                                    marginBottom: '.7rem',
                                    backgroundColor: '#1e272e'
                                }
                            }
                            key={categoria.cat_id}
                        >
                            <CardContent style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ color: 'white' }}>
                                    <Typography variant='h6'>{categoria.name}</Typography>
                                    <Typography>{'Cat Id: ' + categoria.cat_id}</Typography>
                                    <Typography>{'Tipo: ' + categoria.type}</Typography>

                                </div>
                                <div>

                                    <Button
                                        variant="contained"
                                        color="warning"
                                        // onClick={() => console.log('Borrando')}
                                        onClick={() => handleDelete(categoria.cat_id, categoria.sym_id)}
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
                        <Grid item xs >

                        </Grid>

                        <Grid item xs={7} >
                            <h4>No hay cargado ninguna categoria para este sintoma.</h4>
                        </Grid>

                        <Grid item xs >

                        </Grid>
                    </Grid>

            }



            <h3>Agregar nueva categoria: (Introduzca la palabra o parte de la palabra a buscar)</h3>
            <form onSubmit={loadCategories}>

                <Card
                    sx={{ mt: 5 }}
                    style={
                        {
                            marginBottom: '.7rem',
                            backgroundColor: '#bdbdbd'
                        }
                    }
                >
                    <CardContent style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>


                        <TextField
                            variant='filled'
                            label='Ingrese una palabra para la búsqueda'
                            name='palabra'
                            //value={'anemia'}
                            fullWidth
                            onChange={handleOnChange}
                            sx={{ display: 'block', margin: '.5rem 0' }}
                            inputprops={{ style: { color: 'white', textAlign: 'right' } }}
                            inputlabelprops={{ style: { color: 'white', textAlign: 'right' } }}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!palabraparabuscar.palabra}
                            style={{
                                marginLeft: '.5rem'
                            }}
                        >
                            Buscar
                        </Button>
                    </CardContent>
                </Card >

            </form>

            <Grid container spacing={3}>
                <Grid item xs={1} >

                </Grid>

                <Grid item xs={10} >
                    <h3>  Listado de Categorias encontradas en el sistema para su busqueda.</h3>
                </Grid>

                <Grid item xs={1} >

                </Grid>
            </Grid>

            {
                // console.log(categorias.length);

                (busquedadecategorias.length !== 0) ?

                    busquedadecategorias.map(categoria => (
                        <Card
                            style={
                                {
                                    marginBottom: '.7rem',
                                    backgroundColor: '#bdbdbd'
                                }
                            }
                            key={categoria.name + categoria.sym_id}
                        >
                            <CardContent style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ color: 'white', maxWidth: '640' }}>
                                    <Typography variant='h6'>{categoria.name}</Typography>
                                    <Typography>{'Cat Id: ' + categoria.cat_id}</Typography>
                                    <Typography>{'Tipo: ' + categoria.type}</Typography>

                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        //onClick={() => console.log('Editando')}
                                        //  onClick={() => navigate(`/add/pat_sym/${params.pat_id,categoria.sym_id}`)}
                                        //onClick={() => console.log(params.id)}
                                        onClick={() => handleAdd(categoria.cat_id, params.id, categoria.name, categoria.type)}

                                    >
                                        Agregar a sintoma
                                    </Button>

                                </div>
                            </CardContent>
                        </Card >
                    )

                    )

                    :
                    <Grid container spacing={3}>
                        <Grid item xs >

                        </Grid>

                        <Grid item xs={7} >
                            <h4>No hay resultados para la búsqueda.</h4>
                        </Grid>

                        <Grid item xs >

                        </Grid>
                    </Grid>




            }


        </>
    )
}

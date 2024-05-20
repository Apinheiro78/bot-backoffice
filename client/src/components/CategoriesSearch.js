import { useState } from "react";
import { Card, Typography, CardContent, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoriesSearch() {

    const [categorias, SetCategorias] = useState([])

    const navigate = useNavigate()

    const [palabraparabuscar, SetPalabraParaBuscar] = useState({
        'palabra': ''
    });


    const handleOnChange = e => {
        //  console.log(e.target.name, e.target.value)
        SetPalabraParaBuscar({ ...palabraparabuscar, [e.target.name]: e.target.value })
    }

    //PIDO LOS DATOS AL BACKEND
    const loadCategories = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:4000/search/categories/${palabraparabuscar.palabra}`)
            const data = await response.json()
            console.log(data)

            ///(data.rows.length != 0) then 

            SetCategorias(data)

        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }

    }


    //recibe parametro para BORRAR la id seleccionada en el backend
    const handleDelete = async (id) => {

        //borra la id seleccionada en el frontend
        SetCategorias(categorias.filter(categoria => categoria.cat_id !== id))

        try {
            //borra la id seleccionada en el back end
            const resp = await fetch(`http://localhost:4000/categories/${id}`,
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

    return (

        <div>

            <h3>Buscador de Categorias.</h3>
            <h3>Introduzca la palabra o parte de la palabra a buscar:</h3>
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
                    <h3>  Listado de Categorias encontradas en el sistema</h3>
                </Grid>

                <Grid item xs={1} >

                </Grid>
            </Grid>

            {
                // console.log(categorias.length);

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
                                <div style={{ color: 'white', maxWidth: '640' }}>
                                    <Typography variant='h6' >{categoria.name}</Typography>

                                    <Typography>{'Cat ID: ' + categoria.cat_id}</Typography>
                                    <Typography>{'Type: ' + categoria.type}</Typography>

                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        //onClick={() => console.log('Editando')}
                                        onClick={() => navigate(`/categories/${categoria.cat_id}/edit`)}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        //onClick={() => console.log('Editando')}
                                        onClick={() => navigate(`/categories_category/${categoria.cat_id}`)}
                                        style={{
                                            marginLeft: '.5rem'
                                        }}
                                    >
                                        Categorías (hijas) asociadas
                                    </Button>


                                    <Button
                                        variant="contained"
                                        color="warning"
                                        //onClick={() => console.log('Borrando')}
                                        onClick={() => handleDelete(categoria.cat_id)}
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


        </div>

    )
}
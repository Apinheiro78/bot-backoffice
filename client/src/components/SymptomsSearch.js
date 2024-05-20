import { useState } from "react";
import { Card, Typography, CardContent, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SymptomsSearch() {

    const [sintomas, SetSintomas] = useState([])

    const navigate = useNavigate()

    const [palabraparabuscar, SetPalabraParaBuscar] = useState({
        'palabra': ''
    });

    const [codigohpoparabuscar, SetCodigoHpoParaBuscar] = useState({
        'hpo_id': ''
    });

    const handleOnChange = e => {
        //  console.log(e.target.name, e.target.value)
        SetPalabraParaBuscar({ ...palabraparabuscar, [e.target.name]: e.target.value })
    }

    const handleOnChange2 = e => {
        //  console.log(e.target.name, e.target.value)
        SetCodigoHpoParaBuscar({ ...codigohpoparabuscar, [e.target.name]: e.target.value })
    }


    //PIDO LOS DATOS AL BACKEND
    const loadSymptoms = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:4000/search/symptoms/${palabraparabuscar.palabra}`)
            const data = await response.json()
            console.log(data)

            ///(data.rows.length != 0) then 

            SetSintomas(data)

        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }

    }


    //PIDO LOS DATOS AL BACKEND
    const loadSymptomsByHpo = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:4000/searchbyhpo/symptoms/${codigohpoparabuscar.hpo_id}`)
            const data = await response.json()
            console.log(data)

            ///(data.rows.length != 0) then 

            SetSintomas(data)

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
    return (

        <div>

            <h3>Buscador de sintomas.</h3>
            <h3>Introduzca la palabra o parte de la palabra a buscar:</h3>
            <form onSubmit={loadSymptoms}>

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


            <h3>Introduzca el codigo HPO:</h3>
            <form onSubmit={loadSymptomsByHpo}>

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
                            label='Ingrese codigo HPO'
                            name='hpo_id'
                            //value={'anemia'}
                            fullWidth
                            onChange={handleOnChange2}
                            sx={{ display: 'block', margin: '.5rem 0' }}
                            inputprops={{ style: { color: 'white', textAlign: 'right' } }}
                            inputlabelprops={{ style: { color: 'white', textAlign: 'right' } }}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!codigohpoparabuscar.hpo_id}
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
                <Grid item xs >

                </Grid>

                <Grid item xs={7} >
                    <h3>  Listado de Sintomas encontrados en el sistema</h3>
                </Grid>

                <Grid item xs >

                </Grid>
            </Grid>

            {
                // console.log(sintomas.length);

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
                                <div style={{ color: 'white', maxWidth: '640' }}>
                                    <Typography variant='h6'>{sintoma.name}</Typography>
                                    <Typography>{'sym_id: ' + sintoma.sym_id}</Typography>
                                    <Typography>{'hpo_id: ' + sintoma.hpo_id}</Typography>

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
                                        // onClick={() => console.log('Borrando')}
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
                        <Grid item xs >

                        </Grid>

                        <Grid item xs={7} >
                            <h4>No hay resultados para la búsqueda.</h4>
                        </Grid>

                        <Grid item xs >

                        </Grid>
                    </Grid>




            }


        </div>

    )
}
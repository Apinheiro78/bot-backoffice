import { useEffect, useState } from "react"
import { Button, Card, CardContent, Typography, Grid, TextField } from '@mui/material'
import { useParams } from 'react-router-dom';

export default function PathologiesSymptomsList() {

  //  const navigate = useNavigate();
    const params = useParams()

    const [sintomas, SetSintomas] = useState([])
    
    const [busquedadesintomas, SetBusquedaDeSintomas] = useState([])

    const [palabraparabuscar, SetPalabraParaBuscar] = useState({
        'palabra': ''
    });

    const handleOnChange = e => {
        //  console.log(e.target.name, e.target.value)
        SetPalabraParaBuscar({ ...palabraparabuscar, [e.target.name]: e.target.value })
    }

    //PIDO LOS DATOS AL BACKEND
    const loadTheSymptoms = async () => {

        try {

            const response = await fetch(`http://localhost:4000/pat_sym/${params.id}`)
            const data = await response.json()
            console.log(data)
            SetSintomas(data)

        } catch (error) {

            console.log(error)

        }

    }


    //PIDO LOS DATOS AL BACKEND
    const loadSymptoms = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:4000/search/symptoms/${palabraparabuscar.palabra}`)
            const data = await response.json()
            console.log(data)

            ///(data.rows.length != 0) then 

            SetBusquedaDeSintomas(data)

        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }

    }




    //recibe parametro para BORRAR la id seleccionada en el backend
    const handleDelete = async (pat_id, sym_id) => {
        //e.preventDefault();

        SetSintomas(sintomas.filter(sintoma => sintoma.sym_id !== sym_id))

        try {
            //borra la id seleccionada en el back end
            const resp = await fetch(`http://localhost:4000/remove/pat_sym/${pat_id}/${sym_id}`, {
                method: 'DELETE'
            })

            //borra la id seleccionada en el frontend
            //SetBusquedaDeSintomas(busquedadesintomas.filter(sintoma => sintoma.sym_id !== sym_id))

            // console.log(sym_id);
            // SetSintomas(sintomas.filter(sintoma => sintoma.sym_id !== sym_id))
            
            //FALTA AGREGAR AL VECTOR DE ARRIBA!!!!!!!!!!!
            //loadTheSymptoms();
            //devuelve status = 2o4 si sale bien no un json
            //const data = await resp.json();
            //console.log(data);
            console.log(resp);

        } catch (error) {

            console.log(error)

        }

    }


    //recibe parametro para BORRAR la id seleccionada en el backend
    const handleAdd = async (pat_id, sym_id) => {

        try {
            //AGREGA la id seleccionada en el back end
            const resp = await fetch(`http://localhost:4000/add/pat_sym/${pat_id}/${sym_id}`, {
                method: 'POST',
            })
            //console.log(pat_id);
            //console.log(params.id);
            // console.log(sym_id);
            //borra la id seleccionada en el frontend
            // busquedadesintomas(busquedadesintomas.filter(sintoma => sintoma.sym_id !== sym_id))

            // Agrega en el front end


            //devuelve status = 2o4 si sale bien no un json
            const data = await resp.json();
            console.log(data);
            SetSintomas(sintomas => [...sintomas, data])
            //console.log(resp);

        } catch (error) {

            console.log(error)

        }

    }


    useEffect(() => {
        loadTheSymptoms()
    }, [])


    return (
        <>
            <h2>Listado de Síntomas de la patología: {params.id}</h2>
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
                                    <Typography>{'Sym Id: ' + sintoma.sym_id}</Typography>
                                    <Typography>{'Hpo Id: ' + sintoma.hpo_id}</Typography>

                                </div>
                                <div>

                                    <Button
                                        variant="contained"
                                        color="warning"
                                        // onClick={() => console.log('Borrando')}
                                        onClick={() => handleDelete(sintoma.pat_id, sintoma.sym_id)}
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
                            <h4>No hay cargado ningun sintomara para esta patologia.</h4>
                        </Grid>

                        <Grid item xs >

                        </Grid>
                    </Grid>

            }



            <h3>Agregar nuevo sintoma: (Introduzca la palabra o parte de la palabra a buscar)</h3>
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

            <Grid container spacing={3}>
                <Grid item xs={1} >

                </Grid>

                <Grid item xs={10} >
                    <h3>  Listado de Sintomas encontrados en el sistema para su busqueda.</h3>
                </Grid>

                <Grid item xs={1} >

                </Grid>
            </Grid>

            {
                // console.log(sintomas.length);

                (busquedadesintomas.length !== 0) ?

                    busquedadesintomas.map(sintoma => (
                        <Card
                            style={
                                {
                                    marginBottom: '.7rem',
                                    backgroundColor: '#bdbdbd'
                                }
                            }
                            key={sintoma.name + sintoma.sym_id}
                        >
                            <CardContent style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ color: 'white', maxWidth: '640' }}>
                                    <Typography variant='h6'>{sintoma.name}</Typography>
                                    <Typography>{'Codigo: ' + sintoma.sym_id}</Typography>

                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        //onClick={() => console.log('Editando')}
                                        //  onClick={() => navigate(`/add/pat_sym/${params.pat_id,sintoma.sym_id}`)}
                                        //onClick={() => console.log(params.id)}
                                        onClick={() => handleAdd(params.id, sintoma.sym_id)}

                                    >
                                        Agregar a patologia
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

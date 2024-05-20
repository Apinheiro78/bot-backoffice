import { useEffect, useState } from "react"
import { Button, Card, CardContent, Typography, Grid  } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function CategoriesList() {

  const [categorias, SetCategorias] = useState([])
  const [categoriascount, SetCategoriasCount] = useState({
    'count': '0'
});
  const navigate = useNavigate();

  //PIDO LOS DATOS AL BACKEND
  const loadCategories = async () => {

    try {
      const response = await fetch('http://localhost:4000/categories')
      const data = await response.json()
      console.log(data)
      SetCategorias(data)
    } catch (error) {

      console.log(error)

    }

  }

    //PIDO LOS DATOS AL BACKEND
    const loadCategoriesCount = async () => {

      try {
        const response = await fetch('http://localhost:4000/count/categories')
        const data = await response.json()
        console.log(data)
        SetCategoriasCount(data)
      } catch (error) {
  
        console.log(error)
  
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


  useEffect(() => {
    loadCategoriesCount()
    loadCategories()
  }, [])


  return (
    <>
      <h2>Listado de Categorías del sistema</h2>

      <h3>Mostrando 20 registros de {  (categoriascount.count !== '0') ? categoriascount[0].count : '0'} </h3>


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


                  <Typography>{'Cat ID: ' + categoria.cat_id}</Typography>
                  <Typography>{'Tipo: ' + categoria.type}</Typography>

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
            <Grid item xs={1}>

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

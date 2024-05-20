
import { Grid, Card, Typography, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SimulationCases() {

    const [patologias, SetPatologias] = useState([])

    const [patologiascount, SetPatologiasCount] = useState({
        'count': '0'
    });

    // const navigate = useNavigate()

    const [categorias, SetCategorias] = useState([]);

    const [subcategorias01, SetSubCategorias01] = useState([]);
    const [subcategorias02, SetSubCategorias02] = useState([]);
    const [subcategorias03, SetSubCategorias03] = useState([]);

    const [subsubcategorias01, SetSubSubCategorias01] = useState([]);

    const [subsubsubcategorias01, SetSubSubSubCategorias01] = useState([]);

    const [sintomas01, SetSintomas01] = useState([]);
    const [sintomas02, SetSintomas02] = useState([]);
    const [sintomas03, SetSintomas03] = useState([]);

    const [datosparabuscar, SetDatosParaBuscar] = useState({
        'categoria_01': '',
        'subcategoria_01': '',
        'subsubcategoria_01': '',
        'subsubsubcategoria_01': '',
        'sintoma_01': '',
        'categoria_02': '',
        'subcategoria_02': '',
        'sintoma_02': '',
        'categoria_03': '',
        'subcategoria_03': '',
        'sintoma_03': ''
    })

    const [sintomas01count, SetSintomas01Count] = useState({
        'count': '0'
    });

    const [sintomas02count, SetSintomas02Count] = useState({
        'count': '0'
    });
    const [sintomas03count, SetSintomas03Count] = useState({
        'count': '0'
    });




    const handleOnChangecat01 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, subcategoria_01: '', subsubcategoria_01: '', subsubsubcategoria_01: '', sintoma_01: '' })
        buscarSubCategorias01(e.target.value)
        SetSubSubCategorias01([])
        SetSubSubSubCategorias01([])
        // buscarSubSubCategorias01(e.target.value)
        buscarSintomas01(e.target.value)
    }

    const handleOnChangecat02 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, subcategoria_02: '', sintoma_02: '' })
        buscarSubCategorias02(e.target.value)
        buscarSintomas02(e.target.value)
    }


    const handleOnChangecat03 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, subcategoria_03: '', sintoma_03: '' })
        buscarSubCategorias03(e.target.value)
        buscarSintomas03(e.target.value)
    }


    const handleOnChangesubcat01 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, subsubcategoria_01: '', subsubsubcategoria_01: '', sintoma_01: '' })
        buscarSubSubCategorias01(e.target.value)
        SetSubSubSubCategorias01([])
        buscarSintomas01(e.target.value)
    }

    const handleOnChangesubcat02 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, sintoma_02: '' })
        buscarSintomas02(e.target.value)
    }

    const handleOnChangesubcat03 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, sintoma_03: '' })
        buscarSintomas03(e.target.value)
    }

    ///////////////////// solo para filtro 1 

    const handleOnChangesubsubcat01 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, subsubsubcategoria_01: '', sintoma_01: '' })
        buscarSubSubSubCategorias01(e.target.value)
        buscarSintomas01(e.target.value)
    }

    const handleOnChangesubsubsubcat01 = e => {
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value, sintoma_01: '' })
        buscarSintomas01(e.target.value)
    }

    const handleOnChange = e => {

        // console.log(e.target.name, e.target.value)
        SetDatosParaBuscar({ ...datosparabuscar, [e.target.name]: e.target.value })
        //   console.log(datosparabuscar)

    }



    //PIDO LOS DATOS AL BACKEND
    const loadPathologies = async (e) => {
        e.preventDefault();

        try {

            //FILTRO con 3 SOLO DATO

            if (datosparabuscar.sintoma_03 !== '') {
                const response = await fetch(`http://localhost:4000/searchbythreesymptoms/pathologies/${datosparabuscar.sintoma_01}/${datosparabuscar.sintoma_02}/${datosparabuscar.sintoma_03}`)
                const data = await response.json()
                // console.log(data)
                console.log('Pase por filtro 3 sintomas')
                SetPatologias(data)
                ///(data.rows.length != 0) then 
            }

            //FILTRO con 2 DATO
            if (datosparabuscar.sintoma_02 !== '' && datosparabuscar.sintoma_03 === '') {
                const response = await fetch(`http://localhost:4000/searchbytwosymptoms/pathologies/${datosparabuscar.sintoma_01}/${datosparabuscar.sintoma_02}`)
                const data = await response.json()
                //   console.log(data)
                console.log('Pase por filtro 2 sintomas')
                SetPatologias(data)
                ///(data.rows.length != 0) then 
            }

            //FILTRO con 1 DATOS
            if (datosparabuscar.sintoma_01 !== '' && datosparabuscar.sintoma_02 === '' && datosparabuscar.sintoma_03 === '') {
                const response = await fetch(`http://localhost:4000/searchbyonesymptom/pathologies/${datosparabuscar.sintoma_01}`)
                //    const response = await fetch(`http://localhost:4000/searchbycategory/pathologies/${datosparabuscar.categoria_01}`)

                const data = await response.json()
                //  console.log(data)
                console.log('Pase por filtro 1 sintoma')
                SetPatologias(data)
                ///(data.rows.length != 0) then 
            }



        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }

        loadPathologiesCount()
    }



    //PIDO LOS DATOS AL BACKEND
    const loadPathologiesCount = async (e) => {
        //    e.preventDefault();

        try {

            //FILTRO con 3 SOLO DATO

            if (datosparabuscar.sintoma_03 !== '') {
                const response = await fetch(`http://localhost:4000/count/searchbythreesymptoms/pathologies/${datosparabuscar.sintoma_01}/${datosparabuscar.sintoma_02}/${datosparabuscar.sintoma_03}`)
                const data = await response.json()
                // console.log(data)
                console.log('Pase por filtro 3 sintomas')
                SetPatologiasCount(data)
                ///(data.rows.length != 0) then 
            }

            //FILTRO con 2 DATO
            if (datosparabuscar.sintoma_02 !== '' && datosparabuscar.sintoma_03 === '') {
                const response = await fetch(`http://localhost:4000/count/searchbytwosymptoms/pathologies/${datosparabuscar.sintoma_01}/${datosparabuscar.sintoma_02}`)
                const data = await response.json()
                //   console.log(data)
                console.log('Pase por filtro 2 sintomas')
                SetPatologiasCount(data)
                ///(data.rows.length != 0) then 
            }

            //FILTRO con 1 DATOS
            if (datosparabuscar.sintoma_01 !== '' && datosparabuscar.sintoma_02 === '' && datosparabuscar.sintoma_03 === '') {
                const response = await fetch(`http://localhost:4000/count/searchbyonesymptom/pathologies/${datosparabuscar.sintoma_01}`)
                //    const response = await fetch(`http://localhost:4000/searchbycategory/pathologies/${datosparabuscar.categoria_01}`)

                const data = await response.json()
                //  console.log(data)
                console.log('Pase por filtro 1 sintoma')
                SetPatologiasCount(data)
                ///(data.rows.length != 0) then 
            }



        }
        catch (error) {
            //res.json({ error: error.message });s
            console.log(error.message);
            //next(error);
        }
    }




    const buscarCategorias = async () => {

        //ACA MODIFICAR TRAIGA SUBCATEGORIAS
        try {
            const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)

            SetCategorias(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSubCategorias01 = async (id) => {

        //   SetDatosParaBuscar({ ...datosparabuscar, 'sintoma_01': '' })
        // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_01': '', 'sintoma_01': '' })

        try {
            const res = await fetch(`http://localhost:4000/subcategories/cat_cat/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)
            //SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_01': '' })
            //borrarfiltro01()
            SetSubCategorias01(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSubCategorias02 = async (id) => {
        // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_02': '', 'sintoma_02': '' })
        try {
            const res = await fetch(`http://localhost:4000/subcategories/cat_cat/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)
            // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_02': '', 'sintoma_02': '' })
            //  datosparabuscar.subcategoria_01 = ''
            // borrarfiltro01()
            SetSubCategorias02(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSubCategorias03 = async (id) => {
        // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_03': '', 'sintoma_03': '' })
        try {
            const res = await fetch(`http://localhost:4000/subcategories/cat_cat/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)

            SetSubCategorias03(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSubSubCategorias01 = async (id) => {
        // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_03': '', 'sintoma_03': '' })
        try {
            const res = await fetch(`http://localhost:4000/subcategories/cat_cat/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)

            SetSubSubCategorias01(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSubSubSubCategorias01 = async (id) => {
        // SetDatosParaBuscar({ ...datosparabuscar, 'subcategoria_03': '', 'sintoma_03': '' })
        try {
            const res = await fetch(`http://localhost:4000/subcategories/cat_cat/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)

            SetSubSubSubCategorias01(data)
        } catch (error) {

            console.log(error)

        }

        //  console.log(tiposdecategoria)
    }

    const buscarSintomas01 = async (id) => {

        try {
            const res = await fetch(`http://localhost:4000/searchbycategory/symptoms/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)
            // borrarsintoma01()
            SetSintomas01(data)
            // SetDatosParaBuscar({ ...datosparabuscar, sintoma_01: ' ' })
        } catch (error) {

            console.log(error)

        }
        loadSintomas01Count(id)
        //  console.log(tiposdecategoria)
    }

    //PIDO LOS DATOS AL BACKEND
    const loadSintomas01Count = async (id) => {

        try {
            const res = await fetch(`http://localhost:4000/count/searchbycategory/symptoms/${id}`)
            const data = await res.json()
            console.log(data)
            SetSintomas01Count(data)
        } catch (error) {

            //console.log(error)
            console.log(error.message)
        }

    }

    const buscarSintomas02 = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/searchbycategory/symptoms/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)
            SetSintomas02(data)
        } catch (error) {

            console.log(error)

        }
        loadSintomas02Count(id)
        //  console.log(tiposdecategoria)
    }

    //PIDO LOS DATOS AL BACKEND
    const loadSintomas02Count = async (id) => {

        try {
            const res = await fetch(`http://localhost:4000/count/searchbycategory/symptoms/${id}`)
            const data = await res.json()
            console.log(data)
            SetSintomas02Count(data)
        } catch (error) {

            //console.log(error)
            console.log(error.message)
        }

    }

    const buscarSintomas03 = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/searchbycategory/symptoms/${id}`)
            // const res = await fetch(`http://localhost:4000/categories`)
            const data = await res.json()
            console.log(data)
            SetSintomas03(data)
        } catch (error) {

            console.log(error)

        }
        loadSintomas03Count(id)
        //  console.log(tiposdecategoria)
    }

    //PIDO LOS DATOS AL BACKEND
    const loadSintomas03Count = async (id) => {

        try {
            const res = await fetch(`http://localhost:4000/count/searchbycategory/symptoms/${id}`)
            const data = await res.json()
            console.log(data)
            SetSintomas03Count(data)
        } catch (error) {

            //console.log(error)
            console.log(error.message)
        }

    }

    useEffect(() => {
        buscarCategorias();

        //buscarSubCategorias(subcategorias.subcategoria_01);
        //si viene con algun id..
    }, [])




    return (

        <div>

            <h3>Buscador de patologías.</h3>
            <h3>Selección de Categorías / Subcategoría / Síntoma:</h3>
            <form onSubmit={loadPathologies}>

                <Card
                    sx={{ mt: 5 }}
                    style={
                        {
                            marginBottom: '.7rem',
                            backgroundColor: '#bdbdbd',// '#bdbdbd'
                        }
                    }
                >
                    <CardContent style={{
                        display: 'block',
                        justifyContent: 'space-between',
                    }}>


                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="Tipo">Seleccione categoria/sistema 01</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione categoria/sistema 01'
                                name='categoria_01'
                                value={datosparabuscar.categoria_01}
                                onChange={handleOnChangecat01}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    categorias.map(categoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={categoria.cat_id}
                                            value={categoria.cat_id}>{categoria.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>

                        </FormControl>

                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="subTipo">Seleccione subcategoria/subsistema 01</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione subcategoria/subSsistema 01'
                                name='subcategoria_01'
                                value={datosparabuscar.subcategoria_01}
                                onChange={handleOnChangesubcat01}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {


                                    subcategorias01.map(subcategoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={subcategoria.cat_id}
                                            value={subcategoria.cat_id}>{subcategoria.name}</MenuItem>

                                    )
                                    )

                                }



                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="subTipo">Seleccione subsubcategoria/subsubsistema 01</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione subsubcategoria/subSubsistema 01'
                                name='subsubcategoria_01'
                                value={datosparabuscar.subsubcategoria_01}
                                onChange={handleOnChangesubsubcat01}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {


                                    subsubcategorias01.map(subcategoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={subcategoria.cat_id}
                                            value={subcategoria.cat_id}>{subcategoria.name}</MenuItem>

                                    )
                                    )

                                }



                            </Select>
                        </FormControl>



                        <FormControl fullWidth>
                            <InputLabel id="subTipo">Seleccione subsubsubcategoria/subsubsubsistema 01</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione subsubsubcategoria/subSubsubsistema 01'
                                name='subsubsubcategoria_01'
                                value={datosparabuscar.subsubsubcategoria_01}
                                onChange={handleOnChangesubsubsubcat01}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {


                                    subsubsubcategorias01.map(subcategoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={subcategoria.cat_id}
                                            value={subcategoria.cat_id}>{subcategoria.name}</MenuItem>

                                    )
                                    )

                                }



                            </Select>
                        </FormControl>

                        <h4>Mostrando hasta 20 síntomas disponibles de {(sintomas01count.count !== '0') ? sintomas01count[0].count : '0'} </h4>

                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >

                            <InputLabel id="subTipo">Seleccione sintoma 01</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione sintoma 01'
                                name='sintoma_01'
                                value={datosparabuscar.sintoma_01}
                                onChange={handleOnChange}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >


                                {
                                    sintomas01.map(sintoma => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={sintoma.sym_id}
                                            value={sintoma.sym_id}>{sintoma.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!datosparabuscar.sintoma_01}
                            style={{
                                marginLeft: '.5rem'
                            }}
                        >
                            Filtrar con 1 síntoma
                        </Button>
                    </CardContent>
                </Card >


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
                        display: 'block',
                        justifyContent: 'space-between'
                    }}>


                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="Tipo">Seleccione categoria/sistema 02</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione categoria/sistema 02'
                                name='categoria_02'
                                value={datosparabuscar.categoria_02}
                                onChange={handleOnChangecat02}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    categorias.map(categoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={categoria.cat_id + '02'}
                                            value={categoria.cat_id}>{categoria.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>


                        <FormControl fullWidth>
                            <InputLabel id="subTipo">Seleccione subcategoria/subsistema 02</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione subcategoria/subSsistema 02'
                                name='subcategoria_02'
                                value={datosparabuscar.subcategoria_02}
                                onChange={handleOnChangesubcat02}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    subcategorias02.map(subcategoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={subcategoria.cat_id + '02'}
                                            value={subcategoria.cat_id}>{subcategoria.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>

                        <h4>Mostrando hasta 20 síntomas disponibles de {(sintomas02count.count !== '0') ? sintomas02count[0].count : '0'} </h4>

                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="subTipo">Seleccione sintoma 02</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione sintoma 02'
                                name='sintoma_02'
                                value={datosparabuscar.sintoma_02}
                                onChange={handleOnChange}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    sintomas02.map(sintoma => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={sintoma.sym_id}
                                            value={sintoma.sym_id}>{sintoma.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!datosparabuscar.sintoma_02}
                            style={{
                                marginLeft: '.5rem'
                            }}
                        >
                            Filtrar con 2 síntomas
                        </Button>
                    </CardContent>
                </Card >



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
                        display: 'block',
                        justifyContent: 'space-between'
                    }}>


                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="Tipo">Seleccione categoria/sistema 03</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione categoria/sistema 03'
                                name='categoria_03'
                                value={datosparabuscar.categoria_03}
                                onChange={handleOnChangecat03}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    categorias.map(categoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={categoria.cat_id + '03'}
                                            value={categoria.cat_id}>{categoria.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>


                        </FormControl>



                        <FormControl fullWidth>
                            <InputLabel id="subTipo">Seleccione subcategoria/subsistema 03</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione subcategoria/subSsistema 03'
                                name='subcategoria_03'
                                value={datosparabuscar.subcategoria_03}
                                onChange={handleOnChangesubcat03}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    subcategorias03.map(subcategoria => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={subcategoria.cat_id + '03'}
                                            value={subcategoria.cat_id}>{subcategoria.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>

                        <h4>Mostrando hasta 20 síntomas disponibles de {(sintomas03count.count !== '0') ? sintomas03count[0].count : '0'} </h4>

                        <FormControl
                            fullWidth
                            style={
                                {
                                    marginBottom: '.9rem',

                                }}
                        >
                            <InputLabel id="subTipo">Seleccione sintoma 03</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                //value={categoria.type}
                                label='Seleccione sintoma 03'
                                name='sintoma_03'
                                value={datosparabuscar.sintoma_03}
                                onChange={handleOnChange}
                                inputprops={{ style: { color: 'white' } }}
                                inputlabelprops={{ style: { color: 'white' } }}
                            >

                                {
                                    sintomas03.map(sintoma => (
                                        <MenuItem
                                            inputprops={{ style: { color: 'white' } }}
                                            inputlabelprops={{ style: { color: 'white' } }}
                                            key={sintoma.sym_id}
                                            value={sintoma.sym_id}>{sintoma.name}</MenuItem>

                                    )
                                    )

                                }
                            </Select>
                        </FormControl>

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!datosparabuscar.sintoma_03}
                            style={{
                                marginLeft: '.5rem'
                            }}
                        >
                            Filtrar con 3 síntomas
                        </Button>
                    </CardContent>
                </Card >

            </form>



            <Grid container spacing={3}>
                <Grid item xs={3} >

                </Grid>

                <Grid item xs={6} >
                    <h3>Listado de patologías encontradas según los filtros:</h3>

                    <h4>Mostrando hasta 20 patologías disponibles de {(patologiascount.count !== '0') ? patologiascount[0].count : '0'} </h4>

                </Grid>

                <Grid item xs={3} >

                </Grid>
            </Grid>

            {
                // console.log(patologias.length);

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
                                <div style={{ color: 'white', maxWidth: '640' }}>
                                    <Typography variant='h6'>{patologia.name}</Typography>
                                    <Typography>{'Pat ID: ' + patologia.pat_id}</Typography>
                                    <Typography>{'Orpha: ' + patologia.orpha_id}</Typography>
                                    <Typography>{'Omim: ' + patologia.omim_id}</Typography>
                                </div>

                            </CardContent>
                        </Card >
                    )

                    )

                    :
                    <Grid container spacing={3}>
                        <Grid item xs={3} >

                        </Grid>

                        <Grid item xs={6} >
                            <h4>No hay resultados para la búsqueda.</h4>
                        </Grid>

                        <Grid item xs={3} >

                        </Grid>
                    </Grid>




            }


        </div>

    )
}
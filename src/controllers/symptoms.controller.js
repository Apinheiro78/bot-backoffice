const { request } = require("express");
const pool = require('../db') //conexion a la base de datos

//COMANDO GET
const getAllSymptoms = async (req, res, next) => {

    try {
        const todosLosSintomas = await pool.query('select * from symptoms limit 20');

        //res.send('Listado de Patologias. Cantidad tomadas de la base: '+ todasLasPatologias.rowCount); 
        //console.log(todasLasPatologias.rows);
        return res.json(todosLosSintomas.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}

const getAllSymptomsCount = async (req, res, next) => {

    try {
        const todosLosSintomas = await pool.query('select COUNT(*) from symptoms');

        //res.send('Listado de Patologias. Cantidad tomadas de la base: '+ todasLasPatologias.rowCount); 
        //console.log(todasLasPatologias.rows);
        return res.json(todosLosSintomas.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}

//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getLastSymptom = async (req, res, next) => {
    // console.log(req.params.id);

    try {
        const unoDeLosSintomas = await pool.query('select MAX(symptoms.sym_id) from symptoms');

        if (unoDeLosSintomas.rows.length === 0) return res.status(404).json({
            message: 'Sintoma no encontrado'
        });

        //console.log(unoDeLosSintomas.rows);
        //res.send('Sintoma seleccionado'); 
        return res.json(unoDeLosSintomas.rows[0]);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getOneSymptom = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const unoDeLosSintomas = await pool.query('select * from symptoms where sym_id = $1', [id]);

        if (unoDeLosSintomas.rows.length === 0) return res.status(404).json({
            message: 'Sintoma no encontrado'
        });

        //console.log(unoDeLosSintomas.rows);
        //res.send('Sintoma seleccionado'); 
        return res.json(unoDeLosSintomas.rows[0]);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}


//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchSymptom = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
       const unaBusquedadeSintomas = await pool.query("select * from symptoms where name ilike '%'||$1||'%' limit 20", [palabra]);
        //const unaBusquedadeSintomas = await pool.query('select * from symptoms limit 20');

   //     if (unaBusquedadeSintomas.rows.length === 0) return res.status(404).json({
   //         message: 'Patologia no encontrada'
   //     });

        //console.log(unaBusquedadeSintomas.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadeSintomas.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByHpoSymptom = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
       const unaBusquedadeSintomas = await pool.query("select * from symptoms where hpo_id = $1 limit 20", [palabra]);
        //const unaBusquedadeSintomas = await pool.query('select * from symptoms limit 20');

   //     if (unaBusquedadeSintomas.rows.length === 0) return res.status(404).json({
   //         message: 'Patologia no encontrada'
   //     });

        //console.log(unaBusquedadeSintomas.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadeSintomas.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}


//COMANDO GET + 1 trae los que estan dentro de una subcategoria
const getSearchByCategorySymptom = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
       const unaBusquedadeSintomas = await pool.query("select categories_symptoms.cat_id, categories_symptoms.sym_id, symptoms.name, symptoms.hpo_id from (categories_symptoms inner join symptoms on categories_symptoms.sym_id = symptoms.sym_id) where categories_symptoms.cat_id = $1 limit 20", [palabra]);
        //const unaBusquedadeSintomas = await pool.query('select * from symptoms limit 20');

   //     if (unaBusquedadeSintomas.rows.length === 0) return res.status(404).json({
   //         message: 'Patologia no encontrada'
   //     });

        //console.log(unaBusquedadeSintomas.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadeSintomas.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 trae los que estan dentro de una subcategoria
const getSearchByCategorySymptomCount = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
       const unaBusquedadeSintomas = await pool.query("select COUNT(*) from (categories_symptoms inner join symptoms on categories_symptoms.sym_id = symptoms.sym_id) where categories_symptoms.cat_id = $1", [palabra]);
        //const unaBusquedadeSintomas = await pool.query('select * from symptoms limit 20');

   //     if (unaBusquedadeSintomas.rows.length === 0) return res.status(404).json({
   //         message: 'Patologia no encontrada'
   //     });

        //console.log(unaBusquedadeSintomas.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadeSintomas.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO POST
const createOneSymptom = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);

    const { name, sym_id, hpo_id } = req.body;
    //console.log(name, sym_id);

    try {
        const result = await pool.query('insert into Symptoms (name, sym_id, hpo_id) values ($1, $2, $3) RETURNING *',
            [name, sym_id, hpo_id]);

        //res.send('Creando uno Sintoma');
        res.json(result.rows[0]); // DEVUELVE EL OBJETO CREADO

    } catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }


}

//COMANDO DELETE
const deleteOneSymptom = async (req, res, next) => {
    const { id } = req.params;

    try {
        const unoDeLosSintomas = await pool.query('delete from symptoms where sym_id = $1', [id]);

    //    if (unoDeLosSintomas.rows.length === 0) return res.status(404).json({
    //        message: 'Sintoma no encontrado'
    //    });

        if (unoDeLosSintomas.rows.length === 0) return res.status(404);

        //console.log(unoDeLosSintomas.rows);
        //res.send('Sintoma Eliminado'); 
        return res.sendStaus(204);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }
}

//COMANDO PUT
const updateOneSymptom = async (req, res, next) => {
    const { id } = req.params;
    const { name, sym_id, hpo_id } = req.body;
    try {
        const unoDeLosSintomas = await pool.query('update symptoms set name = $1, sym_id = $2, hpo_id = $3 where sym_id = $4 RETURNING *', [name, sym_id, hpo_id , id]);

        if (unoDeLosSintomas.rows.length === 0) return res.status(404).json({
            message: 'Sintoma no encontrado'
        });

        res.json(unoDeLosSintomas.rows[0]); // DEVUELVE EL OBJETO ACTUALIZADO
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

    //res.send('Actualizando una Patologia');

}

module.exports = {
    getAllSymptoms: getAllSymptoms, //es igual que ponerlo como abajo
    getAllSymptomsCount,
    getOneSymptom,
    getLastSymptom,
    getSearchSymptom,
    getSearchByHpoSymptom,
    getSearchByCategorySymptom,
    getSearchByCategorySymptomCount,
    createOneSymptom,
    deleteOneSymptom,
    updateOneSymptom
}
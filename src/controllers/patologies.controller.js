const { request } = require("express");
const pool = require('../db') //conexion a la base de datos

//COMANDO GET
const getAllPatologies = async (req, res, next) => {

    try {
        const todasLasPatologias = await pool.query('select * from pathologies limit 20');
       // console.log(todasLasPatologias.rows.length);
       // if (todasLasPatologias.rows.length === 0) return res.status(404).json({
       //     message: 'Patologia no encontrada'
       // });
        //res.send('Listado de Patologias. Cantidad tomadas de la base: '+ todasLasPatologias.rowCount); 
        //console.log(todasLasPatologias.rows);
        return res.json(todasLasPatologias.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}

const getAllPatologiesCount = async (req, res, next) => {

    try {
        const todasLasPatologias = await pool.query('select COUNT(*) from pathologies');
       // console.log(todasLasPatologias.rows.length);
       // if (todasLasPatologias.rows.length === 0) return res.status(404).json({
       //     message: 'Patologia no encontrada'
       // });
        //res.send('Listado de Patologias. Cantidad tomadas de la base: '+ todasLasPatologias.rowCount); 
        //console.log(todasLasPatologias.rows);
        return res.json(todasLasPatologias.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}


//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getLastPatology = async (req, res, next) => {
    // console.log(req.params.id);

    try {
        const unaDeLasPatologias = await pool.query('select MAX(pathologies.pat_id) from pathologies');

        if (unaDeLasPatologias.rows.length === 0) return res.status(404).json({
            message: 'Patologia no encontrada'
        });

        //console.log(unaDeLasPatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaDeLasPatologias.rows[0]);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getOnePatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const unaDeLasPatologias = await pool.query('select * from pathologies where pat_id = $1', [id]);

        if (unaDeLasPatologias.rows.length === 0) return res.status(404).json({
            message: 'Patologia no encontrada'
        });

        //console.log(unaDeLasPatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaDeLasPatologias.rows[0]);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}


//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchPatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query("select * from pathologies where name ilike '%'||$1||'%' limit 20", [palabra]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByCategoryPatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select pathologies.pat_id, pathologies_categories.cat_id, pathologies.name , pathologies.orpha_id, pathologies.omim_id from (pathologies inner join pathologies_categories on pathologies_categories.pat_id = pathologies.pat_id) where pathologies_categories.cat_id = $1 LIMIT 20', [palabra]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByOneSymptomPatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1 } = req.params;
    //const { palabra } = req.body;
  // console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select pathologies.pat_id, pathologies.name , pathologies.orpha_id, pathologies.omim_id from (pathologies inner join pathologies_symptoms on pathologies_symptoms.pat_id = pathologies.pat_id) where pathologies_symptoms.sym_id = $1 LIMIT 20', [sym_id_1]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

    
}


const getSearchByOneSymptomPatologyCount = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1 } = req.params;
    //const { palabra } = req.body;
  // console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select COUNT(*) from (pathologies inner join pathologies_symptoms on pathologies_symptoms.pat_id = pathologies.pat_id) where pathologies_symptoms.sym_id = $1 LIMIT 20', [sym_id_1]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

    
}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByTwoSymptomsPatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1, sym_id_2 } = req.params;
    //const { palabra } = req.body;
  //  console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select * from pathologies where pat_id in ( select pat_id from pathologies_symptoms where sym_id = $1 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $2))', [sym_id_1,sym_id_2]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByTwoSymptomsPatologyCount = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1, sym_id_2 } = req.params;
    //const { palabra } = req.body;
  //  console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select COUNT(*) from pathologies where pat_id in ( select pat_id from pathologies_symptoms where sym_id = $1 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $2))', [sym_id_1,sym_id_2]);
         //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByThreeSymptomsPatology = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1, sym_id_2, sym_id_3 } = req.params;
    //const { palabra } = req.body;
   // console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select * from pathologies where pat_id in ( select pat_id from pathologies_symptoms where sym_id = $1 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $2 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $3)))', [sym_id_1, sym_id_2, sym_id_3]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchByThreeSymptomsPatologyCount = async (req, res, next) => {
    // console.log(req.params.id);
    const { sym_id_1, sym_id_2, sym_id_3 } = req.params;
    //const { palabra } = req.body;
   // console.log(sym_id_1);

    //ESTO HAY QUE CAMBIAR 
    //LLEGA LA CATEGORIA DE SISTEMA SELECCIONADA!!!
    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadePatologias = await pool.query('select COUNT(*) from pathologies where pat_id in ( select pat_id from pathologies_symptoms where sym_id = $1 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $2 and pat_id in (select pat_id from pathologies_symptoms where sym_id = $3)))', [sym_id_1, sym_id_2, sym_id_3]);
        //const unaBusquedadePatologias = await pool.query('select * from pathologies limit 20');

        //     if (unaBusquedadePatologias.rows.length === 0) return res.status(404).json({
        //         message: 'Patologia no encontrada'
        //     });

        //console.log(unaBusquedadePatologias.rows);
        //res.send('Patologia seleccionada'); 
        return res.json(unaBusquedadePatologias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}


//COMANDO POST
const createOnePatology = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);

    const { pat_id, name, orpha_id, omim_id } = req.body;
    //console.log(name, orpha_id, omim_id);

    try {
        const result = await pool.query('insert into pathologies (pat_id, name, orpha_id, omim_id) values ($1, $2, $3, $4) RETURNING *',
            [pat_id, name, orpha_id, omim_id]);

        //res.send('Creando una nueva Patologia');
        res.json(result.rows[0]); // DEVUELVE EL OBJETO CREADO

    } catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }


}

//COMANDO DELETE
const deleteOnePatology = async (req, res, next) => {
    const { id } = req.params;

    try {
        //console.log(id)
        const unaDeLasPatologias = await pool.query('delete from pathologies where pat_id = $1', [id]);

     //   if (unaDeLasPatologias.rows.length === 0) return res.status(404).json({
     //       message: 'Patologia no encontrada'
     //   });

        if (unaDeLasPatologias.rows.length === 0) return res.status(404);

        //console.log(unaDeLasPatologias.rows);
        //res.send('Patologia Eliminada'); 
        return res.sendStaus(204);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }
}

//COMANDO PUT
const updateOnePatology = async (req, res, next) => {
    const { id } = req.params;
    const { pat_id, name, orpha_id, omim_id } = req.body;
    try {
        const unaDeLasPatologias = await pool.query('update pathologies set pat_id = $1, name = $2, orpha_id = $3,  omim_id = $4 where pat_id = $5 RETURNING *', [pat_id, name, orpha_id, omim_id, id]);

        if (unaDeLasPatologias.rows.length === 0) return res.status(404).json({
            message: 'Patologia no encontrada'
        });

        res.json(unaDeLasPatologias.rows[0]); // DEVUELVE EL OBJETO ACTUALIZADO
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

    //res.send('Actualizando una Patologia');

}

module.exports = {
    getAllPatologies: getAllPatologies, //es igual que ponerlo como abajo
    getAllPatologiesCount,
    getOnePatology,
    getLastPatology,
    getSearchPatology,
    getSearchByOneSymptomPatology,
    getSearchByOneSymptomPatologyCount,
    getSearchByTwoSymptomsPatologyCount,
    getSearchByThreeSymptomsPatologyCount,
    getSearchByTwoSymptomsPatology,
    getSearchByThreeSymptomsPatology,
    getSearchByCategoryPatology,
    createOnePatology,
    deleteOnePatology,
    updateOnePatology
}
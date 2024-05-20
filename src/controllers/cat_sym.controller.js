const { request } = require("express");
const pool = require('../db') //conexion a la base de datos

//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getTheCategoriesforSymptom = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const todosLasCategorias = await pool.query(
           // 'select * from categories_symptoms where pat_id = $1'
            
           'select categories_symptoms.cat_id, categories_symptoms.sym_id, categories.name, categories.type from (categories_symptoms inner join categories on categories_symptoms.cat_id = categories.cat_id) where categories_symptoms.sym_id = $1'
            
            , [id]);

     //   if (todosLasCategorias.rows.length === 0) return res.status(404).json({
      //      message: 'No se encuentran sintomas para esta patologia'
      //  });
       // if (todosLasCategorias.rows.length === 0) return res.status(404);
        //console.log(todosLasCategorias.rows);
        //res.send('Sintoma seleccionado'); 
        return res.json(todosLasCategorias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}


//COMANDO POST
const addOneCategoryToSymptom = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);
    const { cat_id, sym_id } = req.params;
    //const { pat_id, sym_id } = req.body;
    console.log(cat_id, sym_id);

    try {
        const result = await pool.query('insert into categories_symptoms (cat_id, sym_id) values ($1, $2) RETURNING *',
            [cat_id, sym_id]);

            //  falta traer el nombre y codigo de la categoria para llenar los datos del form
            
        //res.send('Creando uno Sintoma');
        res.json(result.rows[0]); // DEVUELVE EL OBJETO CREADO

    } catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }


}

//COMANDO DELETE
const removeOneCategoryFromSymptom = async (req, res, next) => {
    const { cat_id, sym_id } = req.params;

   // const { cat_id, sym_id } = req.body;

    try {
        const removeOneSymptom = await pool.query('delete from categories_symptoms where (cat_id = $1 AND sym_id = $2)', [cat_id, sym_id ]);

      //  if (removeOneSymptom.rows.length === 0) return res.status(404).json({
     //       message: 'Sintoma no encontrado'
      //  });

        if (removeOneSymptom.rows.length === 0) return res.status(404);

        //console.log(removeOneSymptom.rows);
        //res.send('Sintoma Eliminado'); 
        return res.sendStaus(204);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }
}


module.exports = {
    getTheCategoriesforSymptom,
    addOneCategoryToSymptom,
    removeOneCategoryFromSymptom
}
const { request } = require("express");
const pool = require('../db') //conexion a la base de datos

//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getTheCategoriesforCategory = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const todosLasCategorias = await pool.query(
           // 'select * from categories_categories where cat_id_1 = $1'
            
           'select categories_categories.cat_id_1, categories_categories.cat_id_2, categories.name, categories.type from (categories_categories inner join categories on categories_categories.cat_id_2 = categories.cat_id) where categories_categories.cat_id_1 = $1'
            
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


const getAllSubCategoriesOfCategory = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const todosLasCategorias = await pool.query(
           // 'select * from categories_categories where cat_id_1 = $1'
            
           'select categories_categories.cat_id_1, categories_categories.cat_id_2 as cat_id, categories.name, categories.type from (categories_categories inner join categories on categories_categories.cat_id_2 = categories.cat_id) where categories_categories.cat_id_1 = $1'
            
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
const addOneCategoryToCategory = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);
    const { cat_id_1, cat_id_2 } = req.params;
    //const { pat_id, sym_id } = req.body;
    console.log(cat_id_1, cat_id_2);

    try {
        const result = await pool.query('insert into categories_categories (cat_id_1, cat_id_2) values ($1, $2) RETURNING *',
            [cat_id_1, cat_id_2]);

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
const removeOneCategoryFromCategory = async (req, res, next) => {
    const { cat_id_1, cat_id_2 } = req.params;

   // const { cat_id, sym_id } = req.body;

    try {
        const removeOneSymptom = await pool.query('delete from categories_categories where (cat_id_1 = $1 AND cat_id_2 = $2)', [cat_id_1, cat_id_2 ]);

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
    getTheCategoriesforCategory,
    getAllSubCategoriesOfCategory,
    addOneCategoryToCategory,
    removeOneCategoryFromCategory
}
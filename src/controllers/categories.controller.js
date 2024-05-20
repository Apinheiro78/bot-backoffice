const { request } = require("express");
const pool = require('../db') //conexion a la base de datos

//COMANDO GET
const getAllCategories = async (req, res, next) => {

    try {
        const todasLasCategorias = await pool.query(`select * from categories where categories.type = 'system'`);
       // console.log(todasLasCategorias.rows.length);
       // if (todasLasCategorias.rows.length === 0) return res.status(404).json({
       //     message: 'Categoria no encontrada'
       // });
        //res.send('Listado de Categorias. Cantidad tomadas de la base: '+ todasLasCategorias.rowCount); 
        //console.log(todasLasCategorias.rows);
        return res.json(todasLasCategorias.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}


const getAllCategoriesCount = async (req, res, next) => {

    try {
        const todasLasCategorias = await pool.query('select COUNT(*) from categories');
       // console.log(todasLasCategorias.rows.length);
       // if (todasLasCategorias.rows.length === 0) return res.status(404).json({
       //     message: 'Categoria no encontrada'
       // });
        //res.send('Listado de Categorias. Cantidad tomadas de la base: '+ todasLasCategorias.rowCount); 
        //console.log(todasLasCategorias.rows);
        return res.json(todasLasCategorias.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}


//COMANDO GET
const getAllCategoriesTypes = async (req, res, next) => {

    try {
        const todosLosTiposdeCategorias = await pool.query('select DISTINCT type from categories');
       // console.log(todasLasCategorias.rows.length);
       // if (todasLasCategorias.rows.length === 0) return res.status(404).json({
       //     message: 'Categoria no encontrada'
       // });
        //res.send('Listado de Categorias. Cantidad tomadas de la base: '+ todasLasCategorias.rowCount); 
        //console.log(todosLosTiposdeCategorias.rows);
        return res.json(todosLosTiposdeCategorias.rows);
    } catch (error) {
        //res.json({ error: error.message });
        next(error);
    }

}



//COMANDO GET + ID DE Categoria SELECCIONADA
const getLastCategory = async (req, res, next) => {
    // console.log(req.params.id);

    try {
        const ultimaDeLasCategorias = await pool.query('select  MAX(categories.cat_id) from categories');

        if (ultimaDeLasCategorias.rows.length === 0) return res.status(404).json({
            message: 'Categoria no encontrada'
        });

        //console.log(unaDeLasCategorias.rows[0].max);
        //res.send('Categoria seleccionada'); 
        return res.json(ultimaDeLasCategorias.rows[0]);  //retorna como max el valor del ultimo
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}

//COMANDO GET + ID DE Categoria SELECCIONADA
const getOneCategory = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const unaDeLasCategorias = await pool.query('select * from categories where cat_id = $1', [id]);

        if (unaDeLasCategorias.rows.length === 0) return res.status(404).json({
            message: 'Categoria no encontrada'
        });

        //console.log(unaDeLasCategorias.rows);
        //res.send('Categoria seleccionada'); 
        return res.json(unaDeLasCategorias.rows[0]);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}


//COMANDO GET + 1 PALABRA DE BUSQUEDA SELECCIONADA
const getSearchCategory = async (req, res, next) => {
    // console.log(req.params.id);
    const { palabra } = req.params;
    //const { palabra } = req.body;
    console.log(palabra);

    try {
        // se usa ILIKE en lugar de LIKE para que no respete mayusculas y minusculas
        const unaBusquedadeCategorias = await pool.query("select * from categories where name ilike '%'||$1||'%' ", [palabra]);
        //const unaBusquedadeCategorias = await pool.query('select * from categories limit 20');

        //     if (unaBusquedadeCategorias.rows.length === 0) return res.status(404).json({
        //         message: 'Categoria no encontrada'
        //     });

        //console.log(unaBusquedadeCategorias.rows);
        //res.send('Categoria seleccionada'); 
        return res.json(unaBusquedadeCategorias.rows);
    }
    catch (error) {
        //res.json({ error: error.message });s
        // console.log(error.message);
        next(error);
    }

}

//COMANDO POST
const createOneCategory = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);

    const { cat_id, name, type } = req.body;
    //console.log(name, orpha_id, omim_id);

    try {
        const result = await pool.query('insert into categories (cat_id, name, type) values ($1, $2, $3) RETURNING *',
            [cat_id, name, type]);

        //res.send('Creando una nueva Categoria');
        res.json(result.rows[0]); // DEVUELVE EL OBJETO CREADO

    } catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }


}

//COMANDO DELETE
const deleteOneCategory = async (req, res, next) => {
    const { id } = req.params;

    try {
        //console.log(id)
        const unaDeLasCategorias = await pool.query('delete from categories where cat_id = $1', [id]);

      //  if (unaDeLasCategorias.rows.length === 0) return res.status(404).json({
      //      message: 'Categoria no encontrada'
      //  });

        if (unaDeLasCategorias.rows.length === 0) return res.status(404);

        //console.log(unaDeLasCategorias.rows);
        //res.send('Categoria Eliminada'); 
        return res.sendStaus(204);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }
}

//COMANDO PUT
const updateOneCategory = async (req, res, next) => {
    const { id } = req.params;
    const { cat_id, name, type } = req.body;
    try {
        const unaDeLasCategorias = await pool.query('update categories set cat_id = $1, name = $2, type = $3 where cat_id = $4 RETURNING *', [cat_id, name, type, id]);

        if (unaDeLasCategorias.rows.length === 0) return res.status(404).json({
            message: 'Categoria no encontrada'
        });

        res.json(unaDeLasCategorias.rows[0]); // DEVUELVE EL OBJETO ACTUALIZADO
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

    //res.send('Actualizando una Categoria');

}

module.exports = {
    getAllCategories: getAllCategories, //es igual que ponerlo como abajo
    getAllCategoriesCount,
    getOneCategory,
    getLastCategory,
    getSearchCategory,
    createOneCategory,
    deleteOneCategory,
    updateOneCategory,
    getAllCategoriesTypes
}
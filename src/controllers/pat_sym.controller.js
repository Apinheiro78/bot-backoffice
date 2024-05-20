const { request } = require("express");
const pool = require('../db') //conexion a la base de datos



//COMANDO GET + ID DE PATOLOGIA SELECCIONADA
const getTheSymptoms = async (req, res, next) => {
    // console.log(req.params.id);
    const { id } = req.params;

    try {
        const todosLosSintomas = await pool.query(
           // 'select * from pathologies_symptoms where pat_id = $1'
            
            'select pathologies_symptoms.pat_id, symptoms.name, symptoms.sym_id, symptoms.hpo_id from (pathologies_symptoms inner join symptoms on pathologies_symptoms.sym_id = symptoms.sym_id) where pathologies_symptoms.pat_id = $1'
            
            , [id]);

     //   if (todosLosSintomas.rows.length === 0) return res.status(404).json({
      //      message: 'No se encuentran sintomas para esta patologia'
      //  });
       // if (todosLosSintomas.rows.length === 0) return res.status(404);
        //console.log(unoDeLosSintomas.rows);
        //res.send('Sintoma seleccionado'); 
        return res.json(todosLosSintomas.rows);
    }
    catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }

}


//COMANDO POST
const addOneSymptom = async (req, res, next) => {
    //const body = req.body;
    //console.log(body);
    const { pat_id, sym_id } = req.params;
    //const { pat_id, sym_id } = req.body;
    console.log(pat_id, sym_id);

    try {
        const result = await pool.query('insert into pathologies_symptoms (pat_id, sym_id) values ($1, $2) RETURNING *',
            [pat_id, sym_id]);

        //res.send('Creando uno Sintoma');
        res.json(result.rows[0]); // DEVUELVE EL OBJETO CREADO

    } catch (error) {
        //res.json({ error: error.message });
        // console.log(error.message);
        next(error);
    }


}

//COMANDO DELETE
const removeOneSymptom = async (req, res, next) => {
    const { pat_id, sym_id } = req.params;

   // const { pat_id, sym_id } = req.body;

    try {
        const removeOneSymptom = await pool.query('delete from pathologies_symptoms where (pat_id = $1 AND sym_id = $2)', [pat_id, sym_id ]);

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
    getTheSymptoms,
    addOneSymptom,
    removeOneSymptom
}
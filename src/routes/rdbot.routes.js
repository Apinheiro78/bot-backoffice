const { Router } = require('express')
//const pool = require('../db') //conexion a la base de datos

const { getAllPatologies, getAllPatologiesCount, getOnePatology, getLastPatology, getSearchPatology, getSearchByCategoryPatology, getSearchByOneSymptomPatology, getSearchByTwoSymptomsPatology, getSearchByThreeSymptomsPatology, getSearchByOneSymptomPatologyCount, getSearchByTwoSymptomsPatologyCount, getSearchByThreeSymptomsPatologyCount, createOnePatology, deleteOnePatology, updateOnePatology } = require('../controllers/patologies.controller')

const { getAllSymptoms, getAllSymptomsCount, getOneSymptom, getLastSymptom, getSearchSymptom, getSearchByHpoSymptom, getSearchByCategorySymptom, getSearchByCategorySymptomCount, createOneSymptom, deleteOneSymptom, updateOneSymptom } = require('../controllers/symptoms.controller')

const { getAllCategories, getAllCategoriesCount,  getOneCategory, getLastCategory, getSearchCategory, createOneCategory, deleteOneCategory, updateOneCategory, getAllCategoriesTypes } = require('../controllers/categories.controller')

const { getTheSymptoms, addOneSymptom, removeOneSymptom } = require('../controllers/pat_sym.controller')

const { getTheCategoriesforSymptom, addOneCategoryToSymptom, removeOneCategoryFromSymptom } = require('../controllers/cat_sym.controller')

const { getTheCategoriesforCategory, getAllSubCategoriesOfCategory, addOneCategoryToCategory, removeOneCategoryFromCategory } = require('../controllers/cat_cat.controller')



const router = Router();

/* PRUEBA
router.get('/pathologies', async (req, res) => {
   // res.send('Listado de Patologias');
   const result = await pool.query('select COUNT(DISTINCT name) from pathologies')
   //console.log(result) //trae resultado de toda la consulta completa
   res.json('Ejecutado con exito. Cantidad de patologias cargadas: ' + result.rows[0].count)
})
*/

//PATOGOLIAS
router.get('/pathologies', getAllPatologies)
router.get('/count/pathologies', getAllPatologiesCount)

router.get('/pathologies/:id', getOnePatology)
router.get('/last/pathologies', getLastPatology)
// borrado daba error el path
//router.get('/pathologies/search/:palabra', getSearchPatology)
router.get('/search/pathologies/:palabra', getSearchPatology)
router.get('/searchbycategory/pathologies/:palabra', getSearchByCategoryPatology)
router.get('/searchbyonesymptom/pathologies/:sym_id_1', getSearchByOneSymptomPatology)
router.get('/searchbytwosymptoms/pathologies/:sym_id_1/:sym_id_2', getSearchByTwoSymptomsPatology)
router.get('/searchbythreesymptoms/pathologies/:sym_id_1/:sym_id_2/:sym_id_3', getSearchByThreeSymptomsPatology)
router.get('/count/searchbyonesymptom/pathologies/:sym_id_1', getSearchByOneSymptomPatologyCount)
router.get('/count/searchbytwosymptoms/pathologies/:sym_id_1/:sym_id_2', getSearchByTwoSymptomsPatologyCount)
router.get('/count/searchbythreesymptoms/pathologies/:sym_id_1/:sym_id_2/:sym_id_3', getSearchByThreeSymptomsPatologyCount)

router.post('/pathologies', createOnePatology)
router.delete('/pathologies/:id', deleteOnePatology)
router.put('/pathologies/:id', updateOnePatology)

//SINTOMAS
router.get('/symptoms', getAllSymptoms)
router.get('/count/symptoms', getAllSymptomsCount)

router.get('/last/symptoms', getLastSymptom)
router.get('/symptoms/:id', getOneSymptom)
router.get('/search/symptoms/:palabra', getSearchSymptom)
router.get('/searchbyhpo/symptoms/:palabra', getSearchByHpoSymptom)
router.get('/searchbycategory/symptoms/:palabra', getSearchByCategorySymptom)
router.get('/count/searchbycategory/symptoms/:palabra', getSearchByCategorySymptomCount)

router.post('/symptoms', createOneSymptom)
router.delete('/symptoms/:id', deleteOneSymptom)
router.put('/symptoms/:id', updateOneSymptom)

//CATEGORIAS
router.get('/categories', getAllCategories)
router.get('/count/categories', getAllCategoriesCount)

router.get('/last/categories', getLastCategory)
router.get('/types/categories', getAllCategoriesTypes)
router.get('/categories/:id', getOneCategory)
router.get('/search/categories/:palabra', getSearchCategory)
router.post('/categories', createOneCategory)
router.delete('/categories/:id', deleteOneCategory)
router.put('/categories/:id', updateOneCategory)

//SINTOMAS DE PATOLOGIA
router.get('/pat_sym/:id', getTheSymptoms)
router.post('/add/pat_sym/:pat_id/:sym_id', addOneSymptom)
router.delete('/remove/pat_sym/:pat_id/:sym_id', removeOneSymptom)

//CATEGORIAS DE LOS SINTOMAS
router.get('/cat_sym/:id', getTheCategoriesforSymptom)
router.post('/add/cat_sym/:cat_id/:sym_id', addOneCategoryToSymptom)
router.delete('/remove/cat_sym/:cat_id/:sym_id', removeOneCategoryFromSymptom)

//CATEGORIAS DE LAS CATEGORIAS
router.get('/cat_cat/:id', getTheCategoriesforCategory)
router.post('/add/cat_cat/:cat_id_1/:cat_id_2', addOneCategoryToCategory)
router.delete('/remove/cat_cat/:cat_id_1/:cat_id_2', removeOneCategoryFromCategory)
router.get('/subcategories/cat_cat/:id', getAllSubCategoriesOfCategory)

module.exports = router;
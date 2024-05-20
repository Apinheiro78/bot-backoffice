import { BrowserRouter, Routes, Route } from 'react-router-dom'


import PathologiesList from './components/PathologiesList'
import PathologiesSearch from './components/PathologiesSearch'
import PathologiesForm from './components/PathologiesForm'

import SymptomsList from './components/SymptomsList'
import SymptomsSearch from './components/SymptomsSearch'
import SymptomsForm from './components/SymptomsForm'

import CategoriesList from './components/CategoriesList'
import CategoriesSearch from './components/CategoriesSearch'
import CategoriesForm from './components/CategoriesForm'

import PathologiesSymptomsList from './components/PathologiesSymptomsList'

import CategoriesOfSymptomsList from './components/CategoriesOfSymptomsList'

import CategoriesOfCategoryList from './components/CategoriesOfCategoryList'

import SimulationCases from './components/SimulationCases'

import NavBar from './components/NavBar'
import Home from './components/Home'

import { Container } from '@mui/material'


export default function index() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/pathologies/' element={<PathologiesList />} />
          <Route path='/pathologies/search' element={<PathologiesSearch />} />

          <Route path='/pathologies/new' element={<PathologiesForm />} />
          <Route path='/pathologies/:id/edit' element={<PathologiesForm />} />

          <Route path='/symptoms/' element={<SymptomsList />} />
          <Route path='/symptoms/search' element={<SymptomsSearch />} />

          <Route path='/symptoms/new' element={<SymptomsForm />} />
          <Route path='/symptoms/:id/edit' element={<SymptomsForm />} />

          <Route path='/categories/' element={<CategoriesList />} />
          <Route path='/categories/search' element={<CategoriesSearch />} />

          <Route path='/categories/new' element={<CategoriesForm />} />
          <Route path='/categories/:id/edit' element={<CategoriesForm />} />

          <Route path='/pathologies_symptoms/:id' element={< PathologiesSymptomsList />} />

          <Route path='/categories_symptoms/:id' element={< CategoriesOfSymptomsList />} />

          <Route path='/categories_category/:id' element={< CategoriesOfCategoryList />} />
         
          <Route path='/simulation_cases/' element={< SimulationCases />} />

        </Routes>
      </Container>
    </BrowserRouter>
  )
}

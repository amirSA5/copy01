import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Step1devis from './Devis/Step1_devis'
import Home from './Home/Home'
import ParametresProfiler from './profiler/ParametresProfiler'
import HistoriqueGeneral from './Historique/HistoriqueGeneral'
import DrawerAppBar from './navigations/DrawerAppBar'

function RoutesPages() {
  return (
    <>
      <DrawerAppBar />
      <Routes>
          <Route exact path='/'  element={<Home />} />
          <Route exact path='/Step1_devis'  element={<Step1devis />} />
          <Route exact path='/parametres_profiler'  element={<ParametresProfiler />} />
          <Route exact path='/Historique_devis'  element={<HistoriqueGeneral />} />
      </Routes>
    </>
  )
}

export default RoutesPages
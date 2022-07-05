import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Step1devis from './Devis/Step1_devis'
import Home from './Home/Home'
import DrawerAppBar from './navigations/DrawerAppBar'
import ParametresProfiler from './profiler/ParametresProfiler'


function RoutesPages() {
  return (
    <>
      <DrawerAppBar />
      <Routes>
          <Route exact path='/'  element={<Home />} />
          <Route exact path='/Step1_devis'  element={<Step1devis />} />
          <Route exact path='/parametres_profiler'  element={<ParametresProfiler />} />
      </Routes>
    </>
  )
}

export default RoutesPages
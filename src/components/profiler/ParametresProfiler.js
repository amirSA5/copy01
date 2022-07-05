import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import './ParametresProfiler.css'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "15vw",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
};
function ParametresProfiler() {

  const [article, setArticle] = useState([])

  const [nomArticle, setNomArticle] = useState("")

  const [sousArticle, setSousArticle] = useState([])

  const [serie, setSerie] = useState([])

  const [attribut, setAttribut] = useState([])

  const [profiler, setProfiler] = useState([])

  const [open, setOpen] = useState(false);

  const [openAttribut, setOpenAttribut] = useState(false);

  const [openSerie, setOpenSerie] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);

  const [openProfiler, setOpenProfiler] = useState(false);

  const [nomSousArticle, setNomSousArticle] = useState('')

  const [nomSerie, setNomSerie] = useState('')


  const [articleID, setArticleID] = useState("")

  const [serieID, setSerieID] = useState("")


  const [ajoutsousArticleNom, setAjoutSousArticleNom] = useState({ Nom: "" })

  const [sousArticleUpdate, setSousArticleUpdate] = useState({ Nom: "" })

  const [sousArticleID, setSousArticleID] = useState("")

  const [attributID, setAttributID] = useState("")

  const [ajoutSerieNom, setAjoutSerieNom] = useState({ Nom: "" })

  const [ajoutAttributNom, setAjoutAttribut] = useState({ Nom: "" })


  const [profilerReference, setProfilerReference] = useState({ reference: "" })

  const [profilerFormule, setProfilerFormule] = useState({ formule: "" })




  useEffect(data => {
    axios.get('http://localhost:4000/app/Liste_articles').then(res => {
      const articles = res.data
      setArticle(articles)
    })
  },[article,sousArticle])

  const afficherSousArticle = (Nom, id) => {
    try {
      setNomArticle(Nom)
      setArticleID(id)
      axios.get('http://localhost:4000/app/Liste_sousArticle').then(res => {
        const sousArticle = res.data
        var list = [{}]
        var j = 0
        for (var i = 0; i < sousArticle.length; i++) {
          if (id === sousArticle[i].article) {
            list[j] = sousArticle[i]
            j++
          }
        }
        setSousArticle(list)
      })

    } catch (error) {
      alert(error.response.data.msg)
    }

  }

  const afficherSerie = (Nom, id) => {
    try {

      setNomSousArticle(Nom)
      setSousArticleID(id)
      axios.get('http://localhost:4000/app/Liste_serie').then(res => {
        const serie = res.data
        var list = [{}]
        var j = 0
        for (var i = 0; i < serie.length; i++) {
          if (id === serie[i].sousArticle) {
            list[j] = serie[i]
            j++
          }
        }
        setSerie(list)
      })



    } catch (error) {

    }

  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAjoutSousArticleNom({ ...ajoutsousArticleNom.Nom, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const ajoutsousArticle = (e) => {

    axios.post("http://localhost:4000/app/Ajout_sousArticle", { Nom: ajoutsousArticleNom.Nom, article: articleID })
      .then((response) => console.log(response.data));
    console.log(articleID)
    setOpen(false);
    e.preventDefault()
  };

  const deleteSousArticle = async (id) => {
    try {

      const deleteSousArticle = axios.delete(
        `http://localhost:4000/app/delete_sousArticle/${id}`
      );


      await deleteSousArticle;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInputUpdate = (e) => {
    const { name, value } = e.target;
    setSousArticleUpdate({ ...sousArticleUpdate.Nom, [name]: value });
  };

  const handleCloseUpdate = (id) => {
    setOpenUpdate(false)
  };

  const handleOpenUpdate = (id) => {
    setSousArticleID(id)
    setOpenUpdate(true);
  };

  const updateSousArticle = (id) => {
    axios
      .put(`http://localhost:4000/app/update_sousArticle/${id}`, {
        Nom: sousArticleUpdate.Nom
      })
      .then((response) => console.log(response.data));
    setOpenUpdate(false);
  };

  const handleCloseSerie = () => {
    setOpenSerie(false);
  };

  const handleOpenSerie = () => {
    setOpenSerie(true);
  };

  const handleCloseAttribut = () => {
    setOpenAttribut(false);
  };

  const handleOpenAttribut= () => {
    setOpenAttribut(true);
  };

  const handleChangeInputSerie = (e) => {
    const { name, value } = e.target;
    setAjoutSerieNom({ ...ajoutSerieNom.Nom, [name]: value });
  };

  const handleChangeInputAttribut = (e) => {
    const { name, value } = e.target;
    setAjoutAttribut({ ...ajoutAttributNom.Nom, [name]: value });
  };

  const ajoutSerie = (e) => {

    axios.post("http://localhost:4000/app/Ajout_serie", { Nom: ajoutSerieNom.Nom, sousArticle: sousArticleID })
      .then((response) => console.log(response.data));
    console.log(articleID)
    setOpenSerie(false);
  };

  const ajoutAttribut = (e) => {

    axios.post("http://localhost:4000/app/Ajout_Attribut", { Nom: ajoutAttributNom.Nom, serie : serieID })
      .then((response) => console.log(response.data));
    console.log(articleID)
    setOpenAttribut(false);
    e.preventDefault()
  };

  const afficherProfiler = (Nom, id) => {
    try {

      setNomSerie(Nom)
      setSerieID(id)
      axios.get('http://localhost:4000/app/Liste_Attribut').then(res => {
        const attribut = res.data
        var list = [{}]
        var j = 0
        for (var i = 0; i < attribut.length; i++) {
          if (id === attribut[i].serie) {
            list[j] = attribut[i]
            j++
          }
        }
        setAttribut(list)
        axios.get("http://localhost:4000/app/Liste_profiler").then((res) => {
          const profiler = res.data
          var tab = [{}]
          var k = 0
          for (var i = 0; i < profiler.length; i++) {
            for (var j = 0; j < list.length; j++) {
              if (profiler[i].attribut === list[j]._id) {
                tab[k] = profiler[i]
                k++
              }

            }
          }
          setProfiler(tab)
        })

      })



    } catch (error) {

    }

  }

  const deleteAttribut = async (id) => {
    try {

      const deleteAttribut = axios.delete(
        `http://localhost:4000/app/delete_Attribut/${id}`
      );


      await deleteAttribut;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCloseProfiler = () => {
    setOpenProfiler(false);
  };

  const handleOpenProfiler = (id) => {
    setAttributID(id)
    setOpenProfiler(true);
  };

  const handleChangeInputProfilerReference = (e) => {
    const { name, value } = e.target;
    setProfilerReference({ ...profilerReference.reference, [name]: value });
  };

  const handleChangeInputProfilerFormule = (e) => {
    const { name, value } = e.target;
    setProfilerFormule({ ...profilerFormule.formule, [name]: value });
  };

  const ajoutProfiler = (e) => {

    axios.post("http://localhost:4000/app/Ajout_profiler", { reference: profilerReference.reference, formule: profilerFormule.formule, attribut: attributID })
      .then((response) => console.log(response.data));
    e.preventDefault()
  };

  return (
    <div className='parametres'>
      {/* <Link to='/'>
          <Button  size='large' variant="contained" color="success"><KeyboardDoubleArrowLeftIcon />RETOUR</Button>
      </Link> */}
      <h1 className='title_parametres'>Paramétres Profiler</h1>
      <table className='parametres_Table'>
        <tbody>
          <tr className='tr_parametres_Table'>
            {article.map(data => {
              return (<td key={data._id}><Button onClick={() => afficherSousArticle(data.Nom, data._id)} className='paramétres_profiler' size='large' variant="contained" color="secondary">{data.Nom}</Button></td>)
            })}
          </tr>
        </tbody>
      </table>

      <h2 className='title_parametres' >{nomArticle}<AddCircleOutlinedIcon fontSize='large' color='error' onClick={handleOpen} /> </h2>

      <table className='parametres_Table'>
        <tbody>
          <tr className='tr_parametres_Table'>
            {sousArticle.map(data => {
              return (

                <td key={data._id}>
                  <Button onClick={() => afficherSerie(data.Nom, data._id)} className='paramétres_profiler' size='large' variant="contained" color="success">{data.Nom}</Button>
                  <Button onClick={() => handleOpenUpdate(data._id)} className='paramétres_profiler' size='large' variant="contained" color="primary"><UpdateIcon /></Button>
                  <Button onClick={() => deleteSousArticle(data._id)} className='paramétres_profiler' size='large' variant="contained" color="error"><DeleteIcon /></Button>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>

      <h2 className='title_parametres' >{nomSousArticle}<AddCircleOutlinedIcon onClick={handleOpenSerie} fontSize='large' color='error' /></h2>

      <div>
        <table className='parametres_Table'>
          <tbody>
            <tr className='tr_parametres_Table'>
            {serie.map(data => {
              return (

                <td key={data._id}>
                  <Button onClick={() => afficherProfiler(data.Nom, data._id)} className='paramétres_profiler' size='large' variant="contained" color="success">{data.Nom}</Button>
                </td>
              )
            })}
          </tr>

          </tbody>
        </table>
        <h2 className='title_parametres'>{nomSerie}<AddCircleOutlinedIcon onClick={handleOpenAttribut} fontSize='large' color='error' /></h2>
        <table>
          <tbody>
            {attribut.map((data) => {
                          return (
                            <tr key={data._id} >
                              <td>
                                <Button onClick={() => deleteAttribut(data._id)} className='paramétres_profiler' size='small' variant="contained" color="error"><DeleteIcon /></Button>
                                <Button onClick={() => handleOpenProfiler(data._id)} className='paramétres_profiler' size='small' variant="contained" color="secondary"><AddCircleOutlinedIcon fontSize='meduim' /></Button>
                              </td>
                              <td className="td_table_next" key={data._id}>
                                {data.Nom}
                              </td>

                              {profiler.map((data) => {
                                return (
                                  <td key={data._id} className="td_table_next">{data.reference}</td>
                                )
                              })}
                            </tr>
                          );
                        })}
          </tbody>
        </table>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={ajoutsousArticleNom.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={ajoutsousArticle}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter sous Article
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td>{articleID}</td>
                <td className="td_table_Modal" onClick={handleClose}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={sousArticleUpdate.Nom}
                    name="Nom"
                    onChange={handleChangeInputUpdate}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={() => updateSousArticle(sousArticleID)}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Modifier Article
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td>{sousArticleID}</td>
                <td className="td_table_Modal" onClick={handleCloseUpdate}>
                  <h2 className="exit_modal">x</h2>
                </td>

              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={openSerie}
        onClose={handleCloseSerie}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={ajoutSerieNom.Nom}
                    name="Nom"
                    onChange={handleChangeInputSerie}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={()=>ajoutSerie()}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Serie
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td>{articleID}</td>
                <td className="td_table_Modal" onClick={handleCloseSerie}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={openAttribut}
        onClose={handleCloseAttribut}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={ajoutAttributNom.Nom}
                    name="Nom"
                    onChange={handleChangeInputAttribut}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={()=>ajoutAttribut()}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Attribut
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td>{articleID}</td>
                <td className="td_table_Modal" onClick={handleCloseAttribut}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={openProfiler}
        onClose={handleCloseProfiler}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={profilerReference.reference}
                    name="reference"
                    onChange={handleChangeInputProfilerReference}
                  />
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={profilerFormule.formule}
                    name="formule"
                    onChange={handleChangeInputProfilerFormule}
                  />
                </td>

              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <Button
                    onClick={() => ajoutProfiler()}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Profiler
                  </Button>
                </td>
                <td className="td_table_Modal" onClick={handleCloseProfiler}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>

    </div>
  )
}

export default ParametresProfiler
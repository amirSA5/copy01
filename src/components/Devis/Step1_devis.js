import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import "./Step1_devis.css";
import ArticleItem from "./articleItem/ArticleItem";


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

const styleArticleDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "35vw",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
};

const ariaLabel = { "aria-label": "description" };

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Step1_devis() {
  const [open, setOpen] = useState(false);

  const [article, setArticle] = useState({ Nom: "" });

  const [listeArticle, setListeArticle] = useState([]);

  const [images, setImages] = useState(false);

  const [openArticle, setOpenArticle] = useState(false);

  const [traiterArticle, setTraiterArticle] = useState([]);

  const [name, setName] = useState("");

  const [sousArticle, setSousArticle] = useState("");

  const [attribut,setAttribut]=useState([])

  const [profiler,setProfiler]=useState([])

  const [Next, setNext] = useState(false);

  useEffect(
    (data) => {
      axios.get("http://localhost:4000/app/Liste_articles").then((res) => {
        const articles = res.data;
        setListeArticle(articles);
      });
    },
    [listeArticle, article]
  );

  const handleCheck = (id) => {
    listeArticle.forEach((product) => {
      if (listeArticle._id === id) listeArticle.checked = !listeArticle.checked;
    });
    setListeArticle([...listeArticle]);
  };

  const deleteArticle = async (id, public_id) => {
    try {
      const destroyImg = axios.post("http://localhost:4000/app/destroy", {
        public_id,
      });
      const deleteArticle = axios.delete(
        `http://localhost:4000/app/deleteArticle/${id}`
      );

      await destroyImg;
      await deleteArticle;
      
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenArticle = (Nom,id) => {
    try {
        setOpenArticle(true);
        setName(Nom);
        axios.get("http://localhost:4000/app/Liste_sousArticle").then((res) => {
        const sousArticle = res.data;
        var list =[{}]
        var j=0
        for(var i=0;i<sousArticle.length;i++){
            if(id===sousArticle[i].article){
                list[j]=sousArticle[i]
                j++
            }
        }
        setTraiterArticle(list);
        
        
        });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:4000/app/upload",formData);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleChangesousArticle = (e) => {
    setSousArticle(e.target.value);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseArticle = () => {
    setOpenArticle(false);
  };

  const nextDetails = () => {
    try {
      setOpenArticle(false);
      setNext(true);
      axios.get("http://localhost:4000/app/Liste_Attribut").then((res) => {
        const attribut = res.data;
        var list =[{}]
        var j=0
        for(var i=0;i<attribut.length;i++){
            if(sousArticle===attribut[i].sousArticle){
                list[j]=attribut[i]
                j++
            }
        }
        setAttribut(list);
        axios.get("http://localhost:4000/app/Liste_profiler").then((res)=>{
            const profiler = res.data
            var tab=[{}]
            var k =0
            for(var i=0;i<profiler.length;i++){
                for(var j=0;j<list.length;j++){
                    if(profiler[i].attribut===list[j]._id){
                        tab[k]=profiler[i]
                        k++
                    }

                }
            }
            setProfiler(tab)
        })
        });
      
    } catch (error) {}
  };
  const handleCloseNext = () => {
    setNext(false);
  };

  const ajoutArticle = (e) => {
      
      axios.post("http://localhost:4000/app/Ajout_artciles", {...article, images })
      .then((response) => console.log(response.data));
    setOpen(false);
    e.preventDefault()
  };

  return (
    <div className="Step1_devis">
      {/* <Link to='/'>
          <Button  size='large' variant="contained" color="success"><KeyboardDoubleArrowLeftIcon />RETOUR</Button>
        </Link> */}
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <div className="articles">
        {listeArticle.map((article) => {
          return (
            <div key={article.Nom} className="articles-item">
              <ArticleItem
                article={article}
                deleteArticle={deleteArticle}
                handleOpenArticle={() => handleOpenArticle(article.Nom,article._id)}
                handleCheck={handleCheck}
              />
            </div>
          );
        })}
      </div>
      <table className="table_icons">
        <tbody className="tbody_table_icons" key="icon">
          <tr>
            <td className="td_table_icons"></td>
          </tr>
        </tbody>
      </table>

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
                    value={article.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={ajoutArticle}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Article
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  {" "}
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={handleUpload}
                  />
                </td>
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
        open={openArticle}
        onClose={handleCloseArticle}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={styleArticleDetails}>
          <div className="articleDetails">
            <h1 className="title_Modal">{name}</h1>
            <FormControl fullWidth className="FormControl">
              <InputLabel id="demo-simple-select-label">
                Selectioner un choix
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sousArticle}
                label="choix"
                onChange={handleChangesousArticle}
              >
                {traiterArticle.map((data) => {
                  return (
                    <MenuItem key={data._id} name={data.Nom} value={data._id}>
                      {data.Nom}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <table className="table_Details_Modal">
              <tbody>
                <tr className="tr_table_Details_Modal">
                  <td className="td_table_Details_Modal">
                    <Input
                      placeholder="donner votre largeur"
                      required
                      type="number"
                      inputProps={ariaLabel}
                    />
                  </td>
                  <td className="td_table_Details_Modal">
                    <Input
                      placeholder="donner votre hauteur"
                      type="number"
                      inputProps={ariaLabel}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table_quantite">
              <tbody>
                <tr>
                  <td>
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="quntité"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Button
                      onClick={nextDetails}
                      size="large"
                      variant="contained"
                      color="success"
                    >
                      suivant
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={handleCloseArticle}
                      size="large"
                      variant="contained"
                      color="error"
                    >
                      Fermer
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={Next}
        onClose={handleCloseNext}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={styleArticleDetails}>
          <div>
            <table className="table_next">
              <tbody>
                
                  {attribut.map((data) => {
                    return (
                      <tr key={data._id} >
                       <td className="td_table_next" key={data._id}>{data.Nom}</td>
                       {profiler.map((data)=>{
                        return(
                            <td className="td_table_next" key={data._id}>{data.reference}<Checkbox {...label} /></td>
                        )
                       })} 
                      </tr>
                    );
                  })}
               
              </tbody>
            </table>
            <div className="table_btn_next">
              <table className="table_next">
                <tbody>
                  <tr>
                    <td className="td_table_Details_Modal">
                      <Button size="large" variant="contained" color="success">
                        ajouter au devis
                      </Button>
                    </td>
                    <td className="td_table_Details_Modal">
                      <Button
                        onClick={() => setNext(false)}
                        size="large"
                        variant="contained"
                        color="error"
                      >
                        Fermer
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Step1_devis;
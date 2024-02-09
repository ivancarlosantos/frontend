import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import GridAdopt from "./components/GridAdopt.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1125px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [pets, setPets] = useState([]);
  const [petsAdopt, setPetsAdopt] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pets");
      setPets(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getPetsAdopt = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pets/adopt/sim");
      setPetsAdopt(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getPets();
    getPetsAdopt();
  }, [setPets, setPetsAdopt]);

  return (
    <>
      <Container>
        <Title>Controle de Pets</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPets={getPets} />
        <Grid setOnEdit={setOnEdit} pets={pets} setPets={setPets} />
      </Container>
      <Container>
        <Title>Adotados</Title>
        <GridAdopt setOnEdit={setOnEdit} petsAdopt={petsAdopt} setPetsAdopt={setPetsAdopt} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;

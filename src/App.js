import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [pets, setPets] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pets");
      setPets(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getPets();
  }, [setPets]);

  return (
    <>
      <Container>
        <Title>Controle de Pets</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPets={getPets} />
        <Grid setOnEdit={setOnEdit} pets={pets} setPets={setPets} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;

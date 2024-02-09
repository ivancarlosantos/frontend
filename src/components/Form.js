import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getPets, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const pet = ref.current;

      pet.nome.value = onEdit.nome;
      pet.idade.value = onEdit.idade;
      pet.especie.value = onEdit.especie;
      pet.raca.value = onEdit.raca;
      pet.adotado.value = onEdit.adotado;
      pet.data_adocao.value = onEdit.data_adocao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pet = ref.current;

    if (
      !pet.nome.value ||
      !pet.idade.value ||
      !pet.especie.value ||
      !pet.raca.value ||
      !pet.adotado.value ||
      !pet.data_adocao.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:5000/pets/adopt/" + onEdit.id, {
          nome: pet.nome.value,
          idade: pet.idade.value,
          especie: pet.especie.value,
          raca: pet.raca.value,
          adotado: pet.adotado.value,
          data_adocao: pet.data_adocao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:5000/pets", {
          nome: pet.nome.value,
          idade: pet.idade.value,
          especie: pet.especie.value,
          raca: pet.raca.value,
          adotado: pet.adotado.value,
          data_adocao: pet.data_adocao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    pet.nome.value = "";
    pet.idade.value = "";
    pet.especie.value = "";
    pet.raca.value = "";
    pet.adotado.value = "";
    pet.data_adocao.value = "";

    setOnEdit(null);
    getPets();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input name="idade" />
      </InputArea>
      <InputArea>
        <Label>Espécie</Label>
        <Input name="especie" />
      </InputArea>
      <InputArea>
        <Label>Raça</Label>
        <Input name="raca"/>
      </InputArea>
      <InputArea>
        <Label>Adotado</Label>
        <Input name="adotado" />
      </InputArea>
      <InputArea>
        <Label>Data de Adoção</Label>
        <Input name="data_adocao" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;

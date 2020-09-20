import React, { useState } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";

import Modal from "../../components/Modal/Modal";
import ShowMessage from "../../components/Modal/ShowMessage";
import Loagin from "../../components/Modal/Loading";
import Upload from "../../components/upload/Upload";
import Preview from "../../components/upload/Previewer";
import FieldInput from "./FieldInput";

import api from "../../services/api";

import "./creditform.css";

const PageCreditForm = () => {
  const [values, setValues] = useState({});
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onClickCloseModal = () => {
    setOpenModal(false);
  };

  const onClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setImagePassportOrRg = (file) => {
    const uploadedFiles = setUpload(file);
    setValues((prev) => ({ ...prev, imagePassportOrRg: uploadedFiles }));
  };

  const setImageSelfieWithPassport = (file) => {
    const uploadedFiles = setUpload(file);
    setValues((prev) => ({ ...prev, imageSelfieWithPassport: uploadedFiles }));
  };

  const setUpload = (file) => {
    const uploadedFiles = file.map((info) => ({
      file: info,
      id: uniqueId(),
      name: info.name,
      readableSize: filesize(info.size),
      preview: URL.createObjectURL(info),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    return uploadedFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...values };

    if (data.imagePassportOrRg && data.imageSelfieWithPassport) {
      setLoader(true);
      let formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("socialNetwork", data.socialNetwork);
      formData.append("rg", data.rg);
      formData.append("cpf", data.cpf);
      formData.append("passportNumber", data.passportNumber);
      formData.append("streetOrAvenue", data.streetOrAvenue);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("zipCode", data.zipCode);
      formData.append("country", data.country);
      formData.append("deviceName", data.deviceName);
      formData.append("diviceURL", data.diviceURL);
      formData.append("inputValue", data.inputValue);
      formData.append("numberOfWeeks", data.numberOfWeeks);
      formData.append("ownersAccountName", data.ownersAccountName);
      formData.append("numberAccount", data.numberAccount);
      formData.append("sortCodeAccount", data.sortCodeAccount);
      formData.append("imagePassportOrRg", data.imagePassportOrRg[0].file);
      formData.append(
        "imageSelfieWithPassport",
        data.imageSelfieWithPassport[0].file
      );

      api
        .post("/api/v1/cred/new", formData)
        .then((resp) => {
          setLoader(false);
          onClickOpenModal();
          document.getElementById("credit-form").reset();
          setValues((prev) => ({ ...prev, imagePassportOrRg: false }));
          setValues((prev) => ({ ...prev, imageSelfieWithPassport: false }));
          document.getElementById("fullName").focus();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!data.imagePassportOrRg) {
      window.alert('Foto do "Passaporte ou RG" é obrigatório!');
    } else if (!data.imageSelfieWithPassport) {
      window.alert('Seu "Self com Passaporte" é obrigatório!');
    }

    return null;
  };

  return (
    <section className="credit-form">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          id="credit-form"
          encType="multipart/form-data"
        >
          <fieldset>
            <legend>
              <h2>Crédito NetMore </h2>
            </legend>

            <div className="field-group">
              <FieldInput
                name="fullName"
                onChange={handleChange}
                label="Nome Completo"
              />

              <FieldInput
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                label="Data de Nascimento"
              />
            </div>

            <div className="field-group">
              <FieldInput
                type="email"
                name="email"
                onChange={handleChange}
                label="E-mail"
              />

              <FieldInput
                name="socialNetwork"
                onChange={handleChange}
                label="Instagram (@NomeUsuario) / Facebook"
              />
            </div>

            <div className="field-group">
              <FieldInput
                name="streetOrAvenue"
                onChange={handleChange}
                label="Endereço"
              />
            </div>

            <div className="field-group">
              <FieldInput name="city" onChange={handleChange} label="Cidade" />

              <FieldInput name="state" onChange={handleChange} label="Estado" />
            </div>

            <div className="field-group">
              <FieldInput
                name="zipCode"
                onChange={handleChange}
                label="Código Postal"
              />

              <FieldInput name="country" onChange={handleChange} label="País" />

              <FieldInput
                name="phone"
                onChange={handleChange}
                label="Número Celular"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Documentos </h2>
            </legend>

            <div className="field-group">
              <FieldInput
                name="rg"
                onChange={handleChange}
                label="RG"
                required={false}
              />

              <FieldInput
                name="cpf"
                onChange={handleChange}
                label="CPF"
                required={false}
              />

              <FieldInput
                name="passportNumber"
                onChange={handleChange}
                label="Passaporte"
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="passportOrRgURL">
                  Foto Passaporte / Identidade{" "}
                </label>

                <Upload
                  name="passportOrRgURL"
                  onUpload={setImagePassportOrRg}
                  required={true}
                />
                {values.imagePassportOrRg && (
                  <Preview files={values.imagePassportOrRg} />
                )}
              </div>
              <div className="field">
                <label htmlFor="selfieWithPassportURL">
                  Selfie com Passaporte{" "}
                </label>

                <Upload
                  onUpload={setImageSelfieWithPassport}
                  name="selfieWithPassportURL"
                  required={true}
                />
                {values.imageSelfieWithPassport && (
                  <Preview files={values.imageSelfieWithPassport} />
                )}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Dispositivo</h2>
            </legend>

            <div className="field-group">
              <FieldInput
                name="deviceName"
                onChange={handleChange}
                label="Qual produto será adquirido?"
              />

              <FieldInput
                name="inputValue"
                onChange={handleChange}
                label="Valor da Entrada"
              />

              <FieldInput
                name="numberOfWeeks"
                onChange={handleChange}
                label="Em quantas semanas?"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Informações Bancária</h2>
            </legend>
            <div className="field-group">
              <FieldInput
                name="ownersAccountName"
                onChange={handleChange}
                label="Titular da Conta"
              />

              <FieldInput
                name="numberAccount"
                onChange={handleChange}
                label="Número de Conta"
              />

              <FieldInput
                name="sortCodeAccount"
                onChange={handleChange}
                label="Sort Code"
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="field-group">
              {loader && (
                <Modal isOpen={loader} onClickClose={onClickCloseModal}>
                  <Loagin />
                </Modal>
              )}

              {!loader && (
                <button type="submit" className="button" disabled={loader}>
                  Enviar Proposta
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </div>

      <Modal isOpen={Boolean(openModal)} onClickClose={onClickCloseModal}>
        <ShowMessage
          title="Obrigado!"
          message="Dados Enviados com sucesso!"
          onClickClose={onClickCloseModal}
        />
      </Modal>
    </section>
  );
};

export default PageCreditForm;

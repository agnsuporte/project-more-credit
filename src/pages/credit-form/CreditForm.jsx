import React, { useState } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";

import Modal from "../../components/Modal/Modal";
import ShowMessage from "../../components/Modal/ShowMessage";
import Loagin from "../../components/Modal/Loading";
import Upload from "../../components/upload/Upload";
import Preview from "../../components/upload/Previewer";

// import api from "../../services/api";

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

    setLoader(true);
    const data = { ...values };

    setTimeout(() => {
      console.log(data);
      setLoader(false);
      onClickOpenModal();
      document.getElementById("credit-form").reset();
      setValues((prev) => ({ ...prev, imagePassportOrRg: false }));
      setValues((prev) => ({ ...prev, imageSelfieWithPassport: false }));
      document.getElementById("fullName").focus();
    }, 4000);

    // api
    //   .post("/questionaddress/new", data)
    //   .then((resp) => {
    //     if (!resp.data.error) {
    //       setMessage("Obrigado por participar!");
    //     } else {
    //       setErro(true);
    //     }
    //   })
    //   .catch((err) => {
    //     setErro(true);
    //   });

    return;
  };

  return (
    <section className="credit">
      
      <div className="container">
        <form onSubmit={handleSubmit} id="credit-form" enctype="multipart/form-data">
          <fieldset>
            <legend>
              <h2>Crédito NetMore </h2>
            </legend>

            <div className="field-group">
              <div className="field">
                <label htmlFor="fullName">Nome Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="dateOfBirth">Data de Nascimento</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="socialNetwork">
                  Instagram (@NomeUsuario) / Facebook
                </label>
                <input
                  type="text"
                  name="socialNetwork"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="streetOrAvenue">Endereço</label>
                <input
                  type="text"
                  name="streetOrAvenue"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="zipCode">Código Postal</label>
                <input
                  type="text"
                  name="zipCode"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="country">País</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Número Celular</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Documentos </h2>
            </legend>

            <div className="field-group">
              <div className="field">
                <label htmlFor="rg">RG</label>
                <input type="text" name="rg" onChange={handleChange} />
              </div>

              <div className="field">
                <label htmlFor="cpf">CPF</label>
                <input type="text" name="cpf" onChange={handleChange} />
              </div>

              <div className="field">
                <label htmlFor="passportNumber">Passaporte</label>
                <input
                  type="text"
                  name="passportNumber"
                  onChange={handleChange}
                  required
                />
              </div>
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

                {/* <input
                  className="upload-photo"
                  type="file"
                  name="passportOrRgURL selfieWithPassportURL"
                  accept="image/png, image/jpeg"
                  onChange={handleChange}
                  required
                /> */}
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

                {/* <input
                  className="upload-photo"
                  type="file"
                  name="selfieWithPassportURL"
                  accept="image/png, image/jpeg"
                  onChange={handleChange}
                  required
                /> */}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Dispositivo</h2>
            </legend>

            <div className="field-group">
              <div className="field">
                <label htmlFor="deviceName">Qual produto será adquirido?</label>
                <input
                  type="text"
                  name="deviceName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="inputValue">Valor da Entrada</label>
                <input
                  type="text"
                  name="inputValue"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="numberOfWeeks">Em quantas semanas?</label>
                <input
                  type="text"
                  name="numberOfWeeks"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Informações Bancária</h2>
            </legend>
            <div className="field-group">
              <div className="field">
                <label htmlFor="ownersAccountName">Titular da Conta</label>
                <input
                  type="text"
                  name="ownersAccountName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="numberAccount">Número de Conta</label>
                <input
                  type="text"
                  name="numberAccount"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="sortCodeAccount">Sort Code</label>
                <input
                  type="text"
                  name="sortCodeAccount"
                  onChange={handleChange}
                  required
                />
              </div>
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

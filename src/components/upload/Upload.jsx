import React from "react";
import Dropzone from "react-dropzone";

import "./upload.css";

const renderDragMessage = (isdragactive, isdragreject) => {
  if (!isdragactive) {
    return (
      <p className="UploadMessage" style={{ color: "#999" }}>
        Clique ou Arraste arquivo aqui...
      </p>
    );
  }

  if (isdragreject) {
    return (
      <p className="UploadMessage" style={{ color: "#e57878"}}>
        Arquivo não suportado
      </p>
    );
  }

  return (
    <p className="UploadMessage" style={{ color: "#78e5d5"}}>
      Solte o arquivo aqui
    </p>
  );
};

const Upload = (props) => {
  const { onUpload } = props;

  return (
    <Dropzone accept="image/*" multiple={false} onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div
          className="drop-container" style={{borderColor: ""}}
          {...getRootProps()}
          is-drag-active={isDragActive.toString()}
          is-drag-reject={isDragReject.toString()}
        >
          <input {...getInputProps()}  />
          {renderDragMessage(isDragActive, isDragReject)}
        </div>
      )}
    </Dropzone>
  );
};

export default Upload;



import React from "react";

const Preview = ({ files, onDelete }) => (
  <ul className="ul">
    {files.map((uploadedFile) => (
      <li key={uploadedFile.id}>
        <div className="FileInfo">
          <div
            className="Preview"
            style={{backgroundImage: `url(${uploadedFile.preview})`}}
            src={uploadedFile.preview}
            alt="previwer"
          ></div>
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}{" "}
              {!!uploadedFile.url && (
                <button onClick={() => onDelete(uploadedFile.id)}>
                  Excluir
                </button>
              )}
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default Preview;

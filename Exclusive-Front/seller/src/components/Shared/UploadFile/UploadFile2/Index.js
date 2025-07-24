import React from "react";
import styles from "./styles/styles.module.scss";
import IcUpload from "./assets/images/svgs/ic-upload.svg";
import IcClose from "./assets/images/svgs/ic-close.svg";
import IcError from "./assets/images/svgs/ic-error.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { handleImageLink } from "@/helpers/checkers";

import PdfIcon from "./assets/images/svgs/ic-pdf.svg";
import WordIcon from "./assets/images/svgs/ic-doc.svg";
import ExcelIcon from "./assets/images/svgs/ic-excel.svg";
import PptIcon from "./assets/images/svgs/ic-ppt.svg";
import FileIcon from "./assets/images/svgs/ic-zip.svg";

const UploadFile2 = ({
  handleFileChange,
  selectedFile = {},
  handleRemoveFile,
  register,
  errors,
  name,
}) => {
  const { formatMessage } = useIntl();
  const inputId = `file-${name}`;

  const getFileExtension = (fileName) => {
    return fileName?.split(".").pop()?.toLowerCase();
  };

  const getFileIcon = (selectedFile) => {
    if (!selectedFile) return null;

    const fileName =
      selectedFile.name ||
      selectedFile.file?.name ||
      selectedFile.preview?.split("/").pop();

    if (!fileName) return null;

    const ext = getFileExtension(fileName)?.toLowerCase();

    switch (ext) {
      case "pdf":
        return <PdfIcon />;
      case "doc":
      case "docx":
        return <WordIcon />;
      case "xls":
      case "xlsx":
        return <ExcelIcon />;
      case "ppt":
      case "pptx":
        return <PptIcon />;
      default:
        return null; // أو حط أيقونة افتراضية هنا
    }
  };

  const isImage =
    selectedFile?.file?.type?.startsWith("image") ||
    selectedFile?.preview?.endsWith(".png") ||
    selectedFile?.preview?.endsWith(".jpg") ||
    selectedFile?.preview?.endsWith(".jpeg") ||
    selectedFile?.preview?.endsWith(".webp") ||
    selectedFile?.preview?.endsWith(".gif");
  const hasPreview = selectedFile?.preview || selectedFile?.name;

  return (
    <>
      <div className={styles.uploadFile2}>
        <label htmlFor={inputId}>
          <div className="label">
            <div className="icUploadWrapper">
              <IcUpload className="icUpload" />
            </div>
            <p>
              <FormattedMessage id={name} />
            </p>
          </div>

          <div className="fileWrapper">
            {hasPreview &&
              (isImage ? (
                <img
                  src={handleImageLink(selectedFile?.preview)}
                  alt="uploaded-img"
                  className="img"
                />
              ) : (
                <div className="iconFile">{getFileIcon(selectedFile)}</div>
              ))}

            {hasPreview && (
              <button
                className="btn close"
                type="button"
                onClick={handleRemoveFile}
              >
                <IcClose />
              </button>
            )}
          </div>
        </label>

        <input
          type="file"
          id={inputId}
          accept="
            image/png, image/jpeg, image/jpg, image/webp, image/gif,
            application/pdf, application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.ms-excel,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.ms-powerpoint,
            application/vnd.openxmlformats-officedocument.presentationml.presentation
          "
          {...register(name, {
            required: !hasPreview ? formatMessage({ id: "required" }) : false,
          })}
          onChange={handleFileChange}
        />
      </div>

      {errors?.[name] && (
        <p className="error">
          <IcError />
          {errors[name]?.message}
        </p>
      )}
    </>
  );
};

export default UploadFile2;

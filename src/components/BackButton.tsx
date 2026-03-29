import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <svg
        className={styles.desktopIcon}
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.125 10.5H0.875"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 16.625L0.875 10.5L7 4.375"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className={styles.mobileIcon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.7803 16.5303C13.4874 16.8232 13.0126 16.8232 12.7197 16.5303L8.71967 12.5303C8.42678 12.2374 8.42678 11.7626 8.71967 11.4697L12.7197 7.46967C13.0126 7.17678 13.4874 7.17678 13.7803 7.46967C14.0732 7.76256 14.0732 8.23744 13.7803 8.53033L10.3107 12L13.7803 15.4697C14.0732 15.7626 14.0732 16.2374 13.7803 16.5303Z"
          fill="currentColor"
        />
      </svg>
      <span>Назад</span>
    </button>
  );
};

export default BackButton;

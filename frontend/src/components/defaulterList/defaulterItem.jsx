import styles from "./defaulterItem.module.css";
import { useContext, useState } from "react";
import Button from "../button/button";
import { AuthFetchContext } from "utils/authAxios";

const RemoveDefaulter = ({ id, setData }) => {
  const { authAxios } = useContext(AuthFetchContext);

  const handleDelete = async (e) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete defaulter"
    );

    if (confirmDelete) {
      const { data } = await authAxios.delete(`defaulters/${id}`);
      setData(data);
    }
  };

  return (
    <div className={styles.removeDefaulterLink}>
      <Button onClick={handleDelete} warning value={id}>
        Remove Defaulter
      </Button>
    </div>
  );
};

const DefaulterItem = ({ id, name, telephone, arrears, setData }) => {
  const [copyContactText, setCopyContactText] = useState("copy contact");
  const handleCopytoClipboard = () => {
    navigator.clipboard.writeText(telephone);
    setCopyContactText("copied");
  };
  return (
    <div className={styles.defaulterItemContainer}>
      <div className={styles.name}>{name}</div>
      <div>GHC {arrears}</div>
      <div className={styles.tooltip}>
        <Button primary onClick={handleCopytoClipboard}>
          {copyContactText}
        </Button>
      </div>
      <div className={styles.updateBtn}>
        <Button
          href={`/defaulter/update/${id}`}
          primary
          className={styles.updateBtn}
        >
          Update defaulter
        </Button>
      </div>

      <div>
        <RemoveDefaulter id={id} setData={setData} />
      </div>
    </div>
  );
};

export default DefaulterItem;

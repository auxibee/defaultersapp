import { useParams } from "react-router-dom";
import UpdateDefaulterForm from "../../components/forms/updateDefaulterForm";

const EditDefaulter = () => {
  const { id } = useParams();
  return (
    <div>
      <UpdateDefaulterForm id={id} />
    </div>
  );
};

export default EditDefaulter;

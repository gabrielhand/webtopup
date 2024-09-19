import UbahProfile from "./UbahProfile";
import EditPassword from "./EditPassword";
import { useOutletContext } from "react-router-dom";

const Me = () => {
  const { user, setMsg, setStatusAlert } = useOutletContext();

  return (
    <>
      <UbahProfile
        id={user.id}
        imageUser={user.image}
        nama={user.name}
        username={user.username}
        nomerWa={user.whatsapp}
        setStatusAlert={setStatusAlert}
        setMsg={setMsg}
      />
      <EditPassword setStatusAlert={setStatusAlert} setMsg={setMsg} />
    </>
  );
};

export default Me;

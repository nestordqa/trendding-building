import React from "react";
import { NextPage } from "next";
import BarGraphic from "../graphics/BarGraphic";
import { getUsers } from "@components/utils/users";
import { useQuery } from "react-query";
import { getUser } from "../../../app/types";

const RegisterUser: NextPage = () => {
  const { data: users, isSuccess } = useQuery(["users"], getUsers);

  const fecha = new Date();

  const añoActual = fecha.getFullYear();

  function getRegister() {
    if (isSuccess) {
      const info: number[] = [];
        let registeredCurrentMont: getUser[] = users.filter((usr: getUser) =>
        Number(String(usr.createdAt)[5] + String(usr.createdAt)[6])-1 === fecha.getMonth()
        );
        info.push(registeredCurrentMont.length);

        let registeredCurrentYear: getUser[] = users.filter((usr: getUser) =>
        Number(String(usr.createdAt)[0] + String(usr.createdAt)[1] + String(usr.createdAt)[2] + String(usr.createdAt)[3]) === añoActual

        );
        info.push(registeredCurrentYear.length)

      return info;
    } else {
      return;
    }
  }

  interface Props {
    title: string;
    labelstitle: string;
    datos: number[];
  }

  function createData() {
    const result = getRegister() || [0, 0];

    const data = {
      title: "Usuarios Registrados",
      labelstitle: "Usuarios",
      datos: result,
    };
    return data;
  }
  const data = createData();

  return (
    <div>
      <BarGraphic key={5} {...data} />
    </div>
  );
};

export default RegisterUser;

const { User } = require("../models/models");
const bcrypt = require("bcrypt");
import { v4 as uuidv4 } from "uuid";

export async function registr(req) {
  try {
    const { Name, surName, email, password } = req;
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      const dataError: any = {
        message: "Такой email уже существует",
        status: "error",
      };
      return dataError;
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({
      Name,
      surName,
      email,
      password: hashPassword,
    });
    delete user.dataValues.password;

    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}

interface ISession {
  userId: number;
  isAdmin: boolean | undefined;
}

const sessions: Map<string, ISession> = new Map();

export async function login(req) {
  const { email, password } = req;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const dataError: any = {
      message: "Неверный адрес email",
      status: "error",
    };

    return dataError;
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    const dataError: any = {
      message: "Неверный пароль",
      status: "error",
    };

    return dataError;
  } else {
    const sessionId = uuidv4();
    sessions.set(sessionId, {
      isAdmin: user.role === "ADMIN",
      userId: user.id,
    });

    return sessionId;
  }
}

export function getSession(sessionId: string): ISession | undefined {
  return sessions.get(sessionId);
}

export async function getUser(id: number) {
  try {
    const user = await User.findOne({ where: { id } });

    delete user.dataValues.password;
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export function logout(): any {
  return sessions.clear();
}

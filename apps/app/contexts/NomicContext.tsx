import { NomicClientInterface } from "../models/nomic-client/nomic-client-interface";
import { NomicClient } from "../models/nomic-client/nomic-client";
// import { MockNomicClient } from "../models/nomic-client/mock-nomic-client";

import { createContext } from "react";

const isMock = process.env.NEXT_PUBLIC_APP_ENV === "mock";
// const client = isMock ? new MockNomicClient() : new NomicClient();
const client = new NomicClient();

export const NomicContext = createContext(client as NomicClientInterface);

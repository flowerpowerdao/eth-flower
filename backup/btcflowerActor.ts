import fs from "fs";
import { Actor, HttpAgent } from "@dfinity/agent";

// @ts-ignore
import { idlFactory } from "../declarations/btcflower/btcflower.did.js";
import { _SERVICE } from "../declarations/btcflower/btcflower.did";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";

export let getActor = (
  network: string,
  identity?: Ed25519KeyIdentity | Secp256k1KeyIdentity
) => {
  let host = network == "ic" ? "https://ic0.app" : "http://127.0.0.1:4943";

  let canisterId = "pk6rk-6aaaa-aaaae-qaazq-cai";

  let agent = new HttpAgent({ host, identity });
  if (network == "local") {
    agent.fetchRootKey();
  }

  return Actor.createActor<_SERVICE>(idlFactory, {
    agent: agent,
    canisterId,
  });
};

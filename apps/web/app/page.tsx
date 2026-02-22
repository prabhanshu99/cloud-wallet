"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import axios from "axios";

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/szLu5EQdPmhT1FOEJcBl6BUIbyvFwM55");
const fromPubkey = new PublicKey("9fJdwwrU8VfJf32RYWREFAytKHGVRk8URkHxcoVdbF5z");

export default function Home() {
  async function sendSol(){

    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey:new PublicKey("HJdCZjbvBfPbk89ViDW1ZwA2Za1a6SL5ygaxGdhEXj82"),
      lamports: 0.01 * LAMPORTS_PER_SOL
    })
    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash
    tx.feePayer = fromPubkey

    const serializedix = tx.serialize({
      requireAllSignatures:false,
      verifySignatures:false
    })

    axios.post("http://localhost:3001/api/v1/txn/sign",{
      message: serializedix,
      retry: false
    })


  }

  return (
    <div>
      <input></input>
      <input></input>
      <button onClick={sendSol}></button>
    </div>
  );
}

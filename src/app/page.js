import React from "react";
import Api from "./service/Api";

export default function Home() {

  return (
    <main className="flex h-full w-full flex-col items-center justify-between p-12">
      <h1 className="font-semibold tracking-tighter text-6xl mb-6 text-slate-700">DOGS GALLERY</h1>
      <Api/>
    </main>
  )
}
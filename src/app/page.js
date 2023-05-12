import React from "react";
import Api from "./service/Api";

export default function Home() {

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Api/>
    </main>
  )
}
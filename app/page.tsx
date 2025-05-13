import { Suspense } from "react";
import Otopark from "./components/Otopark";
import Inputs from "./components/Inputs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Suspense fallback={<div>Loading...</div>}>
        <Link href="/log">
          <h1 className="text-3xl text-white text-bold">Logs</h1> 
        </Link>
        <Otopark />
        <Inputs />

        </Suspense>
      </main>   
    </>
  );
}

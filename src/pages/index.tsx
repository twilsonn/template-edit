import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Navigation = dynamic(() => import("@/features/Navigation"), {
  ssr: false,
});
const EditorWindow = dynamic(() => import("@/features/EditorWindow"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>TemplateEdit</title>
        <meta name="description" content="TemplateEdit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-screen w-screen flex flex-col">
          <Suspense fallback="Loading...">
            <Navigation />
            <EditorWindow />
          </Suspense>
        </div>
      </main>
    </>
  );
}

import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Main from "@/layouts/Main.layout";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

const Navigation = dynamic(() => import("@/features/Navigation"), {
  ssr: false,
});

const EditorWindow = dynamic(() => import("@/features/EditorWindow"), {
  ssr: false,
});

const Toaster = dynamic(() => import("@/components/Toaster"), {
  ssr: false,
});

export default function Home({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>TemplateEdit - Editor</title>
      </Head>

      <Toaster position="bottom-right" reverseOrder={false} />

      <Main>
        <div className="h-screen w-screen flex flex-col">
          <Suspense fallback="Loading...">
            <EditorWindow id={id} />
          </Suspense>
        </div>
      </Main>
    </>
  );
}

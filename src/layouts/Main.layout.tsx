import dynamic from "next/dynamic";
import Head from "next/head";

const EditorController = dynamic(() => import("@/features/EditorController"), {
  ssr: false,
});

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="TemplateEdit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex flex-row">
        <div className="flex-grow">
          <div className="px-3 w-full h-16 border-b flex items-center">
            <EditorController />
          </div>

          <div className="flex-1 h-[calc(100%-4rem)]">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Main;

import dynamic from "next/dynamic";
import Head from "next/head";

import {
  DocumentArrowUpIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  HomeModernIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { CopyIcon, PenToSquare } from "@/assets/icons";
import Main from "@/layouts/Main.layout";

const TemplateList = dynamic(() => import("@/features/TemplateList"), {
  ssr: false,
});
const FilesList = dynamic(() => import("@/features/FilesList"), {
  ssr: false,
});
const Toaster = dynamic(() => import("@/components/Toaster"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>TemplateEdit - Home</title>
      </Head>

      <Toaster position="bottom-right" reverseOrder={false} />

      <Main>
        <div className="flex-1 grid grid-cols-5 divide-x h-full">
          <TemplateList />
          <FilesList />
        </div>
      </Main>
    </>
  );
}

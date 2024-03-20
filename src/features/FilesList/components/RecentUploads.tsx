import Button from "@/components/Button";
import CopyText from "@/components/CopyText";
import { filesAtom } from "@/features/FileUpload";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useAtomValue, useSetAtom } from "jotai";
import TimeAgo from "timeago-react";

const RecentUploads = () => {
  const files = useAtomValue(filesAtom);

  return Object.keys(files).length > 0 ? (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>

      <div>
        <ul className="grid grid-cols-2 gap-3">
          {Array.from(Object.values(files))
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .slice(0, 4)
            .map((file) => (
              <li className="flex flex-col" key={file.name + file.createdAt}>
                <div className="mx-2 mt-1 flex flex-row items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      Uploaded at <TimeAgo datetime={file.updatedAt} locale="en-US" />
                    </p>
                  </div>
                  <CopyText text={file.html} message="Copied HTML" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  ) : null;
};

export default RecentUploads;

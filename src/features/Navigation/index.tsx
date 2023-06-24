import { Logo } from "@/assets/icons";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

const Navigation = () => {
  return (
    <div className="h-full w-16 min-w-[4rem] bg-white border-r flex flex-col items-center justify-between">
      <div className="h-20 flex items-center justify-center">
        <Logo className="w-8 h-8 text-blue-500" />
      </div>

      <ul className="pb-4 space-y-4">
        <li>
          <button className="bg-gray-50 p-2 rounded-md">
            <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

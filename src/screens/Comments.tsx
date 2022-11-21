import { useState } from "react";
import { api } from "../services/api";

interface CommentsProps {
  name: string;
  email: string;
  body: string;
}

export function Comments() {
  const [comments, setComments] = useState<CommentsProps[]>([]);

  function getComments(id: string) {
    api
      .get(`/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left border px-4 py-4 border-indigo-500 rounded-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0"></div>
            <div className="sm:min-w-0 sm:flex-1">
              <p className="text-lg font-semibold leading-8 text-white mt-2">
                teste
              </p>
              <p className="mt-2 text-base leading-7 text-gray-300">testando</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

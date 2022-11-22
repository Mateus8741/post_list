import { useEffect, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

interface CommentsProps {
  name: string;
  email: string;
  body: string;
}

export function Comments() {
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [postId, setPostId] = useState<any>([]);

  const { id } = useParams();

  function getComments() {
    api
      .get(`/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(`/posts/${id}`)
      .then((response) => {
        setPostId(response.data);
        console.log("post id", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className=" py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">
            Comentários {id}
          </h2>
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left border px-4 py-4 border-indigo-500 rounded-xl">
          <div className="sm:min-w-0 sm:flex-1">
            <p className="text-lg font-semibold leading-8 text-white ml-1">
              {postId.title}
            </p>
            <div className="flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0 mt-2">
                <HiOutlineLightBulb className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="mt-0.5 text-base leading-7 text-gray-300 ml-4">
                {postId.body}
              </p>
            </div>
            <div className="w-full p-0.5 bg-gray-800 rounded-lg mt-2" />
            <div className="divide-y divide-gray-800">
              {comments.map((comment) => (
                <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left px-4 py-4 divide">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                    <HiOutlineLightBulb
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="sm:min-w-0 sm:flex-1">
                    <p className="text-sm font-semibold leading-8 text-white">
                      {comment.email}
                    </p>
                    <p className="mt-2 text-xs leading-7 text-gray-300">
                      {comment.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-1 md:gap-x-12 md:gap-y-16"></div>
        </div>
      </div>
    </div>
  );
}

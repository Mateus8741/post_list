import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

interface CommentsProps {
  name: string;
  email: string;
  body: string;
}

export function Comments() {
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [postId, setPostId] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/posts/${id}/comments`)
      .then((response) => {
        setLoading(true);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    api
      .get(`/posts/${id}`)
      .then((response) => {
        setPostId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(`/users/${id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-4xl font-semibold leading-8 text-indigo-600 mb-4">
            Comentários
          </h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="mt-20 relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left border px-4 py-4 border-indigo-500 rounded-xl">
            <div className="sm:min-w-0 sm:flex-1">
              <p className="text-lg font-semibold leading-8 text-white ml-1">
                {postId.title}
              </p>
              <div className="flex">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white sm:shrink-0 mt-2 ml-1`}
                >
                  <HiOutlineUserCircle className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-3.5 ml-5 text-base leading-7 text-gray-500">
                  by {users.name}
                </p>
              </div>
              <p className="mt-2 text-base leading-7 text-gray-300 ml-1">
                {postId.body}
              </p>
              <div className="w-full p-0.5 bg-gray-800 rounded-lg mt-2" />
              <div className="divide-y divide-gray-800">
                {comments.map((comment) => (
                  <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left px-4 py-4 divide">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white sm:shrink-0">
                      <HiOutlineUserCircle
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="sm:min-w-0 sm:flex-1">
                      <p className="text-sm font-semibold leading-8 text-white">
                        {comment.email.toLocaleLowerCase()}
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
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { HiOutlineUserCircle, HiArrowRight } from "react-icons/hi2";

import { api } from "../services/api";
import { Loading } from "./Loading";

interface PostProps {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export function Post() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getPosts() {
    await api
      .get("/posts")
      .then((response) => {
        setLoading(true);
        setPosts(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro ao carregar os posts" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-4xl font-semibold leading-8 text-indigo-600">
            Lista de Posts
          </h2>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {loading ? (
              <Loading />
            ) : (
              posts.map((feature) => (
                <div
                  key={feature.id}
                  className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left border px-4 py-4 border-indigo-500 rounded-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white sm:shrink-0">
                    <HiOutlineUserCircle
                      className="h-10 w-10"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="sm:min-w-0 sm:flex-1">
                    <p className="text-lg font-semibold leading-8 text-white mt-2">
                      {feature.title}
                    </p>
                    <p className="mt-2 text-base leading-7 text-gray-300">
                      {feature.body}
                    </p>
                    <button
                      onClick={() => navigate(`/${feature.id}/comments`)}
                      className="flex items-center text-indigo-500 hover:text-indigo-900"
                    >
                      <p className="text-lg leading-8  mt-2">Ver comentários</p>
                      <HiArrowRight
                        className="h-5 w-5 mt-2 ml-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

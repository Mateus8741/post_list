import { useEffect, useState } from "react";

import { HiOutlineLightBulb, HiArrowDown } from "react-icons/hi2";

import { api } from "../services/api";
import { Modal } from "./Modal";

interface PostProps {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export function Post() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [showModal, setShowModal] = useState(false);

  function handleOnClose() {
    setShowModal(false);
  }

  async function getPosts() {
    await api
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro ao carregar os posts" + err);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">
            Transactions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A better way to send money
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {posts.map((feature) => (
              <div
                key={feature.id}
                className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row text-left border px-4 py-4 border-indigo-500 rounded-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <HiOutlineLightBulb className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-white mt-2">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-300">
                    {feature.body}
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="flex items-center text-indigo-500 hover:text-indigo-900"
                  >
                    <HiArrowDown
                      className="h-5 w-5 mt-2 mr-1"
                      aria-hidden="true"
                    />
                    <p className="text-lg leading-8  mt-2">Ver comentários</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal onClose={handleOnClose} visible={showModal} />
    </div>
  );
}

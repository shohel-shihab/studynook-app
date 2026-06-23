"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const authors = [
  {
    id: 1,
    name: "Guy Hawkins",
    books: 12,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
  },
  {
    id: 2,
    name: "Esther Howard",
    books: 10,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
  },
  {
    id: 3,
    name: "Shikhon Islam",
    books: 7,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
  },
  {
    id: 4,
    name: "Kawser Ahmed",
    books: 4,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
  },
  {
    id: 5,
    name: "Brooklyn Simmons",
    books: 15,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
  },
  {
    id: 6,
    name: "Leslie Alexander",
    books: 5,
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500",
  },
];

export default function FeaturedAuthors() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Featured Authors
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
            Meet the talented writers whose books inspire readers
            around the world and enrich our library collection.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {authors.map((author) => (
            <SwiperSlide key={author.id}>
              <div className="group rounded-lg bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Author Image */}
                <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
                  {/* Laurel */}
                  <div className="absolute inset-0 flex items-center justify-center text-7xl text-amber-500">
                    🏆
                  </div>

                  <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 rounded-xl border-2 border-dashed border-cyan-700 p-5 text-center">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {author.name}
                  </h3>

                  <p className="mt-3 text-slate-500">
                    {author.books.toString().padStart(2, "0")} Published Books
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
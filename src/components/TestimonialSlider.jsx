"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        city: "Book Club Member",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
        review:
            "This library has completely changed my reading habits. The collection is vast, the atmosphere is peaceful, and I always discover new books to enjoy.",
    },
    {
        id: 2,
        name: "Michael Carter",
        city: "Regular Reader",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
        review:
            "Finding rare novels and academic resources has never been easier. The staff recommendations are always spot on and incredibly helpful.",
    },
    {
        id: 3,
        name: "Emma Williams",
        city: "Student Researcher",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
        review:
            "A perfect place for studying and research. The quiet reading spaces and extensive digital resources make learning enjoyable.",
    },
    {
        id: 4,
        name: "David Thompson",
        city: "Literature Enthusiast",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
        review:
            "The curated book collections and community events create an amazing experience for anyone passionate about reading.",
    },
];

const TestimonialSlider = () => {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                        Reader Reviews
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                        What Our Readers Say
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                        Discover why thousands of readers trust our library and bookstore
                        for their reading journey.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-16"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="group">
                                {/* Review Card */}
                                <div className="rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                    {/* Stars */}
                                    <div className="mb-6 flex justify-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="text-xl text-amber-400"
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <p className="leading-8 text-slate-500">
                                        {item.review}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="mt-8 text-center">
                                    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-3xl font-bold text-slate-900">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 text-lg text-orange-500">
                                        {item.city}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default TestimonialSlider

"use client";

import Slider from "@/components/slider/Slider";

type Slide = {
	large: string;
	small?: string;
	img: string;
};

const slides: Slide[] = [
	{
		large: "lorem",
		small: "ipsum",
		img: "/images/1.jpg",
	},
	{
		large: "lorem",
		small: "ipsum",
		img: "/images/2.jpg",
	},
	{
		large: "lorem",
		small: "ipsum",
		img: "/images/3.jpg",
	},
	{
		large: "lorem",
		small: "ipsum",
		img: "/images/4.jpg",
	},
	{
		large: "lorem",
		small: "ipsum",
		img: "/images/5.jpg",
	},
];

export default function Home() {
	return (
		<div>
			<div className="snap-y w-screen h-screen overflow-x-auto snap-mandatory">
				<div className="snap-start bg-red-100 h-screen w-screen  items-center justify-center text-5xl">
					<Slider slides={slides} />
				</div>
				<div className="snap-start bg-yellow-100 h-screen w-screen flex items-center justify-center text-5xl"></div>
				<div className="snap-start bg-green-100 h-screen w-screen flex items-center justify-center text-5xl">
					2
				</div>
				<div className="snap-start bg-blue-100 h-screen w-screen flex items-center justify-center text-5xl">
					3
				</div>
			</div>
		</div>
	);
}

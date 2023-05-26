import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

type Slide = {
	large: string;
	small?: string;
	img: string;
};

type SliderProps = {
	slides: Slide[];
};

const Slider: React.FC<SliderProps> = ({ slides }) => {
	const IMAGE_PARTS = 4;
	const AUTOCHANGE_TIME = 4000;

	const [activeSlide, setActiveSlide] = useState<number>(-1);
	const [prevSlide, setPrevSlide] = useState<number>(-1);
	const [sliderReady, setSliderReady] = useState<boolean>(false);
	const changeTORef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		runAutochangeTO();
		setTimeout(() => {
			setActiveSlide(0);
			setSliderReady(true);
		}, 0);

		return () => {
			if (changeTORef.current) {
				clearTimeout(changeTORef.current);
			}
		};
	}, []);

	const runAutochangeTO = () => {
		changeTORef.current = setTimeout(() => {
			changeSlides(1);
			runAutochangeTO();
		}, AUTOCHANGE_TIME);
	};

	const changeSlides = (change: number) => {
		if (changeTORef.current) {
			clearTimeout(changeTORef.current);
		}
		const length = slides.length;
		const prevSlideValue = activeSlide;
		let activeSlideValue = prevSlideValue + change;
		if (activeSlideValue < 0) activeSlideValue = length - 1;
		if (activeSlideValue >= length) activeSlideValue = 0;
		setActiveSlide(activeSlideValue);
		setPrevSlide(prevSlideValue);
	};

	return (
		<div className={`slider ${sliderReady ? "s--ready" : ""}`}>
			<p className="slider__top-heading">German Polymers</p>
			<div className="slider__slides">
				{slides.map((slide, index) => (
					<div
						className={`slider__slide ${
							activeSlide === index ? "s--active" : ""
						} ${prevSlide === index ? "s--prev" : ""}`}
						key={slide.large}
					>
						<div className="slider__slide-content">
							<h3 className="slider__slide-subheading">
								{slide.small || slide.large}
							</h3>
							<h2 className="slider__slide-heading">
								{slide.large.split("").map((l, i) => (
									<span key={i}>{l}</span>
								))}
							</h2>
						</div>
						<div className="slider__slide-parts">
							{[...Array(IMAGE_PARTS)].map((x, i) => (
								<div className="slider__slide-part" key={i}>
									<div
										className="slider__slide-part-inner"
										style={{
											backgroundImage: `url(${slide.img})`,
										}}
									/>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="slider__control" onClick={() => changeSlides(-1)} />
			<div
				className="slider__control slider__control--right"
				onClick={() => changeSlides(1)}
			/>
		</div>
	);
};

export default Slider;

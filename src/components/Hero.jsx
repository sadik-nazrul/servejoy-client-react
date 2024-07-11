
const Hero = ({image, title, subtitle}) => {
    return (
        <div className="container px-6 py-16 mx-auto">
            <div className="items-center lg:flex">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg space-y-4">
                        <h1 className="lg:text-maintitledex text-maintitlemob font-title dark:text-white lg:leading-[60px]">{title}</h1>

                        <p className="lg:text-paragraphdex text-paragraphmob text-gray-500">{subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <img className="shadow-inner rounded-xl w-full h-full lg:max-w-3xl" src={image} alt="Catalogue-pana.svg" />
                </div>
            </div>
        </div>

    );
};

export default Hero;

'use client'
import autoPlay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselItem,
    CarouselSlides,
} from 'keep-react'
import Hero from './Hero'
import img1 from '../assets/volunteer-banner.jpeg'
import img2 from '../assets/volunteer-banner2.jpg'
import img3 from '../assets/volunteer-banner3.jpeg'

export const CarouselComponent = () => {
    return (
        <Carousel options={{ loop: true }} plugins={[autoPlay()]}>
            <CarouselSlides>
                <CarouselItem>
                    <Hero image={img1} title={"Let's come Be part of changes"} subtitle={"Join us in creating impactful change through dedicated volunteer work and community service."} />
                </CarouselItem>

                <CarouselItem>
                    <Hero image={img2} title={"Join Hands to Make a Difference"} subtitle={"Unite with us to make a meaningful impact through volunteerism and collective effort."} />
                </CarouselItem>

                <CarouselItem>
                    <Hero image={img3} title={"Together, We Can Transform Lives"} subtitle={"Collaborate with our community to create lasting change through dedicated service."} />
                </CarouselItem>
            </CarouselSlides>
        </Carousel>
    )
}

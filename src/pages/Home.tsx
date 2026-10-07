import { About } from '../sections/About'
import { Accommodations } from '../sections/Accommodations'
import { Facilities } from '../sections/Facilities'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { HowToGet } from '../sections/HowToGet'
import { Policies } from '../sections/Policies'
import { Reviews } from '../sections/Reviews'
import { Valley } from '../sections/Valley'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Accommodations />
      <Facilities />
      <Valley />
      <HowToGet />
      <Reviews />
      <Policies />
      <Faq />
    </>
  )
}

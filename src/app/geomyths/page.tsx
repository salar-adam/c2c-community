
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FlaskConical } from "lucide-react"

const myths = [
  {
    id: "myth-1",
    question: "Myth: Volcanoes emit more CO2 than humans.",
    answer: "Fact: While volcanoes do release carbon dioxide, human activities release an estimated 100 times more CO2 per year. The global volcanic CO2 emission is about 200 million tons per year, whereas human activities emit around 24 billion tons per year.",
  },
  {
    id: "myth-2",
    question: "Myth: Earthquakes can be predicted.",
    answer: "Fact: Scientists cannot predict the exact time, location, and magnitude of future earthquakes. They can, however, make long-term forecasts about the probability of an earthquake in a specific area over a period of years or decades based on seismic activity and fault studies.",
  },
  {
    id: "myth-3",
    question: "Myth: Geologists only work with oil and gas companies.",
    answer: "Fact: Geology is a broad field with diverse career paths. Geologists work in environmental protection, water resource management, natural hazard mitigation, planetary science (astrogeology), civil engineering, mining, and education.",
  },
  {
    id: "myth-4",
    question: "Myth: Diamonds come from coal.",
    answer: "Fact: This is a common misconception. Diamonds are formed deep within the Earth's mantle under extreme heat and pressure and are brought to the surface by deep-source volcanic eruptions. They are much older than the plant matter that forms coal.",
  },
  {
    id: "myth-5",
    question: "Myth: Pangea was the Earth's only supercontinent.",
    answer: "Fact: Pangea is the most famous supercontinent, but it wasn't the first. Geologists have evidence for several previous supercontinents, including Rodinia (formed about 1 billion years ago) and Columbia/Nuna (formed about 1.8 billion years ago). The Earth's continents are in a constant cycle of coming together and breaking apart.",
  },
  {
    id: "myth-6",
    question: "Myth: Meteorites are always hot when they land.",
    answer: "Fact: While meteorites are heated by atmospheric friction, the intense heat ablates (burns off) the outer layers. The journey through the cold upper atmosphere is rapid, and the interior of the rock remains freezing cold from its time in space. Many freshly fallen meteorites are found covered in frost.",
  },
  {
    id: "myth-7",
    question: "Myth: The Grand Canyon was carved in a few thousand years by the Great Flood.",
    answer: "Fact: The geological evidence is overwhelming that the Grand Canyon was carved by the Colorado River over a period of 5 to 6 million years. The layers of rock exposed in the canyon walls represent nearly 2 billion years of Earth's history, and their formation and erosion are explained by well-understood geological processes, not a single catastrophic event.",
  },
  {
    id: "myth-8",
    question: "Myth: Glass is a slow-moving liquid.",
    answer: "Fact: While old church windowpanes are sometimes thicker at the bottom, this is due to imperfect manufacturing processes of the past, not because the glass has flowed downwards over centuries. At room temperature, glass is a true amorphous solid. It doesn't flow, even over geological timescales.",
  },
  {
    id: "myth-9",
    question: "Myth: Lightning never strikes the same place twice.",
    answer: "Fact: Lightning often strikes the same place repeatedly, especially tall, conductive objects like skyscrapers (the Empire State Building is hit about 23 times a year), mountains, or specific geological formations. The probability is simply higher for certain locations.",
  },
  {
    id: "myth-10",
    question: "Myth: All deserts are hot and sandy.",
    answer: "Fact: A desert is defined by its lack of precipitation, not its temperature. The largest desert in the world is actually the Antarctic Polar Desert, a cold desert. Deserts can be rocky, icy, or mountainous, and sandy areas (ergs) make up only about 20% of the world's deserts.",
  },
  {
    id: "myth-11",
    question: "Myth: The Earth is a perfect sphere.",
    answer: "Fact: The Earth is an oblate spheroid. Due to its rotation, it bulges at the equator and is slightly flattened at the poles. The diameter at the equator is about 43 kilometers (27 miles) larger than the pole-to-pole diameter.",
  },
  {
    id: "myth-12",
    question: "Myth: Gold is only found in large nuggets.",
    answer: "Fact: While large gold nuggets are famous, most of the world's gold is found as microscopic particles, often disseminated within rock (like quartz) or mixed with other minerals. Discovering a large nugget is an extremely rare event.",
  },
  {
    id: "myth-13",
    question: "Myth: You can find water by dowsing with a forked stick.",
    answer: "Fact: There is no scientific evidence to support water dowsing. Numerous controlled studies have shown that dowsers' success rates are no better than random chance. Hydrogeologists use scientific methods, such as studying rock formations and using geophysical surveys, to locate groundwater.",
  },
  {
    id: "myth-14",
    question: "Myth: The Earth's core is solid iron.",
    answer: "Fact: The Earth's core has two parts: a solid inner core and a liquid outer core. The inner core is a solid ball of an iron-nickel alloy, while the outer core is a molten layer of the same metals. The movement of this liquid outer core is what generates the Earth's magnetic field.",
  },
  {
    id: "myth-15",
    question: "Myth: All radiation is man-made and dangerous.",
    answer: "Fact: The Earth is naturally radioactive. Background radiation comes from cosmic rays from space and the natural decay of radioactive elements in rocks and soil (like uranium and thorium). This natural radiation accounts for the majority of the average person's annual exposure.",
  },
  {
    id: "myth-16",
    question: "Myth: Earth's magnetic poles are fixed.",
    answer: "Fact: The magnetic poles are constantly wandering. Furthermore, geological evidence in rocks shows that the Earth's magnetic field has completely flipped its polarity hundreds of times over its history. These magnetic reversals are a normal, albeit slow, geological process.",
  },
    {
    id: "myth-17",
    question: "Myth: Seafloor spreading is pushing the continents apart at a rapid rate.",
    answer: "Fact: While seafloor spreading is a key mechanism of plate tectonics, it's a very slow process. The average rate is comparable to the speed at which fingernails grow, typically a few centimeters per year. It is not a rapid, dramatic push but a slow, steady geological force.",
  },
  {
    id: "myth-18",
    question: "Myth: Quicksand pulls you under.",
    answer: "Fact: Quicksand is just ordinary sand that has been oversaturated with water, creating a liquefied soil. Humans are less dense than quicksand, so you would float on it rather than being pulled under. The danger comes from struggling, which can cause you to sink further, and the difficulty of extraction.",
  },
  {
    id: "myth-19",
    question: "Myth: Fossils are the actual bones of dinosaurs.",
    answer: "Fact: Fossils are not bones but are mineralized replicas. Over millions of years, the organic material of the bone dissolves and is replaced by minerals from groundwater, a process called permineralization. This creates a rock-like cast of the original bone.",
  },
  {
    id: "myth-20",
    question: "Myth: The Ice Age was a single, continuous period of cold.",
    answer: "Fact: The most recent Ice Age, the Pleistocene Epoch, was characterized by multiple cycles of advancing and retreating ice sheets, known as glacial and interglacial periods. We are currently in an interglacial period within the larger Quaternary Ice Age.",
  },
  {
    id: "myth-21",
    question: "Myth: Mountains are permanent, unchanging features of the landscape.",
    answer: "Fact: Mountains are constantly changing. Tectonic forces push them upwards, while erosion from wind, water, and ice wears them down. The Appalachian Mountains, for example, were once as tall as the Himalayas but have been eroded over hundreds of millions of years.",
  },
  {
    id: "myth-22",
    question: "Myth: Oil is composed of decayed dinosaurs.",
    answer: "Fact: This is a popular cartoon trope but is incorrect. Petroleum (oil and natural gas) is primarily formed from the remains of ancient marine organisms, like algae and plankton, that were buried in seabeds millions of years ago and subjected to heat and pressure.",
  },
  {
    id: "myth-23",
    question: "Myth: All rocks are hard and strong.",
    answer: "Fact: The hardness of rocks varies greatly. While rocks like granite and quartzite are very hard, others like shale, soapstone, or talc are very soft and can be scratched with a fingernail. Hardness is a key diagnostic property for geologists.",
  },
  {
    id: "myth-24",
    question: "Myth: Tsunamis are just giant waves, like you see at the beach.",
    answer: "Fact: A tsunami is not a single breaking wave but a series of waves with a very long wavelength, often called a wave train. In the open ocean, it might not even be noticeable. Its destructive power is unleashed as it approaches shallow water, causing a rapid rise in sea level over a large area, more like a fast-moving tide than a wind-driven wave.",
  },
    {
    id: "myth-25",
    question: "Myth: Water spirals down drains differently in the Northern and Southern Hemispheres due to the Coriolis effect.",
    answer: "Fact: The Coriolis effect is real and affects large-scale systems like hurricanes, but it's far too weak to influence the direction of water in a sink or toilet. The direction is determined by the shape of the basin and other minor variables, not the Earth's rotation.",
  },
  {
    id: "myth-26",
    question: "Myth: The seasons are caused by the Earth being closer to the Sun.",
    answer: "Fact: The seasons are caused by the 23.5-degree tilt of the Earth's axis. When a hemisphere is tilted toward the Sun, it receives more direct sunlight, experiencing summer. The Earth is actually closest to the Sun in early January, during the Northern Hemisphere's winter.",
  },
  {
    id: "myth-27",
    question: "Myth: All caves are formed by underground rivers.",
    answer: "Fact: While many caves (karst caves) are formed by water dissolving limestone, other types exist. Lava tubes are formed by flowing lava, sea caves are carved by waves, and talus caves are spaces between boulders in a rockfall.",
  },
  {
    id: "myth-28",
    question: "Myth: Geysers shoot out boiling water.",
    answer: "Fact: The water in a geyser's eruption is hot, but it's often superheated, meaning it's hotter than the normal boiling point. The immense pressure underground prevents it from boiling. As the water rises and pressure drops, it flashes into steam, causing the eruption.",
  },
  {
    id: "myth-29",
    question: "Myth: The continents float on a sea of molten magma.",
    answer: "Fact: The continents (lithosphere) float on the asthenosphere, which is not fully molten. It's a solid but ductile (plastically flowing) layer of the upper mantle. Think of it more like very thick, hot tar or silly putty rather than a liquid ocean.",
  },
  {
    id: "myth-30",
    question: "Myth: You can outrun a pyroclastic flow.",
    answer: "Fact: You cannot outrun a pyroclastic flow. These are fast-moving currents of hot gas and volcanic matter that can reach speeds of up to 700 km/h (450 mph) and temperatures of up to 1,000 °C (1,830 °F). They are one of the most dangerous volcanic hazards.",
  },
  {
    id: "myth-31",
    question: "Myth: California will one day fall into the ocean.",
    answer: "Fact: The San Andreas Fault is a transform fault, where the Pacific Plate is sliding horizontally past the North American Plate. It is not a subduction zone where one plate goes under another. Los Angeles is slowly moving northwest towards San Francisco, but it will not fall into the sea.",
  },
  {
    id: "myth-32",
    question: "Myth: An earthquake of a certain magnitude releases a specific amount of energy.",
    answer: "Fact: The moment magnitude scale is logarithmic. For each whole number you go up on the scale, the seismic energy released increases by about 32 times. So, a magnitude 7.0 earthquake releases about 32 times more energy than a 6.0 and over 1,000 times more than a 5.0.",
  },
  {
    id: "myth-33",
    question: "Myth: The Earth is a solid ball of rock.",
    answer: "Fact: The Earth has a complex layered structure. It includes a liquid outer core made of iron and nickel, a solid inner core, a semi-molten mantle on which tectonic plates float, and finally the crust. It's far from being solid all the way through.",
  },
  {
    id: "myth-34",
    question: "Myth: Meteorites are easy to find because they're all magnetic.",
    answer: "Fact: While many meteorites, especially iron meteorites, are magnetic, stony meteorites (the most common type) are only weakly magnetic or not at all. Also, many terrestrial (Earth) rocks are magnetic, so a magnet is not a foolproof test for identifying meteorites.",
  },
  {
    id: "myth-35",
    question: "Myth: All fossils are from dinosaurs.",
    answer: "Fact: Fossils preserve the history of all life on Earth, not just dinosaurs. The fossil record is rich with plants, insects, fish, shells (like ammonites), and countless other mammals and invertebrates from every geological era.",
  },
  {
    id: "myth-36",
    question: "Myth: The Bermuda Triangle's mysteries are due to geologic anomalies.",
    answer: "Fact: Scientific investigations, including those by the U.S. Coast Guard and NOAA, have found no evidence of unusual geological or magnetic phenomena. The 'mysteries' are a combination of fiction, exaggeration, and the natural dangers of a high-traffic area prone to hurricanes.",
  },
  {
    id: "myth-37",
    question: "Myth: Oil is found in large underground pools or caverns.",
    answer: "Fact: This is a common image, but it's incorrect. Oil and natural gas are typically trapped within the tiny pore spaces of rocks like sandstone, limestone, or shale. The rock acts like a sponge, holding the hydrocarbons within its matrix.",
  },
  {
    id: "myth-38",
    question: "Myth: The Earth's crust is a single, solid shell.",
    answer: "Fact: The crust (the lithosphere) is broken into a mosaic of large tectonic plates. These plates are in constant, slow motion, grinding past each other, colliding, or pulling apart. This movement is the primary driver for earthquakes, volcanoes, and mountain formation.",
  },
  {
    id: "myth-39",
    question: "Myth: You can tell a diamond is real if it scratches glass.",
    answer: "Fact: While diamonds can easily scratch glass, so can many other materials. Quartz, a very common mineral, is harder than most glass. Using this test alone could lead you to believe a piece of quartz is a diamond. Gemologists use a combination of tests, including thermal conductivity, to identify diamonds.",
  },
  {
    id: "myth-40",
    question: "Myth: Geologic time is just a theory, and the Earth is a few thousand years old.",
    answer: "Fact: Multiple, independent lines of scientific evidence confirm the Earth's vast age. Radiometric dating of rocks (like Uranium-Lead dating), analysis of glacial ice cores, tree ring data, and the observable layers in geology all consistently point to an Earth that is approximately 4.5 billion years old.",
  },
]

export default function GeoMythsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FlaskConical className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">GeoMyth Busters</h1>
          <p className="text-muted-foreground">
            Debunking common misconceptions in geoscience with facts.
          </p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {myths.map((myth) => (
          <AccordionItem key={myth.id} value={myth.id}>
            <AccordionTrigger className="text-left hover:no-underline">
              {myth.question}
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
              {myth.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

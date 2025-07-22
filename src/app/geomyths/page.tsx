
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
  {
    id: "myth-41",
    question: "Myth: The Earth is mostly hollow or has a large inner sun.",
    answer: "Fact: This idea, popular in fiction, is completely false. Seismic data from earthquakes passing through the Earth clearly shows a solid inner core and a liquid outer core, with a dense mantle and crust. There are no large voids within the Earth.",
  },
  {
    id: "myth-42",
    question: "Myth: All gemstones are rare and valuable.",
    answer: "Fact: Many gemstones, like amethyst and citrine (varieties of quartz), are quite common and affordable. The value of a gemstone depends on the 4 Cs: color, clarity, cut, and carat weight, as well as its rarity.",
  },
  {
    id: "myth-43",
    question: "Myth: A '100-year flood' only happens once every 100 years.",
    answer: "Fact: The term '100-year flood' is a statistical designation meaning there is a 1% chance of a flood of that magnitude occurring in any given year. It's entirely possible for two such floods to happen in consecutive years, or even in the same year.",
  },
  {
    id: "myth-44",
    question: "Myth: Rocks are permanent and never change.",
    answer: "Fact: The rock cycle describes how rocks are constantly changing form. Igneous rocks can be weathered into sediment to form sedimentary rocks, which can then be subducted and metamorphosed into metamorphic rocks, which could eventually melt and become magma again. It's a slow but continuous process.",
  },
  {
    id: "myth-45",
    question: "Myth: Volcanoes are only found in hot climates.",
    answer: "Fact: Volcanoes are found on every continent, including Antarctica. Mount Erebus is a famous active volcano in Antarctica. Volcanism is related to plate tectonics and mantle plumes, not surface climate.",
  },
  {
    id: "myth-46",
    question: "Myth: The sound of an earthquake is the ground rumbling.",
    answer: "Fact: Earthquakes themselves don't make sound in the way we typically think of it. The sound people hear is the result of seismic waves causing buildings and other objects on the surface to vibrate and create sound waves in the air.",
  },
  {
    id: "myth-47",
    question: "Myth: The most dangerous fault is the one that creates the biggest earthquakes.",
    answer: "Fact: While large magnitude is dangerous, the actual risk depends on many factors, including the proximity of the fault to populated areas, the local geology (which can amplify shaking), and the construction standards of buildings. A smaller earthquake on a fault under a major city can be far more devastating than a giant one in a remote area.",
  },
  {
    id: "myth-48",
    question: "Myth: Petrified wood is wood that has turned to stone.",
    answer: "Fact: Petrified wood is a fossil. The process of petrification involves the organic matter of the wood being replaced by minerals over millions of years, while retaining the original cellular structure of the wood. It's a mineral cast of the original wood, not the wood itself.",
  },
  {
    id: "myth-49",
    question: "Myth: Plate tectonics is just a theory, not a fact.",
    answer: "Fact: In science, a theory is a well-substantiated explanation of some aspect of the natural world, based on a body of facts that have been repeatedly confirmed through observation and experiment. Plate tectonics is the unifying theory of geology, supported by overwhelming evidence from GPS measurements, seafloor mapping, earthquake distribution, and more.",
  },
  {
    id: "myth-50",
    question: "Myth: You can tell the weather by looking at rocks.",
    answer: "Fact: While some rocks might feel damp in humid weather, they are not reliable weather indicators. 'Weather rocks' sold in souvenir shops are a novelty. For accurate forecasts, rely on meteorological science and instruments.",
  },
  {
    id: "myth-51",
    question: "Myth: All meteorites create massive craters.",
    answer: "Fact: The vast majority of meteorites are small and slow down significantly due to atmospheric drag, often causing little to no cratering. Large, impact-crater-forming events are exceptionally rare. Many meteorites found are just small stones sitting on the surface.",
  },
  {
    id: "myth-52",
    question: "Myth: The Earth's poles have always been covered in ice.",
    answer: "Fact: The Earth has gone through long periods with no polar ice caps at all. During the Mesozoic Era (the age of dinosaurs), the climate was much warmer globally, and even the polar regions were home to forests and dinosaurs.",
  },
  {
    id: "myth-53",
    question: "Myth: Fracking causes most of the earthquakes felt by people.",
    answer: "Fact: The process of hydraulic fracturing itself rarely causes felt seismic events. However, the disposal of wastewater from fracking and other industrial processes by injecting it deep underground has been linked to an increase in induced seismicity in certain regions.",
  },
  {
    id: "myth-54",
    question: "Myth: The ocean is blue because it reflects the sky.",
    answer: "Fact: While some of the ocean's color comes from sky reflection, its intrinsic color is blue. Water preferentially absorbs longer wavelengths of light (reds, oranges, yellows) and scatters shorter wavelengths (blues), so when sunlight penetrates deep into clean water, blue light is scattered back to the observer.",
  },
  {
    id: "myth-55",
    question: "Myth: Geothermal energy is a new, untested technology.",
    answer: "Fact: Geothermal power has been used for over a century. The first geothermal power plant was built in Larderello, Italy, in 1904. It's a well-established technology that harnesses the natural heat of the Earth's interior.",
  },
  {
    id: "myth-56",
    question: "Myth: You must have a geology degree to be a rockhound.",
    answer: "Fact: Rockhounding (amateur geology) is a popular hobby for people of all backgrounds. With a good field guide, respect for land access rules, and a sense of curiosity, anyone can enjoy collecting rocks, minerals, and fossils.",
  },
  {
    id: "myth-57",
    question: "Myth: An active volcano is always smoking.",
    answer: "Fact: A volcano can be active, meaning it is expected to erupt again, without constantly emitting steam or gas (smoking). Many active volcanoes have long periods of quiet. The 'smoke' is typically steam and other volcanic gases, and its presence or absence is not a definitive sign of an imminent eruption.",
  },
  {
    id: "myth-58",
    question: "Myth: All crystals are perfectly formed and symmetrical.",
    answer: "Fact: The beautifully symmetrical crystals seen in museums are rare. In nature, crystals often grow in crowded, confined spaces, resulting in distorted or incomplete shapes. A perfect crystal form requires unrestricted growth, which is not common in geological environments.",
  },
  {
    id: "myth-59",
    question: "Myth: Standing in a doorway is the safest place during an earthquake.",
    answer: "Fact: This is outdated advice from the days of unreinforced masonry buildings. In modern homes, doorways are not stronger than other parts of the house. The safest action is to 'Drop, Cover, and Hold On' under a sturdy piece of furniture like a table or desk.",
  },
  {
    id: "myth-60",
    question: "Myth: Beach sand is made of tiny, ground-up seashells.",
    answer: "Fact: While some tropical white sand beaches are composed of eroded coral and shells (calcium carbonate), most of the world's beach sand is made of quartz. This durable mineral survives erosion and transportation by rivers from inland mountains to the coast.",
  },
  {
    id: "myth-61",
    question: "Myth: The Earth's magnetic field protects us from asteroids.",
    answer: "Fact: The magnetic field (magnetosphere) protects us from the solar wind and charged cosmic particles. It has no effect on the trajectory of asteroids or meteoroids, which are non-charged bodies governed by gravity.",
  },
  {
    id: "myth-62",
    question: "Myth: Natural gas is a 'clean' energy source with no environmental impact.",
    answer: "Fact: While natural gas burns cleaner than coal, releasing less CO2, it is primarily methane, a potent greenhouse gas. Methane can leak during extraction, transport, and use, contributing significantly to global warming. The extraction process (fracking) also has its own environmental concerns.",
  },
  {
    id: "myth-63",
    question: "Myth: A scientific 'law' is absolute and can never be changed.",
    answer: "Fact: A scientific law is a description of an observed phenomenon, often expressed mathematically (e.g., the law of gravity). It doesn't explain *why* it exists. A theory, on the other hand, is the explanation. Laws can be refined or modified if new data shows they don't hold true under all conditions.",
  },
  {
    id: "myth-64",
    question: "Myth: Jade is a single type of mineral.",
    answer: "Fact: 'Jade' is actually a name for two different silicate minerals: nephrite (a variety of amphibole) and jadeite (a pyroxene). Both are extremely tough and have been prized for carving for centuries, but they have different chemical compositions and crystal structures.",
  },
  {
    id: "myth-65",
    question: "Myth: Continental drift and plate tectonics are the same thing.",
    answer: "Fact: Continental drift was an early hypothesis by Alfred Wegener that the continents moved over time, but he couldn't explain how. Plate tectonics is the well-supported scientific theory that explains *how* they move: the Earth's lithosphere is broken into plates that move on the asthenosphere, driven by convection currents in the mantle.",
  },
  {
    id: "myth-66",
    question: "Myth: The center of the Earth is incredibly hot, liquid magma.",
    answer: "Fact: While the core is incredibly hot, the inner core is solid due to immense pressure, despite being hotter than the liquid outer core. Magma is molten rock found in the mantle and crust, not the core, which is made of an iron-nickel alloy.",
  },
  {
    id: "myth-67",
    question: "Myth: If you fall into a volcano, you'll sink into lava like it's water.",
    answer: "Fact: Lava is molten rock and is extremely dense, much denser than a human body. You would not sink. Instead, you would stay on the surface of the lava flow, where you would unfortunately be incinerated instantly due to the extreme heat.",
  },
  {
    id: "myth-68",
    question: "Myth: 'Fool's Gold' (pyrite) is worthless.",
    answer: "Fact: While it's not gold, pyrite (iron sulfide) is not worthless. It can be a source of sulfur for producing sulfuric acid and is sometimes found in association with actual gold deposits, making it an indicator mineral for prospectors.",
  },
  {
    id: "myth-69",
    question: "Myth: All underground water is pure and safe to drink.",
    answer: "Fact: Groundwater can be contaminated by natural sources (like arsenic from certain rock types) or human activities (like industrial waste, pesticides, or septic systems). It should always be tested before being considered safe for consumption.",
  },
  {
    id: "myth-70",
    question: "Myth: Geologists can use the Earth's magnetic field to find oil.",
    answer: "Fact: Magnetic surveys (magnetometry) are used in geology, but not to directly detect oil. They are used to map variations in the Earth's magnetic field caused by different rock types in the crust, which can help geologists understand the underlying geological structures where oil might be trapped.",
  },
  {
    id: "myth-71",
    question: "Myth: Carbon dating can be used to date dinosaurs.",
    answer: "Fact: Carbon-14 has a relatively short half-life (5,730 years), making it useful for dating organic materials up to about 50,000 years old. Dinosaurs lived millions of years ago, so their fossils are far too old for carbon dating. Geologists use other radiometric dating methods, like uranium-lead dating of volcanic layers above or below the fossils, to determine their age.",
  },
  {
    id: "myth-72",
    question: "Myth: Mountain ranges are formed by the Earth wrinkling as it cooled.",
    answer: "Fact: This was an old theory that has been disproven. Major mountain ranges are primarily formed by plate tectonics. For example, the Himalayas are being pushed up by the collision of the Indian and Eurasian plates, and the Andes are formed by the subduction of the Nazca Plate beneath the South American Plate.",
  },
  {
    id: "myth-73",
    question: "Myth: The biggest risk from a volcanic eruption is the lava flow.",
    answer: "Fact: While lava flows are destructive, they are usually slow-moving and localized. The most dangerous and widespread hazards are often pyroclastic flows (fast-moving clouds of hot gas and ash) and lahars (volcanic mudflows), which can travel great distances at high speeds. Volcanic ash can also disrupt air travel and affect respiratory health over huge areas."
  },
  {
    id: "myth-74",
    question: "Myth: All granite is the same.",
    answer: "Fact: Granite is a broad term for a type of intrusive igneous rock. However, its mineral composition, crystal size (texture), and color can vary dramatically depending on the specific chemistry of the magma it cooled from and its cooling history. This results in hundreds of named varieties of granite used in construction and decoration."
  },
  {
    id: "myth-75",
    question: "Myth: Erosion is always a slow, gradual process.",
    answer: "Fact: While much erosion is gradual (e.g., a river slowly deepening its valley), it can also happen catastrophically. Flash floods, landslides, coastal storm surges, and glacial outburst floods can remove enormous amounts of rock and soil in a matter of minutes or hours, dramatically reshaping the landscape."
  },
  {
    id: "myth-76",
    question: "Myth: The fossil record is complete and shows a perfect progression of life.",
    answer: "Fact: The fossil record is incredibly valuable, but it's also very incomplete. Fossilization is a rare event that requires specific conditions. Many organisms (especially soft-bodied ones) never fossilize. The record we have is a biased snapshot with many 'missing pages', though it still provides overwhelming evidence for evolution."
  },
  {
    id: "myth-77",
    question: "Myth: A stalactite grows a few inches every year.",
    answer: "Fact: The growth rate of cave formations (speleothems) is highly variable and depends on factors like water drip rate, mineral content, and cave atmosphere. While some can grow relatively quickly, many grow at an incredibly slow pace, sometimes less than a centimeter per thousand years. It is never permissible to touch them, as oils from skin can halt their growth."
  },
  {
    id: "myth-78",
    question: "Myth: Geological maps are just maps with different colors.",
    answer: "Fact: Geological maps are highly complex scientific documents. The colors represent different rock units of specific ages and types. The lines and symbols show faults, folds, and the orientation of rock layers. They are used by geologists to understand the three-dimensional structure of the Earth's crust and to find resources or assess hazards."
  },
  {
    id: "myth-79",
    question: "Myth: The Richter scale is still the primary measure for earthquake size.",
    answer: "Fact: The Richter scale, developed in the 1930s, was an early method for measuring earthquake magnitude. It has been largely superseded by the Moment Magnitude Scale (MMS) since the 1970s. The MMS is more accurate for large earthquakes because it is directly related to the total energy released by the earthquake."
  },
  {
    id: "myth-80",
    question: "Myth: You can see the Great Wall of China from the Moon.",
    answer: "Fact: This is a long-standing myth. The Great Wall is long but very narrow, making it impossible to see from the Moon, let alone from low Earth orbit, without aid. Astronauts have confirmed you cannot see it with the naked eye from space; it's no more visible than a single human hair from two miles away."
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

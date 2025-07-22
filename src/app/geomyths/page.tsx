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

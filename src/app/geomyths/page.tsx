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

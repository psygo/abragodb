/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client"

import { type CSSProperties } from "react"

import { useRouter } from "next/navigation"

import { geoCentroid } from "d3-geo"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps"

import { cn } from "@styles"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

import brTopoJson from "@@/public/br-topo.json"

export type TotalPerState = Record<string, number>

type BrazilMapCardProps = {
  totalPlayersPerState: TotalPerState
  className?: string
}

export function BrazilMapCard({
  totalPlayersPerState,
  className = "",
}: BrazilMapCardProps) {
  return (
    <Card
      className={cn(
        "max-w-[700px] bg-gray-100 dark:bg-gray-800",
        className,
      )}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-sm text-gray-400">
          População de Jogadores por Estado
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-end">
        <BrazilMap
          totalPlayersPerState={totalPlayersPerState}
        />
      </CardContent>
    </Card>
  )
}

type AnnotationData = {
  annotation: { x: number; y: number }
  tag: { fontSize: number; x: number; y: number }
}

const statesWithAnnotations: Record<
  string,
  AnnotationData
> = {
  BR_DF: {
    annotation: { x: -10, y: -15 },
    tag: { fontSize: 14, x: -8, y: -8 },
  },
  BR_RN: {
    annotation: { x: 28, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_PB: {
    annotation: { x: 32, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_PE: {
    annotation: { x: 50, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_AL: {
    annotation: { x: 30, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_SE: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_ES: {
    annotation: { x: 20, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
  BR_RJ: {
    annotation: { x: 25, y: 0 },
    tag: { fontSize: 14, x: 4, y: 0 },
  },
}

const geographyStyle: CSSProperties = {
  fill: "#ECEFF1",
  backgroundColor: "yellow",
  stroke: "#2b2b2b",
  strokeWidth: 2,
  outline: "none",
  cursor: "pointer",
  transition: "all .2s",
}

type BrazilMapProps = Pick<
  BrazilMapCardProps,
  "totalPlayersPerState"
>

/**
 * Adapted from [this CodeSandbox by @jilherme](https://codesandbox.io/p/sandbox/brazil-state-map-improved-g4txd4?file=%2Fsrc%2FMapChart.js%3A13%2C1-159%2C1).
 */
export function BrazilMap({
  totalPlayersPerState,
}: BrazilMapProps) {
  const router = useRouter()

  return (
    <ComposableMap
      className="w-[60vw]"
      projection="geoMercator"
      projectionConfig={{
        scale: 720,
        center: [-54, -15],
      }}
      width={600}
      height={600}
    >
      <Geographies geography={brTopoJson}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey + "-Geography"}
                  stroke="#FFF"
                  geography={geo}
                  onClick={() =>
                    router.push(
                      `/?estado=${geo.properties.id}`,
                    )
                  }
                  style={{
                    default: {
                      ...geographyStyle,
                      fill: "green",
                    },
                    hover: {
                      ...geographyStyle,
                      fill: "blue",
                    },
                    pressed: {
                      ...geographyStyle,
                      fill: "black",
                    },
                  }}
                />
              )
            })}

            {geographies.map((geo) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
              const centroid = geoCentroid(geo)
              const geoId = geo.properties.id
              const stateKey = `BR_${geoId}`
              const annotationOffset =
                statesWithAnnotations[stateKey]
              const tagPosition = annotationOffset?.tag ?? {
                x: 2,
                y: 0,
                fontSize: 15,
              }

              return (
                <g
                  key={`${geo.rsmKey}-Marker`}
                  style={{ pointerEvents: "none" }}
                >
                  {annotationOffset ? (
                    <Annotation
                      connectorProps={{
                        stroke: "rgb(239,171,11)",
                      }}
                      subject={centroid}
                      dx={annotationOffset.annotation.x}
                      dy={annotationOffset.annotation.y}
                    >
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        fontSize={tagPosition.fontSize}
                        fontWeight={700}
                        fill="orange"
                        alignmentBaseline="middle"
                      >
                        {`${geoId} (${totalPlayersPerState[geoId] ?? 0})`}
                      </text>
                    </Annotation>
                  ) : (
                    <Marker coordinates={centroid}>
                      <text
                        x={tagPosition.x}
                        y={tagPosition.y}
                        dx={5}
                        dy={10}
                        fontSize={tagPosition.fontSize}
                        fontWeight={700}
                        fill="orange"
                        textAnchor="middle"
                      >
                        {`${geoId} (${totalPlayersPerState[geoId] ?? 0})`}
                      </text>
                    </Marker>
                  )}
                </g>
              )
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  )
}

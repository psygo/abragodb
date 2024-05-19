/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps"

import { geoCentroid } from "d3-geo"

import brTopoJson from "@@/public/br-topo.json"

const statesWithAnnotations = {
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

const geographyStyle = {
  fill: "#ECEFF1",
  backgroundColor: "yellow",
  stroke: "#2b2b2b",
  strokeWidth: 2,
  outline: "none",
  cursor: "pointer",
  transition: "all .2s",
}

/**
 * From [this CodeSandbox by @jilherme](https://codesandbox.io/p/sandbox/brazil-state-map-improved-g4txd4?file=%2Fsrc%2FMapChart.js%3A13%2C1-159%2C1)
 */
export function BrazilMap() {
  return (
    <div className="w-[60vw]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 700,
          center: [-54, -15],
        }}
        width={600}
        height={600}
      >
        {renderGeograph(brTopoJson, "BR", "green")}
      </ComposableMap>
    </div>
  )
}

function renderGeograph(
  dataSource: any,
  countryId: any,
  countryColor: any,
) {
  return (
    <Geographies geography={dataSource}>
      {({ geographies }) => (
        <>
          {geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey + "-Geography"}
                stroke="#FFF"
                geography={geo}
                onClick={() => console.log({ geo })}
                style={{
                  default: {
                    ...geographyStyle,
                    fill: countryColor,
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
            const centroid = geoCentroid(geo)
            const geoId = geo.properties.id
            const stateKey = `${countryId}_${geoId}`
            const annotationOffset =
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              statesWithAnnotations[stateKey]
            const tagPosition = annotationOffset?.tag || {
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
                      fill="orange"
                      alignmentBaseline="middle"
                    >
                      {geoId}
                    </text>
                  </Annotation>
                ) : (
                  <Marker coordinates={centroid}>
                    <text
                      x={tagPosition.x}
                      y={tagPosition.y}
                      fontSize={tagPosition.fontSize}
                      fill="orange"
                      textAnchor="middle"
                    >
                      {geoId}
                    </text>
                  </Marker>
                )}
              </g>
            )
          })}
        </>
      )}
    </Geographies>
  )
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
  stroke: "#F1F1F1",
  strokeWidth: 2,
  outline: "none",
  cursor: "pointer",
  transition: "all .2s",
}

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
        {renderGeograph(brTopoJson, "BR", "#E4E4E4")}
      </ComposableMap>
    </div>
  )
}

function renderGeograph(
  dataSource,
  countryId,
  countryColor,
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
                    fill: "purple",
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
            const annotationOffset =
              statesWithAnnotations[`${countryId}_${geoId}`]
            const tagPosition = annotationOffset?.tag || {
              x: 2,
              y: 0,
              fontSize: 12,
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

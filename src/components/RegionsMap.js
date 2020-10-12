import React, {useState, memo, useLayoutEffect} from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import {csv, scaleSequential, interpolate, extent} from "d3";
import { geoCentroid } from "d3-geo";
// import * as d3Geo from "d3-geo"
// const {geoPath, ...projections} = d3Geo


// const geoUrl = "https://raw.githubusercontent.com/aTNa-Lab/RepForTests/master/kg_districts_with_osh_bishkek.json"
const geoUrl = "https://raw.githubusercontent.com/aTNa-Lab/RepForTests/master/kg_map_osh_bishkek.json"
const geoBishkek = "https://raw.githubusercontent.com/aTNa-Lab/RepForTests/master/Bishkek_v2.json"
const geoOsh = "https://raw.githubusercontent.com/aTNa-Lab/RepForTests/master/Osh.json"
// const csvUrl = "https://raw.githubusercontent.com/aTNa-Lab/RepForTests/master/kg_map_data.csv"

const offsets = {
  "Аламудунский": 25,
  "Московский": 3,
  "Ысык- Атинкий": 3,
  "Сокулукский": -20,
  "Чуйский": 10,
  "Панфиловский": -35
}

const Map = (props) => {

	const [[width, height], setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
		setSize([window.innerWidth+10, window.innerHeight-5]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

  const colorScale = scaleSequential().domain([0,10]).interpolator(interpolate("white", "orange"));

  const returnColor = (name) => {
    let color = colorScale(returnCurrent(name).sum)
    return color
	}

  const returnCurrent = (name) => {
    let current = ""
    props.data.map(d => {
      if (d.name === name) {
        current = d
      }
    })
    return current
	}
  
    // const proj = projections["geoEqualEarth"]().rotate([-25, 0, 0]).scale(9000).translate([-5100, 7500])
    return (
        <>
      {/* <ComposableMap projection={proj} width={state.width} height={state.height} > */}
      <ComposableMap data-tip="" projection="geoEqualEarth" width={width} height={height} projectionConfig={{scale: props.scale}}>
      {/* <ComposableMap height={353} > */}
      {/* <ZoomableGroup zoom={25} maxZoom={200} minZoom={22} center={[74.5,41.2]} > */}
      {/* <ZoomableGroup center={[74.5,41.2]} minZoom={0.5} zoom={2.5}> */}
      <ZoomableGroup center={[74.5,41.2]} minZoom={1} maxZoom={1}  zoom={1}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey} 
                geography={geo}
                onMouseEnter={() => {
                  props.setTooltipContent(returnCurrent(geo.properties.name));
                }}
                onMouseLeave={() => {
                  props.setTooltipContent("");
                }}
                fill={returnColor(geo.properties.name)}
                stroke="#FFF"
                strokeWidth="0.01"
                style={{
                  default: {outline: "none"},
                  hover: {outline: "none"},
                  pressed: {outline: "none"}
                }}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <g key={geo.rsmKey + "-name"}>
                  <Marker coordinates={centroid} 
                  onMouseEnter={() => {
                    props.setTooltipContent(returnCurrent(geo.properties.name));
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  >
                    <text y={offsets[geo.properties.name]} fontSize={props.font} textAnchor="middle">
                      {returnCurrent(geo.properties.name).trueName}
                    </text>
                  </Marker>
                </g>
              );
            })}
          </>
        )}
      </Geographies>
      <Geographies geography={geoBishkek}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey} 
                geography={geo} 
                fill={returnColor("Бишкек")}
								onMouseEnter={() => {
                  props.setTooltipContent(returnCurrent("Бишкек"));
                }}
                onMouseLeave={() => {
                  props.setTooltipContent("");
                }}
                stroke="#FFF"
                strokeWidth="0.01"
                style={{
                  default: {outline: "none"},
                  hover: {outline: "none"},
                  pressed: {outline: "none"}
                }}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <g key={geo.rsmKey + "-name"}>
                  <Marker coordinates={centroid}
                  onMouseEnter={() => {
                    props.setTooltipContent(returnCurrent("Бишкек"));
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  >
                    <text fontSize={props.font} textAnchor="middle">
										{returnCurrent("Бишкек").trueName}
                    </text>
                  </Marker>
                </g>
              );
            })}
          </>
        )}
      </Geographies>
      <Geographies geography={geoOsh}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey} 
                geography={geo} 
								onMouseEnter={() => {
                  props.setTooltipContent(returnCurrent("Ош"));
                }}
                onMouseLeave={() => {
                  props.setTooltipContent("");
                }}
                fill={returnColor("Ош")}
                stroke="#FFF"
                strokeWidth="0.01"
                style={{
                  default: {outline: "none"},
                  hover: {outline: "none"},
                  pressed: {outline: "none"}
                }}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <g key={geo.rsmKey + "-name"}>
                  <Marker coordinates={centroid}
                  onMouseEnter={() => {
                    props.setTooltipContent(returnCurrent("Ош"));
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  >
                    <text fontSize={props.font} textAnchor="middle">
										{returnCurrent("Ош").trueName}
                    </text>
                  </Marker>
                </g>
              );
            })}
          </>
        )}
      </Geographies>
      </ZoomableGroup>
      </ComposableMap>
      </>
)
};

export default memo(Map)
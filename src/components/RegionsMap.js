import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  //"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  "https://raw.githubusercontent.com/Xakim1c/parliament-calculator-v2/main/src/data/kg_regions_topo.json"

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent }) => {
  
  return (
    <>
      <ComposableMap data-tip="" projection="geoEqualEarth"  width={1000} height={500} projectionConfig={{scale: 6000}}>
        <ZoomableGroup center={[74.5,41.2]} minZoom={1} maxZoom={1}  zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#EAEAEC"
                  geography={geo}
                  onMouseEnter={() => {
                    console.log(geo)
                    const { ADM1_RU, Shape_Area } = geo.properties;
                    //setTooltipContent(`${ADM1_RU} — ${rounded(Shape_Area)}` + ': TEST');
                    setTooltipContent(`${ADM1_RU}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#AEB6BF",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>

          {/* <Marker coordinates={[74.5,41.2]} fill="#777">
          <text textAnchor="middle" fill="#F53">
            ОШ
          </text>
        </Marker> */}

        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);

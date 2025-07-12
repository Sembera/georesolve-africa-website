import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import proj4 from "proj4";
import { useState } from "react";

const CoordinateConverter = () => {
  const [country, setCountry] = useState("uganda");
  const [sourceCRS, setSourceCRS] = useState("EPSG:4326");
  const [targetCRS, setTargetCRS] = useState("EPSG:32636");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState<{
    type: "success" | "error" | "initial";
    input: string;
    output: string;
    country: string;
    sourceCRS: string;
    targetCRS: string;
    note?: string;
  } | null>(null);

  // Define EPSG projection strings
  const projections = {
    "EPSG:4326": "+proj=longlat +datum=WGS84 +no_defs",
    "EPSG:21036":
      "+proj=utm +zone=36 +south +ellps=clrk80 +towgs84=-160,-6,-302,0,0,0,0 +units=m +no_defs",
    "EPSG:21037":
      "+proj=utm +zone=37 +south +ellps=clrk80 +towgs84=-160,-6,-302,0,0,0,0 +units=m +no_defs",
    "EPSG:20136":
      "+proj=utm +zone=36 +ellps=clrk80 +towgs84=-166,-15,204,0,0,0,0 +units=m +no_defs",
    "EPSG:20137":
      "+proj=utm +zone=37 +ellps=clrk80 +towgs84=-166,-15,204,0,0,0,0 +units=m +no_defs",
    "EPSG:32736": "+proj=utm +zone=36 +south +datum=WGS84 +units=m +no_defs",
    "EPSG:32636": "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs",
  };

  const convertCoordinates = () => {
    if (!latitude || !longitude) {
      setResult({
        type: "error",
        input: "",
        output: "Please enter both coordinates.",
        country,
        sourceCRS,
        targetCRS,
      });
      return;
    }

    const latNum = Number.parseFloat(latitude);
    const lonNum = Number.parseFloat(longitude);

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      setResult({
        type: "error",
        input: "",
        output: "Please enter valid numeric coordinates.",
        country,
        sourceCRS,
        targetCRS,
      });
      return;
    }

    try {
      let conversionResult: [number, number];
      let conversionNote = "";

      if (sourceCRS === targetCRS) {
        conversionResult = [lonNum, latNum];
        conversionNote = "No conversion needed - same coordinate system";
      } else {
        const sourceProj = projections[sourceCRS as keyof typeof projections];
        const targetProj = projections[targetCRS as keyof typeof projections];

        // For geographic coordinates (EPSG:4326), input is [longitude, latitude]
        // For projected coordinates, input is [easting, northing]
        if (sourceCRS === "EPSG:4326") {
          conversionResult = proj4(sourceProj, targetProj, [lonNum, latNum]);
        } else {
          conversionResult = proj4(sourceProj, targetProj, [lonNum, latNum]);
        }

        conversionNote = "Precise conversion using proj4.js";
      }

      setResult({
        type: "success",
        input: `${latitude}, ${longitude}`,
        output: `${conversionResult[0].toFixed(6)}, ${conversionResult[1].toFixed(6)}`,
        country,
        sourceCRS,
        targetCRS,
        note: conversionNote,
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Conversion failed";
      setResult({
        type: "error",
        input: `${latitude}, ${longitude}`,
        output: `${errorMsg}. Please ensure coordinates are valid for the selected coordinate systems.`,
        country,
        sourceCRS,
        targetCRS,
      });
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h3
        style={{
          textAlign: "center",
          color: "#345363",
          marginBottom: "25px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Coordinate Converter (East Africa)
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="country"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#345363",
          }}
        >
          Select Country:
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "2px solid #9EDB9E",
            fontSize: "16px",
            backgroundColor: "white",
          }}
        >
          <option value="uganda">Uganda</option>
          <option value="kenya">Kenya</option>
          <option value="tanzania">Tanzania</option>
          <option value="rwanda">Rwanda</option>
          <option value="burundi">Burundi</option>
          <option value="south_sudan">South Sudan</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label
            htmlFor="sourceCRS"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#345363",
            }}
          >
            Convert from:
          </label>
          <select
            value={sourceCRS}
            onChange={(e) => setSourceCRS(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "2px solid #9EDB9E",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="EPSG:4326">WGS 84 (EPSG:4326)</option>
            <option value="EPSG:21036">Arc 1960 / UTM 36S</option>
            <option value="EPSG:21037">Arc 1960 / UTM 37S</option>
            <option value="EPSG:20136">Adindan / UTM 36N</option>
            <option value="EPSG:20137">Adindan / UTM 37N</option>
            <option value="EPSG:32736">WGS 84 / UTM 36S</option>
            <option value="EPSG:32636">WGS 84 / UTM 36N</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="targetCRS"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#345363",
            }}
          >
            Convert to:
          </label>
          <select
            value={targetCRS}
            onChange={(e) => setTargetCRS(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "2px solid #9EDB9E",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="EPSG:4326">WGS 84 (EPSG:4326)</option>
            <option value="EPSG:21036">Arc 1960 / UTM 36S</option>
            <option value="EPSG:21037">Arc 1960 / UTM 37S</option>
            <option value="EPSG:20136">Adindan / UTM 36N</option>
            <option value="EPSG:20137">Adindan / UTM 37N</option>
            <option value="EPSG:32736">WGS 84 / UTM 36S</option>
            <option value="EPSG:32636">WGS 84 / UTM 36N</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div>
          <label
            htmlFor="lat"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#345363",
            }}
          >
            Latitude / Northing:
          </label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude or northing"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "2px solid #9EDB9E",
              fontSize: "16px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="lon"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#345363",
            }}
          >
            Longitude / Easting:
          </label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude or easting"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "2px solid #9EDB9E",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      <Button
        onClick={convertCoordinates}
        className="w-full bg-[#4DA34D] hover:bg-[#345363] text-white text-lg font-bold py-4 px-6 mb-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Convert Coordinates
      </Button>

      <div className="min-h-[120px] p-4 border-2 border-dashed border-[#9EDB9E] rounded-lg bg-[#f8f9fa]">
        {result ? (
          result.type === "success" ? (
            <Alert className="border-[#4DA34D] bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
              <CheckCircle className="h-4 w-4 text-[#4DA34D]" />
              <AlertTitle className="text-[#345363] text-lg mb-3">
                Conversion Results
              </AlertTitle>
              <AlertDescription>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <strong className="text-gray-600">
                      Input ({result.sourceCRS}):
                    </strong>
                    <br />
                    <span className="font-mono text-gray-800">
                      {result.input}
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <strong className="text-green-800">
                      Output ({result.targetCRS}):
                    </strong>
                    <br />
                    <span className="font-mono text-green-800 font-bold text-lg">
                      {result.output}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 border-t border-gray-200 pt-3">
                    <strong>Country:</strong>{" "}
                    {result.country.charAt(0).toUpperCase() +
                      result.country.slice(1)}
                    <br />
                    <strong>From:</strong> {result.sourceCRS} →{" "}
                    <strong>To:</strong> {result.targetCRS}
                    {result.note && (
                      <>
                        <br />
                        <em className="text-orange-600">{result.note}</em>
                      </>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-red-500 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-800">Conversion Error</AlertTitle>
              <AlertDescription className="text-red-700">
                {result.output}
              </AlertDescription>
            </Alert>
          )
        ) : (
          <div className="text-center text-gray-500 py-8">
            <strong>Ready for Conversion</strong>
            <br />
            Select coordinate systems, enter your coordinates, and click convert
            to see results.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinateConverter;

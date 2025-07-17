import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowUpDown, CheckCircle } from "lucide-react";
import { useState } from "react";

const DMSConverter = () => {
  const [conversionMode, setConversionMode] = useState<
    "decimal-to-dms" | "dms-to-decimal"
  >("decimal-to-dms");

  // Decimal inputs
  const [decimalLatitude, setDecimalLatitude] = useState("");
  const [decimalLongitude, setDecimalLongitude] = useState("");

  // DMS inputs
  const [latDegrees, setLatDegrees] = useState("");
  const [latMinutes, setLatMinutes] = useState("");
  const [latSeconds, setLatSeconds] = useState("");
  const [latDirection, setLatDirection] = useState<"N" | "S">("N");

  const [lonDegrees, setLonDegrees] = useState("");
  const [lonMinutes, setLonMinutes] = useState("");
  const [lonSeconds, setLonSeconds] = useState("");
  const [lonDirection, setLonDirection] = useState<"E" | "W">("E");

  const [result, setResult] = useState<{
    type: "success" | "error";
    input: string;
    output: string;
    details?: string;
  } | null>(null);

  const validateDecimalCoordinates = (lat: number, lon: number): boolean => {
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  };

  const validateDMSComponents = (
    degrees: number,
    minutes: number,
    seconds: number,
    isLatitude: boolean,
  ): boolean => {
    const maxDegrees = isLatitude ? 90 : 180;
    return (
      degrees >= 0 &&
      degrees <= maxDegrees &&
      minutes >= 0 &&
      minutes < 60 &&
      seconds >= 0 &&
      seconds < 60
    );
  };

  const decimalToDMS = (decimal: number, isLatitude: boolean): string => {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = (minutesFloat - minutes) * 60;

    let direction: string;
    if (isLatitude) {
      direction = decimal >= 0 ? "N" : "S";
    } else {
      direction = decimal >= 0 ? "E" : "W";
    }

    return `${degrees}° ${minutes}' ${seconds.toFixed(4)}" ${direction}`;
  };

  const dmsToDecimal = (
    degrees: number,
    minutes: number,
    seconds: number,
    direction: string,
  ): number => {
    let decimal = degrees + minutes / 60 + seconds / 3600;
    if (direction === "S" || direction === "W") {
      decimal = -decimal;
    }
    return decimal;
  };

  const convertDecimalToDMS = () => {
    if (!decimalLatitude || !decimalLongitude) {
      setResult({
        type: "error",
        input: "",
        output: "Please enter both latitude and longitude in decimal degrees.",
      });
      return;
    }

    const lat = Number.parseFloat(decimalLatitude);
    const lon = Number.parseFloat(decimalLongitude);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      setResult({
        type: "error",
        input: "",
        output: "Please enter valid numeric values for latitude and longitude.",
      });
      return;
    }

    if (!validateDecimalCoordinates(lat, lon)) {
      setResult({
        type: "error",
        input: "",
        output:
          "Coordinates out of range. Latitude must be between -90° and 90°, longitude between -180° and 180°.",
      });
      return;
    }

    const latDMS = decimalToDMS(lat, true);
    const lonDMS = decimalToDMS(lon, false);

    setResult({
      type: "success",
      input: `${lat}°, ${lon}°`,
      output: `${latDMS}, ${lonDMS}`,
      details: "Decimal degrees converted to degrees-minutes-seconds format",
    });
  };

  const convertDMSToDecimal = () => {
    if (
      !latDegrees ||
      !latMinutes ||
      !latSeconds ||
      !lonDegrees ||
      !lonMinutes ||
      !lonSeconds
    ) {
      setResult({
        type: "error",
        input: "",
        output:
          "Please fill in all DMS fields (degrees, minutes, seconds) for both latitude and longitude.",
      });
      return;
    }

    const latDeg = Number.parseFloat(latDegrees);
    const latMin = Number.parseFloat(latMinutes);
    const latSec = Number.parseFloat(latSeconds);
    const lonDeg = Number.parseFloat(lonDegrees);
    const lonMin = Number.parseFloat(lonMinutes);
    const lonSec = Number.parseFloat(lonSeconds);

    if (
      Number.isNaN(latDeg) ||
      Number.isNaN(latMin) ||
      Number.isNaN(latSec) ||
      Number.isNaN(lonDeg) ||
      Number.isNaN(lonMin) ||
      Number.isNaN(lonSec)
    ) {
      setResult({
        type: "error",
        input: "",
        output: "Please enter valid numeric values for all DMS components.",
      });
      return;
    }

    if (
      !validateDMSComponents(latDeg, latMin, latSec, true) ||
      !validateDMSComponents(lonDeg, lonMin, lonSec, false)
    ) {
      setResult({
        type: "error",
        input: "",
        output:
          "Invalid DMS values. Check ranges: degrees (0-90° for lat, 0-180° for lon), minutes/seconds (0-59).",
      });
      return;
    }

    const decimalLat = dmsToDecimal(latDeg, latMin, latSec, latDirection);
    const decimalLon = dmsToDecimal(lonDeg, lonMin, lonSec, lonDirection);

    setResult({
      type: "success",
      input: `${latDeg}° ${latMin}' ${latSec}" ${latDirection}, ${lonDeg}° ${lonMin}' ${lonSec}" ${lonDirection}`,
      output: `${decimalLat.toFixed(8)}°, ${decimalLon.toFixed(8)}°`,
      details: "DMS format converted to decimal degrees",
    });
  };

  const handleConvert = () => {
    if (conversionMode === "decimal-to-dms") {
      convertDecimalToDMS();
    } else {
      convertDMSToDecimal();
    }
  };

  const switchMode = () => {
    setConversionMode(
      conversionMode === "decimal-to-dms" ? "dms-to-decimal" : "decimal-to-dms",
    );
    setResult(null);
    // Clear inputs when switching modes
    setDecimalLatitude("");
    setDecimalLongitude("");
    setLatDegrees("");
    setLatMinutes("");
    setLatSeconds("");
    setLonDegrees("");
    setLonMinutes("");
    setLonSeconds("");
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
        Decimal ↔ DMS Converter
      </h3>

      {/* Mode Switch */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={switchMode}
          variant="outline"
          className="border-[#4DA34D] text-[#345363] hover:bg-[#9EDB9E]/20 flex items-center gap-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          Switch to{" "}
          {conversionMode === "decimal-to-dms"
            ? "DMS → Decimal"
            : "Decimal → DMS"}
        </Button>
      </div>

      {conversionMode === "decimal-to-dms" ? (
        /* Decimal to DMS Mode */
        <div>
          <h4
            style={{
              color: "#345363",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Convert Decimal Degrees to DMS
          </h4>

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
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#345363",
                }}
              >
                Latitude (Decimal Degrees):
              </label>
              <input
                type="text"
                value={decimalLatitude}
                onChange={(e) => setDecimalLatitude(e.target.value)}
                placeholder="e.g. -1.286389"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "2px solid #9EDB9E",
                  fontSize: "16px",
                }}
              />
              <small style={{ color: "#6c757d", fontSize: "12px" }}>
                Range: -90° to 90°
              </small>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#345363",
                }}
              >
                Longitude (Decimal Degrees):
              </label>
              <input
                type="text"
                value={decimalLongitude}
                onChange={(e) => setDecimalLongitude(e.target.value)}
                placeholder="e.g. 36.817222"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "2px solid #9EDB9E",
                  fontSize: "16px",
                }}
              />
              <small style={{ color: "#6c757d", fontSize: "12px" }}>
                Range: -180° to 180°
              </small>
            </div>
          </div>
        </div>
      ) : (
        /* DMS to Decimal Mode */
        <div>
          <h4
            style={{
              color: "#345363",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Convert DMS to Decimal Degrees
          </h4>

          {/* Latitude DMS */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#345363",
              }}
            >
              Latitude:
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 80px",
                gap: "10px",
              }}
            >
              <div>
                <input
                  type="text"
                  value={latDegrees}
                  onChange={(e) => setLatDegrees(e.target.value)}
                  placeholder="Degrees"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-90°
                </small>
              </div>
              <div>
                <input
                  type="text"
                  value={latMinutes}
                  onChange={(e) => setLatMinutes(e.target.value)}
                  placeholder="Minutes"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-59'
                </small>
              </div>
              <div>
                <input
                  type="text"
                  value={latSeconds}
                  onChange={(e) => setLatSeconds(e.target.value)}
                  placeholder="Seconds"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-59"
                </small>
              </div>
              <select
                value={latDirection}
                onChange={(e) => setLatDirection(e.target.value as "N" | "S")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "2px solid #9EDB9E",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
          </div>

          {/* Longitude DMS */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#345363",
              }}
            >
              Longitude:
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 80px",
                gap: "10px",
              }}
            >
              <div>
                <input
                  type="text"
                  value={lonDegrees}
                  onChange={(e) => setLonDegrees(e.target.value)}
                  placeholder="Degrees"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-180°
                </small>
              </div>
              <div>
                <input
                  type="text"
                  value={lonMinutes}
                  onChange={(e) => setLonMinutes(e.target.value)}
                  placeholder="Minutes"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-59'
                </small>
              </div>
              <div>
                <input
                  type="text"
                  value={lonSeconds}
                  onChange={(e) => setLonSeconds(e.target.value)}
                  placeholder="Seconds"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "2px solid #9EDB9E",
                    fontSize: "14px",
                  }}
                />
                <small style={{ color: "#6c757d", fontSize: "11px" }}>
                  0-59"
                </small>
              </div>
              <select
                value={lonDirection}
                onChange={(e) => setLonDirection(e.target.value as "E" | "W")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "2px solid #9EDB9E",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                <option value="E">E</option>
                <option value="W">W</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleConvert}
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
                    <strong className="text-gray-600">Input:</strong>
                    <br />
                    <span className="font-mono text-gray-800">
                      {result.input}
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <strong className="text-green-800">Output:</strong>
                    <br />
                    <span className="font-mono text-green-800 font-bold text-lg">
                      {result.output}
                    </span>
                  </div>
                  {result.details && (
                    <div className="text-sm text-gray-600 border-t border-gray-200 pt-3">
                      <em className="text-orange-600">{result.details}</em>
                    </div>
                  )}
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
            {conversionMode === "decimal-to-dms"
              ? "Enter decimal coordinates to convert to degrees-minutes-seconds format"
              : "Enter DMS coordinates to convert to decimal degrees format"}
          </div>
        )}
      </div>

      {/* Usage Examples */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h5 className="font-semibold text-[#345363] mb-2">
          Example Coordinates:
        </h5>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <strong>Kampala, Uganda:</strong> 0.347596°, 32.582520° ↔ 0° 20'
            51.3456" N, 32° 34' 57.072" E
          </div>
          <div>
            <strong>Nairobi, Kenya:</strong> -1.286389°, 36.817222° ↔ 1° 17'
            11.0004" S, 36° 49' 2.0004" E
          </div>
          <div>
            <strong>Kigali, Rwanda:</strong> -1.944444°, 30.061111° ↔ 1° 56'
            39.9984" S, 30° 3' 39.9996" E
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMSConverter;

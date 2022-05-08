import { useState } from "react";
import "./App.css";
import SearchOneWay from "./components/SearchOneWay";
import useFetch from "./hooks/useFetch";
import {ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { SEARCH_TYPES } from "./constants/searchTypes";
import SearchWithReturn from "./components/SearchWithReturn";

function App() {
  const { data, error, loading } = useFetch(
    "https://api-uat-ezycommerce.ezyflight.se/api/v1/Airport/OriginsWithConnections/en-us",
    {
      headers: {
        "Tenant-Identifier":
          "9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d",
      },
    }
  );

  const [searchType, setSearchType] = useState(SEARCH_TYPES.RETURN);
  const [selectedConnection, setSelectedConnection] = useState(null);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}
      {data && (
        <>
          <ToggleButtonGroup
            type="radio"
            name="one-way/return toggle"
            value={searchType}
            onChange={(value) => setSearchType(value)}
            className='my-3'
          >
            <ToggleButton id="tbg-btn-1" value={SEARCH_TYPES.ONE_WAY}>
              One-way
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value={SEARCH_TYPES.RETURN}>
              With Return
            </ToggleButton>
          </ToggleButtonGroup>
          {searchType === SEARCH_TYPES.ONE_WAY && (
            <SearchOneWay airports={data.airports} setSelectedConnection={setSelectedConnection} />
          )}
          {searchType === SEARCH_TYPES.RETURN && (
            <SearchWithReturn airports={data.airports} setSelectedConnection={setSelectedConnection} />
          )}

          <div className='my-3'>Search results:</div>
          <div className='my-3'>{selectedConnection}</div>
        </>
      )}
    </div>
  );
}

export default App;

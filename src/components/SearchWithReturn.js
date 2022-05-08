import { Dropdown } from "react-bootstrap";

const SearchWithReturn = ({ airports, setSelectedConnection }) => {
  let twoWayConnections = [];

  airports.forEach(({ code: firstCode, connections: firstConnections }) => {
    firstConnections.forEach(({ code: secondCode }) => {
      const secondAirport = airports.find(
        ({ code: secondCodeToFind }) => secondCode === secondCodeToFind
      );
      if (secondAirport) {
        const thirdAirport = secondAirport.connections.find(
          ({ code: thirdCode }) => thirdCode === firstCode
        );
        if (thirdAirport) {
          twoWayConnections.push(
            `${firstCode} => ${secondCode} => ${thirdAirport.code}`
          );
        }
      }
    });
  });

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Two-way connections</Dropdown.Toggle>
      <Dropdown.Menu>
        {twoWayConnections.map((twoWayConnection) => (
          <Dropdown.Item onClick={() => setSelectedConnection(twoWayConnection)}>{twoWayConnection}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchWithReturn;

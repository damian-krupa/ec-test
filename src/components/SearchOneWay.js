import { Dropdown } from "react-bootstrap";

const SearchOneWay = ({ airports, setSelectedConnection }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">One-way connections</Dropdown.Toggle>
      <Dropdown.Menu>
        {airports.map((origin) =>
          origin.connections.map((arrival) => {
            const connectionText = `${origin.code} => ${arrival.code}`;

            return (
              <Dropdown.Item onClick={() => setSelectedConnection(connectionText)}>
                {connectionText}
              </Dropdown.Item>
            );
          })
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchOneWay;

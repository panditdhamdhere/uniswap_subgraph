import { useEffect, useState } from "react";
import { createClient } from "urql";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);

  const QueryURL =
    "https://gateway.thegraph.com/api/28386c94c5b5e9c4e150eaacb5e75959/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";

  const client = createClient({
    url: QueryURL,
  });

  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`;

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.tokens);
    };
    getTokens();
  }, []);

  return (
    <>
      <div>
        <h1>Tokens Information</h1>
        {tokens !== null &&
          tokens.length > 0 &&
          tokens.map((token) => {
            return (
              <div key={token.id}>
                <div>{token.id}</div>
                <div>{token.name}</div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;

import "./App.css";
import { useState } from "react";

// Import Framework7 React components
import {
  App as F7App,
  View,
  Page,
  Navbar,
  Block,
  Button,
} from "framework7-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <F7App name="MealPal">
      <View main>
        <Page name="home">
          <Navbar title="Framework7 is working 🎉" />

          <Block strong>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src="/react.svg" className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React + Framework7</h1>
            <div className="card">
              <Button fill onClick={() => setCount(count + 1)}>
                Count is {count}
              </Button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </Block>
        </Page>
      </View>
    </F7App>
  );
}
export default App;

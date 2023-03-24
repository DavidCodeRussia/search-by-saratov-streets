import { Formik } from "formik";
import AutosuggestByValue from "./components/AutosuggestByValue/AutosuggestByValue";
import logo from "./logo.svg";
import "./App.css";
import { useLazyGetAddressQuery } from "./API/apiSlice";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Formik onSubmit={(val) => alert(val)}>
          {({ handleSubmit }) => {
            <form>
              <AutosuggestByValue
                id="correspondent_address"
                label="Адрес корреспондента"
                placeholder="Добавить адрес"
                lazyQuery={useLazyGetAddressQuery}
              />
            </form>;
          }}
        </Formik>
      </header>
    </div>
  );
}

export default App;

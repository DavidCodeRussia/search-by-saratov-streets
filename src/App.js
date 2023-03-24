import { Formik } from "formik";
import AutosuggestByValue from "./components/AutosuggestByValue/AutosuggestByValue";

import { useLazyGetAddressQuery } from "./API/apiSlice";
import "./App.css";

function App() {
  const initialValues = {
    correspondent_address: "",
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className="search">
          <Formik initialValues={initialValues} onSubmit={(val) => alert(val)}>
            {(props) => (
              <form>
                <AutosuggestByValue
                  id="correspondent_address"
                  label="Адрес корреспондента"
                  placeholder="Добавить адрес"
                  lazyQuery={useLazyGetAddressQuery}
                />
              </form>
            )}
          </Formik>
        </div>
      </header>
    </div>
  );
}

export default App;

// // src/index.tsx
// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// // import reportWebVitals from './reportWebVitals'; // Ensure this path is correct
// import ApolloProviderWrapper from "./graphQl/AppoloProvider";
// import { Provider as ReduxProvider } from "react-redux";
// import "./i18n"; // Import i18n configuration
// import configureAppStore from "./store/configureStore";
// import "./index.css";
// import AppRoute from "./app";
// import { IntercomProvider } from "react-use-intercom";


// const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID ?? 'v9pcbv98'; // Ensure correct env variable

// console.log("Intercom App ID:", INTERCOM_APP_ID);
// if (!INTERCOM_APP_ID) {
//   console.error("🚨 Intercom App ID is missing! Check your .env file.");
// }


// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement,
// );
// root.render(
//   <React.StrictMode>
//     <ApolloProviderWrapper>
//       <IntercomProvider appId={INTERCOM_APP_ID}
//       >
//         <ReduxProvider store={configureAppStore()}>
//           <AppRoute />
//         </ReduxProvider>
//       </IntercomProvider>
//     </ApolloProviderWrapper>
//   </React.StrictMode>,
// );

// // reportWebVitals();

// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import ApolloProviderWrapper from "./graphQl/AppoloProvider";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import "./i18n";
import { store, persistor } from "./store/configureStore";
import "./index.css";
import AppRoute from "./app";
import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID ?? 'v9pcbv98';

if (!INTERCOM_APP_ID) {
  console.error("🚨 Intercom App ID is missing! Check your .env file.");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ApolloProviderWrapper>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRoute />
          </PersistGate>
        </ReduxProvider>
      </IntercomProvider>
    </ApolloProviderWrapper>
  </React.StrictMode>,
);

import React from "react";
import "./App.css";
import names from "./names";
import { AuthForm } from "./AuthForm";
import { InfosUser } from "./InfosUser";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000/";
const beneficiariesEndpoint = `${backendUrl}api/beneficiaries?format=json`;
// const loginEndpoint = `${backendUrl}api/token`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

function App() {
  const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
    []
  );

  const [userAuthentified, setUserAuthentified] = React.useState(null);

  const fetchBeneficiaries = async () => {
    const response = await fetch(beneficiariesEndpoint, {});
    const json = await response.json();
    setRegisteredBeneficiaries(json);
  };

  React.useEffect(() => {
    fetchBeneficiaries();
  }, []);
  const beneficiaryNames = [...Array(12).keys()].map(number => ({
    name: names[Math.floor(Math.random() * names.length)]
  }));

  return (
    <div className="App">
      <header className="App-header">
        {!userAuthentified ?
          <AuthForm setUserAuthentified={setUserAuthentified} /> :
          <InfosUser user={userAuthentified[0]} />
        }
          
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        <hr />
        <h3>Personnes stockées en base</h3>
        <div className="Beneficiaries-list">
          {registeredBeneficiaries.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
            </div>
          ))}
        </div>
        <hr />
        <h3>Personnes non stockées</h3>
        <div className="Beneficiaries-list">
          {beneficiaryNames.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

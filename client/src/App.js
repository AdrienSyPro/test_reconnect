import React from "react";
import "./App.css";
import names from "./names";
import { AuthForm } from "./AuthForm";
import { InfosUser } from "./InfosUser";
import Search from "./Search";
import { AddForm } from "./AddForm";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000/";
const beneficiariesEndpoint = `${backendUrl}api/beneficiaries/`;
const userEndpoint = `${backendUrl}/admin/auth/user/?q=`;
// const loginEndpoint = `${backendUrl}api/token`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

function App() {
  var headers = new Headers({
    "Content-Type": "application/json"
  });

  const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
    []
  );

  const [userAuthentified, setUserAuthentified] = React.useState(null);
  const [localSearch, setLocalSearch] = React.useState('');

  const fetchBeneficiaries = async () => {
    const response = await fetch(beneficiariesEndpoint + '?format=json', {});
    const json = await response.json();

    setRegisteredBeneficiaries(json);
  };

  const fetchOneBeneficiary = async (name) => {
    const response = await fetch(beneficiariesEndpoint + name, {});

    if (response.status !== 200) {
      setRegisteredBeneficiaries([]);
      return;
    }

    const json = await response.json();
    setRegisteredBeneficiaries([json]);
  };

  const deleteOneBeneficiary = async (name) => {
    const response = await fetch(beneficiariesEndpoint + name, {
      method: "DELETE"
    });

    fetchBeneficiaries();
  };

  /**
   * Add a new beneficiary
   * @param {string} name 
   */
  async function addBeneficiaries(name) {
    headers = new Headers({
      "Content-Type": "application/json",
      // "Authorization": "Bearer " + userAuthentified[0].token.access
    });

    const response = await fetch(beneficiariesEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({name: name})
    });

    fetchBeneficiaries();
  }

  React.useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const beneficiaryNames = [...Array(12).keys()].map(number => ({
    name: names[Math.floor(Math.random() * names.length)]
  }));

  function handleLocalSearch(searchText) {
    setLocalSearch(searchText);
  }

function handleAuthentication(user) {
  setUserAuthentified(user);
}

  return (
    <div className="App">
      <header className="App-header">
        {!userAuthentified ?
          <AuthForm handleAuthentication={handleAuthentication} /> :
          <InfosUser user={userAuthentified[0]} />
        }
          
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        <hr />
        <AddForm addFunction={addBeneficiaries}></AddForm>
        <h3>Personnes stockées en base</h3>
        <Search searchFunction={fetchOneBeneficiary}></Search>
        <div className="Beneficiaries-list">
          {registeredBeneficiaries.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
              <button onClick={() => deleteOneBeneficiary(beneficiary.name)}>Supprimer</button>
            </div>
          ))}
        </div>
        <hr />
        <h3>Personnes non stockées</h3>
        <Search searchFunction={handleLocalSearch}></Search>
        <div className="Beneficiaries-list">
          {beneficiaryNames.filter(beneficiary => beneficiary.name.includes(localSearch)).map((beneficiary, index) => (
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

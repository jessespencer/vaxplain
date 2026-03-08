import { useState } from 'react';
import { vaccines } from './data/vaccines';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Purpose from './components/Purpose';
import Ingredients from './components/Ingredients';
import DataStats from './components/DataStats';
import ThreatLevel from './components/ThreatLevel';
import DiseaseHistory from './components/DiseaseHistory';
import ProsCons from './components/ProsCons';
import Sources from './components/Sources';
import SectionIndicator from './components/SectionIndicator';
import { useActiveSection } from './hooks/useActiveSection';
import './App.css';

function App() {
  const [selected, setSelected] = useState('covid-19');
  const data = vaccines[selected];
  const { active } = useActiveSection();

  return (
    <>
      <Nav />
      <SectionIndicator active={active} />
      <Hero selected={selected} onSelect={setSelected} />
      <Purpose data={data} />
      <Ingredients data={data} />
      <DataStats data={data} />
      <ThreatLevel data={data} />
      <DiseaseHistory data={data} />
      <ProsCons data={data} />
      <Sources data={data} />
      <footer className="footer">
        <p>
          VaxPlain is an open-source transparency project.
          <br />
          Not medical advice. Always consult a qualified healthcare provider.
          <br />
          Data sourced from CDC, WHO, VAERS, FDA, The Lancet, NEJM, and Cochrane.
        </p>
      </footer>
    </>
  );
}

export default App;

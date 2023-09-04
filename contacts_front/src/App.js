import Contacts from "./components/Contacts";

function App() {

  let MainStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  
  

  return (
    <div style={MainStyle}>
      <Contacts/>
    </div>
  );
}

export default App;

import './style.css';

function App() {
  return (
    <div id="app">
      <input type="text" id="search-input" />
      <button type="button" id="search-button">search!</button>
      <div id="results-container">
        <table id="results">
          <tr>
            <th>title</th>
            <th>director</th>
            <th>realse date</th>
            <th>runtime</th>
            <th>rating</th>
            <th>genre</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;

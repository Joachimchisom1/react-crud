import './App.css'
import EmployeeContextProvider from './contexts/EmployeeContext'
import EmployeeList from './components/EmployeeList'


function App() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <EmployeeContextProvider>
          <EmployeeList />
          </EmployeeContextProvider>
        </div>
      </div>
    </div>
  )
}

export default App

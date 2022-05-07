import { Modal, Button, Alert } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../contexts/EmployeeContext'
import Employee from './Employee'
import AddForm from './AddForm'
import Pagination from './Pagination'

const EmployeeList = () => {
  const { sortedEmployees } = useContext(EmployeeContext)

  const [showAlert, setShowAlert] = useState(false)

  const [show, setShow] = useState(false)

  const showModal = () => setShow(true)
  const closeModal = () => setShow(false)

  // State for Current page Pagination
  const [currentPage, setCurrentPage] = useState(1)
  // State for employees Page Pagination
  const [employeesPerPage] = useState(2)

  // Alert function
  // const handleShowAlert = () => setShowAlert(true)
  const handleShowAlert = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  useEffect(() => {
    closeModal()

    return () => {
      handleShowAlert()
    }
  }, [sortedEmployees])

  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  )
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage)

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={showModal}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>{' '}
              <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Box */}
      <Alert show={showAlert} variant="success">
        Employee List Updated Succefully!
      </Alert>
      {/* End Of Alert Box */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <Employee employee={employee} 
              sortedEmployees={sortedEmployees}/>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={totalPagesNum} 
      setCurrentPage={setCurrentPage} 
      currentEmployees ={currentEmployees}
      sortedEmployees ={sortedEmployees}
      />

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} variant="secondary">
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmployeeList
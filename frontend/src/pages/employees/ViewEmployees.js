import React, {  useState } from "react";
import axios from "axios";
import { DeleteEmployees, GetEmployees, UpdateEmployees } from "../../URL/url";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Image from "react-bootstrap/Image";
import "./employees.css";

const ViewEmployees = ({fetchEmployees,alldatas,setAlldatas}) => {

  //crud
  const [editingEmpId, setEditingEmpId] = useState(null);

  //pagenation
  const totalLength = alldatas.length;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = Math.min(firstIndex + recordsPerPage, alldatas.length);
  const currentItem = alldatas.slice(firstIndex, lastIndex);
  const nthpage = Math.ceil(alldatas.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nthpage) {
      setCurrentPage(currentPage + 1);
    }
  };

  //crud

  const handleEdit = (employeeId) => {
    setEditingEmpId(employeeId);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`${DeleteEmployees}/${employeeId}`)
      .then((res) => {
        setAlldatas((prevempData) => prevempData.filter(employee => employee._id !== employeeId))
        // window.location.reload();
        toast.success("Employee deleted");
        fetchEmployees()
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee");
      });
  };

  const handleInputChange = (e, employeeId, field) => {
    const updatedValue = e.target.value;
    setAlldatas((prevempData) =>
      prevempData.map((employee) =>
        employee._id === employeeId
          ? { ...employee, [field]: updatedValue }
          : employee
      )
    );
  };

  const handleSave = (employeeId) => {
    setEditingEmpId(null);
    const editedEmployee = alldatas.find(
      (employee) => employee._id === employeeId
    );
    axios
      .put(`${UpdateEmployees}/${employeeId}`, editedEmployee)
      .then(() => {
        axios
          .get(GetEmployees)
          .then((res) => setAlldatas(res.data))
          .catch((error) => console.error("Error fetching customers:", error));
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  return (
    <div className="view_student">
      <h2 className="text-center colors">Employees List</h2>
      <p className="text-center colors">Total Employees: {alldatas.length} </p>
      <div className="tablespace">
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th style={{ outline: "none" }}>SNO</th>
            <th style={{ outline: "none" }}>First Name</th>
            <th>Last Name</th>
            <th>Father Name</th>
            <th>Blood Group</th>
            <th>Gender</th>
            <th>Marrital Statusr</th>
            <th>Date of Birth</th>
            <th>Educational Qualification</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact No</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Date of Relieveing</th>
            <th>Experiece(Years)</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ alignItems: "center" }}>
          {currentItem.map((employee, i) => {
            console.log(employee.imageUrl);
            return (
              <tr key={employee._id}>
                <td>{firstIndex + i + 1}</td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.EmployeeFirstName}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "EmployeeFirstName")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.EmployeeFirstName}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.EmployeeLastName}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "EmployeeLastName")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.EmployeeLastName}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.FatherName}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "FatherName")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.FatherName}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.BloodGroup}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "BloodGroup")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.BloodGroup}</span>
                  )}
                </td>
                <td>{employee.booleanValue ? "Female" : "Male"}</td>
                <td>{employee.booleanValue ? "Unmarried" : "Married"}</td>

                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="date"
                      value={employee.Dateofbirth}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Dateofbirth")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Dateofbirth}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.EducationalQualification}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          employee._id,
                          "EducationalQualification"
                        )
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.EducationalQualification}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="email"
                      value={employee.Emailid}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Emailid")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Emailid}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="date"
                      value={employee.Address}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Address")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Address}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="text"
                      value={employee.ContactNumber}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "ContactNumber")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.ContactNumber}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="number"
                      value={employee.Salary}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Salary")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Salary}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="date"
                      value={employee.Dateofjoining}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Dateofjoining")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Dateofjoining}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="date"
                      value={employee.Dateofrelieveing}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Dateofrelieveing")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Dateofrelieveing}</span>
                  )}
                </td>
                <td>
                  {editingEmpId === employee._id ? (
                    <input
                      type="number"
                      value={employee.Experience}
                      onChange={(e) =>
                        handleInputChange(e, employee._id, "Experience")
                      }
                      className="form-control border"
                    />
                  ) : (
                    <span>{employee.Experience}</span>
                  )}
                </td>
                <td>
                  <Image
                    src={require(`../../imgs/${employee.imageUrl}`)}
                    alt="photo"
                    width="100px"
                    height="100px"
                    roundedCircle
                  />
                </td>

                <td className="action_btns">
                  {editingEmpId === employee._id ? (
                    <button
                      className="mx-2 btn btn-success"
                      onClick={() => handleSave(employee._id)}
                    >
                      <i className="bi bi-check2-square"></i>
                    </button>
                  ) : (
                    <button
                      className="mx-2 btn btn-primary"
                      onClick={() => handleEdit(employee._id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(employee._id)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={prevPage}
              disable={currentPage === 1}
            >
              Prev
            </a>
          </li>

          {Array.from({ length: nthpage }, (_, i) => (
            <a
              href="#"
              className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
              key={i}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </a>
          ))}

          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ViewEmployees;

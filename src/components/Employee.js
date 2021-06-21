import React, { Component } from 'react';
import axios from 'axios';
import { ButtonToolbar, Table ,Button} from 'react-bootstrap';
import AddEmpModal from './AddEmpModal'
import EditEmpModal from './EditEmpModal';





class Employee extends Component {
    state = {
        emps: [],
        empname:null,
        empid:null,
        depmt:null,
        doj:null,
        photoFileName:null,
        addModalShow:false,
        editModalShow:false


    };


    refreshList(){

    //   fetch(process.env.REACT_APP_API+'department')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ emps: data });
    //         });  
        axios.get("https://localhost:44377/api/employee")
            .then(response=>{
                let result=response.data;
                this.setState({emps:result})
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(empid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44377/api/employee/"+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }


    render() {
        const emps = this.state.emps;
        // const empname =this.state.empname;
        // const empId =this.state.empId;
        // console.log("empIddd");
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
       console.log("empssss",emps)
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>EmployeeId</th>
                        <th>EmployeName</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                            <td> {emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateOfJoining}</td>
                            <td>
                            
                            <ButtonToolbar>
                            
                            <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,
                                empid:emp.EmployeeId,
                                empname:emp.EmployeeName,
                                doj:emp.DateOfJoining,
                                depmt:emp.Department,
                                photoFileName:emp.PhotoFileName
                            })}>
                            Edit
                            </Button>

                            <Button className="mr-2" variant="danger" onClick={()=>this.deleteDep(emp.EmployeeId)}>
                            Delete
                            </Button>

                            <EditEmpModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            empid={this.state.empid}
                            empname={this.state.empname}/>
                            </ButtonToolbar>
                            
                            </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                            <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                              Add Employee  
                            </Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>);
    }
}

export default Employee;
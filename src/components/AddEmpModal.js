import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
class AddEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [] };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    photofilename = "anonymous.png";
    imagesrc = "";

componentDidMount(){
    axios.get("https://localhost:44377/api/department")
            .then(response=>{
                let result=response.data;
                this.setState({deps:result})
            })
            .catch(error=>{
                alert(error);
            })
}
    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:44377/api/employee", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // DepartmentId: null,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                DateOfJoining: event.target.DateOfJoining.value
            })
        })
            .then(response => response.json())
            .then((result) => {
               // alert("added", result);
            },
                (error) => {
                    alert("Failed!");
                })
    }



    render() {
        console.log("departments",this.state.deps)
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeId">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required
                                            placeholder="EmployeeName" />
                                    </Form.Group>


                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep => 
                                                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control type="date" name="DateOfJoining" required
                                            placeholder="DateOfJoining" />
                                    </Form.Group>



                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        );
    }
}

export default AddEmpModal;
import React, { Component } from 'react';
import axios from 'axios';
import { ButtonToolbar, Table ,Button} from 'react-bootstrap';
import AddDepModal from './AddDepModal'
import EditDepModal from './EditDepModal';





class Department extends Component {
    state = {
        deps: [],
        depname:null,
        depid:null,
        addModalShow:false,
        editModalShow:false


    };


    refreshList(){

    //   fetch(process.env.REACT_APP_API+'department')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ deps: data });
    //         });  
        axios.get("https://localhost:44377/api/department")
            .then(response=>{
                let result=response.data;
                this.setState({deps:result})
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:44377/api/department/"+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }


    render() {
        const deps = this.state.deps;
        // const depname =this.state.depname;
        // const depId =this.state.depId;
        // console.log("depIddd");
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
       console.log("depssss",deps)
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                            <td> {dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                            
                            <ButtonToolbar>
                            
                            <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,
                                depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                            Edit
                            </Button>

                            <Button className="mr-2" variant="danger" onClick={()=>this.deleteDep(dep.DepartmentId)}>
                            Delete
                            </Button>

                            <EditDepModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            depid={this.state.depid}
                            depname={this.state.depname}/>
                            </ButtonToolbar>
                            
                            </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                            <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                              Add Department  
                            </Button>
                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>);
    }
}

export default Department;
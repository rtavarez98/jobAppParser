import React, {useState, useRef, useEffect} from 'react';
import './main.css';

function Main() {
    document.title = "Job Application Parser";

    const [apps, setApps] = useState([]);
    const nameRef = React.useRef();
    const companyRef = React.useRef();
    const locationRef = React.useRef();
    const payRef = React.useRef();

    //const urlRef = useRef();

    const fetchData = () => {
        fetch('https://jobappparser-production.up.railway.app/read', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(response => response.json() )
        .then(data => setApps(data.data) );
    };

    useEffect(() => {
        fetchData();
    }, []);

    //function addApp(){ //return error if url is empty or not valid
        //const url = urlRef.current.value;
        //fetch('https://jobappparser-production.up.railway.app/create', {
            //headers:{
                //'Content-type': 'application/json'
            //},
            //method: 'POST',
            //body: JSON.stringify({
                //url : url
            //})
        //})
        //.then(response => response.json() )
        //.catch(err => console.log(err) );
    //}

    /**
    * fetches the "/createManual" method from the backend to create a new application
    * in the database using values provided by the user and then reloads the page using the useState hook
    */
    function addAppManual(){
        console.log(nameRef.current.value);//test
        const name = nameRef.current.value;
        const company = companyRef.current.value;
        const location = locationRef.current.value;
        const pay = payRef.current.value;
        fetch('https://jobappparser-production.up.railway.app/createManual', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name : name,
                company : company,
                location : location,
                pay : pay
            })
        })
        .catch(err => console.log(err) );
        //reload data
    }

    /**
    * fetches the "/delete" method from the backend to delete an application from the database
    */
    function deleteApp(id){
        fetch('https://jobappparser-production.up.railway.app/delete', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                id : id
            })
        })
        .catch(err => console.log(err) );
        //reload data
    }

    /**
    * fetches the "/update" method from the backend to delete an application from the database
    */
    function editApp(id){
        let newStatus = prompt("Current Status");
        fetch('https://jobappparser-production.up.railway.app/update', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                id : id,
                status : newStatus
            })
        })
        .catch(err => console.log(err) );
        //reload data
    }

    return (
        <html className="Main">
            <header className="Main-header">
                <label for="name">Name </label>
                <input type="text" name="name" ref={nameRef}></input>
                <br></br>
                <label for="company">Company </label>
                <input type="text" name="company" ref={companyRef}></input>
                <br></br>
                <label for="location">Location </label>
                <input type="text" name="location" ref={locationRef}></input>
                <br></br>
                <label for="pay">Pay </label>
                <input type="text" name="pay" ref={payRef}></input>
                <br></br>
                <button onClick={addAppManual}>Submit</button>

                <table>
                    <thead>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Pay</th>
                        <th>Date Applied</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {apps.map((app, index) => (
                            <tr key={index}>
                                <td>{app.name}</td>
                                <td>{app.company}</td>
                                <td>{app.location}</td>
                                <td>{app.pay}</td>
                                <td>{app.time}</td>
                                <td>{app.status}</td>
                                <td><button onClick={ () => {deleteApp(app._id)} }>Delete Application</button></td>
                                <td><button onClick={ () => {editApp(app._id)} }>Edit Status</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </header>
        </html>
    );
}

export default Main;

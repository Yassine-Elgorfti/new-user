const express =  require("express");
const app = express();
const mysql=require("mysql");
const cors=require("cors");

app.use(cors());// now you can make request from frontend to backend
app.use(express.json());//this is important google it to understand

const db =mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "user_management"
});


//to Login

app.post("/login", (req, res) => {
    console.log("welcome");
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM admin WHERE username = ? AND password = ?",
        [username, password], (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({
                    message: "Wrong username/password combination"
                });
            }
        })
});


//to display Employees list
app.get("/employees", (req, res)=>{
    db.query("SELECT * FROM employees", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//to delete an employee
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});

//add new Employee
app.post("/add", (req, res) => {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;

    db.query("INSERT INTO employees (first_name, last_name, email, phone) VALUES (?,?,?,?)",
        [first_name, last_name, email, phone],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Values inserted");
            }
        }
    );
})

// to update an employee

app.put("/update", (req, res)=>{
    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const newEmail = req.body.newEmail;
    const newPhone = req.body.newPhone;
    const id = req.body.params;

    db.query("UPDATE employees SET (first_name, last_name, email, phone) VALUES (?,?,?,?) WHERE id = ?"),
    [newFirstName, newLastName, newEmail, newPhone],
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Employee has been updated with success, ", result);
        }
    }
})

app.listen(3001,()=>{
    console.log('yey, Your server is runing on port 3001');
});
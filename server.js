const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());



// mysql db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Adimysql@765',
    database: 'crud_db'
})

// mysql db connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

//count no. of users
// app.get('/countuser', (req, res) => {
//     const sql = 'select count(*) from userInfo';
//     db.query(sql, (err, result) => {
//         if(err) {
//             console.error('Error getting data', err);
//             res.status(500).json({error: 'database error'});
//         }
//         else {
//             res.json(result);
//         }
//     });
// });

// all users details - get call
app.get('/alluser', (req, res) => {
    const sql  = ' select * from userinfo';
    db.query(sql, (err, result) => {
        if(err) {
            console.error('Error getting data', err);
            res.status(500).json({error: 'database error'});
        }
        else {
            res.json(result);
        }
    }); 
});


// add user - post call
app.post('/addUser', (req, res) => {
    const {name, mobile, email, address, city, state, country} = req.body;
    const sql = 'Insert into userinfo(name, mobile, email, address, city, state, country) values (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, mobile, email, address, city, state, country], (err, result) => {
        if(err) {
            console.error('Error inserting data', err);
            res.status(500).json({ error: 'Database error'});
        }
        else {
            res.json({ message: 'user added successfully!'});
        }
    });
});

// update user - put call to update name using mobile in updateComponent - old api
app.put('/userupdate', (req, res) => {
    const {name, mobile} = req.body;
    const sql = 'update userinfo set name = adi where mobile = 23333333';
    db.query(sql, [name, mobile], (err, result) => {
        if(err) {
            console.error('Error inserting data', err);
            res.status(500).json({ error: 'Database error'});
        }
        else {
            res.json({ message: 'user updated successfully!'});
        }
    });
});

// update call - put call to update mobile using name used in update component - old api
app.put('/updateuser', (req,res) => {
    const {name, mobile} = req.body;
    const sql = 'update userinfo set mobile = ? where name = ?';
    db.query(sql, [mobile, name], (err, result) => {
        if(err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error:'database error'});
        } else if(result.affectedRows ===0) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.json({message: 'user updated successfully'});
        }
    });
});

//delete call using name - used earlier in deletecomponent
app.delete('/deleteuser', (req, res) => {
    const {name} = req.body;
    const sql = "delete from userinfo where name = ?";

    db.query(sql, [name], (err, result) => {
        if(err) {
            console.error('Error deleting data', err);
            res.status(500).json({ error: 'Database error'});
        } 
        else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
          }
        else {
            res.json({ message: 'user deleted successfully!'});
        }
    });
});

//delete call using id used in usercomponent
app.delete('/deleteid/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "delete from userinfo where id = ?";

    db.query(sql, [userId], (err, result) => {
        if(err) {
            console.error('Error deleting data', err);
            res.status(500).json({ error: 'Database error'});
        } 
        else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
          }
        else {
            res.json({ message: 'user deleted successfully!'});
        }
    });
});

//delete all users used in usercomponent
app.delete('/deleteall', (req, res) => {
    const sql = 'delete from userinfo';
    db.query(sql, (err, result) => {
        if(err) {
            console.error('Error deleting data', err);
            res.status(500).json({ error: 'Database error'});
        } 
        else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No users found' });
          }
        else {
            res.json({ message: 'users deleted successfully!'});
        }
    });
});

//update name, used in usercomponent in edit box
app.put('/updatename', (req,res) => {
    const {id, name} = req.body;
    const sql = 'update userinfo set name = ? where id = ?';
    db.query(sql, [name, id], (err, result) => {
        if(err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error:'database error'});
        } else if(result.affectedRows ===0) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.json({message: 'username updated successfully'});
        }
    });
});
//update mobile, used in usercomponent in edit box
app.put('/updatemobile', (req,res) => {
    const {id, mobile} = req.body;
    const sql = 'update userinfo set mobile = ? where id = ?';
    db.query(sql, [mobile, id], (err, result) => {
        if(err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error:'database error'});
        } else if(result.affectedRows ===0) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.json({message: 'user mobile updated successfully'});
        }
    });
});
//update email, used in usercomponent in edit box
app.put('/updateemail', (req,res) => {
    const {id, email} = req.body;
    const sql = 'update userinfo set email = ? where id = ?';
    db.query(sql, [email, id], (err, result) => {
        if(err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error:'database error'});
        } else if(result.affectedRows ===0) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.json({message: 'user email updated successfully'});
        }
    });
});

//update address, used in usercomponent in edit box
app.put('/updateaddress', (req,res) => {
    const {id, address} = req.body;
    const sql = 'update userinfo set address = ? where id = ?';
    db.query(sql, [address, id], (err, result) => {
        if(err) {
            console.error('Error updating user: ', err);
            res.status(500).json({error:'database error'});
        } else if(result.affectedRows ===0) {
            res.status(404).json({message: 'user not found'});
        } else {
            res.json({message: 'user address updated successfully'});
        }
    });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
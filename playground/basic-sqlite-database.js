var Sequelize = require('sequelize');
var sequelize = new Sequelize (undefined, undefined, undefined, {
    'dialect' : 'sqlite',
    'storage' : 'basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
   description: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           len: [1, 250]
       }
   },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

sequelize.sync().then(function () {
   console.log("Everything is synced"); 
    
    Todo.create({
        description: "Smoke some weed"
    }).then(function (todo) {
       return Todo.create({
           description: "Go to class"
       });
    }).then(function () {
        return Todo.findById(1)
    }).then(function (todo) {
        if (todo) {
            console.log(todo.toJSON());
        } else {
            console.log('no todo found');
        }
    })
    .catch(function (e) {
        console.log(e);
    });
});
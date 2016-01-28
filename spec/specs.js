//describe adding a user
describe("Adding a user", function() {
      var dbConnection;
      //before each of our tests
      beforeEach(function(done) {
        //create our database
        dbConnection = new sequelize('testingDB', null, null, {
          host: 'localhost',
          dialect: 'sqlite',
          storage: './testdb.sqlite'
        });

        var models = {};

        models.Users = sequelize.define('User', {
          username: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          location: {
            type: Sequelize.STRING
          },
          userPic: {
            type: Sequelize.STRING
          },
          createdAt: {
            type: Sequelize.STRING
          },
          updatedAt: {
            type: Sequelize.STRING
          }
        });

        models.Users.sync({
            force: true
          })
          .then(function() {
            console.log('User sync in sequelize.js');
          });
      });

      //after each of our tests
      afterEach(function(done) {
        //drop all the tables
        //close db connection
      });

      //it should contain a user added to it
      //helpers.addUser
      it("should add a user to the db", function( /*done*/ ) {
        var username = "Willy";
        var returnedUsername;
        var user = {
          username: username
        }
        helpers.addUser(user)

        db.Users.findOne({  where: { username: username }  })
                .then(function(userResult) {  returnedUsername = userResult.username;  })
        expect(returnedUsername).toBe("Willy")
      })

      it("should return that added user", function( /*done*/ ) {
        var user = { username: "Willy"  }
        var returnUser = helpers.addUser(user)
        expect(returnUser.username).toBe("Willy")
      })


        //it should remove a users deleted from it
        //helpers.removeUser <---todo

        //it should retreive userInfo when queried for it
        //helpers.getUser



      });

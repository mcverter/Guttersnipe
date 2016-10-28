// Login.html testing
describe('Testing User Sign Up, Login and Logout, Forgot password', function() {
    
    it('Sign Up', function() {
        browser.get('http://localhost:5000/');
        //Click on the SignUp Link
        element(by.id('signUp')).click();
        // Fill in the fields
        element(by.model('name')).sendKeys("Leo G");    
        element(by.model("email")).sendKeys("root@localhost");
        element(by.model('password')).sendKeys("Str0ng P@$$w)*&^+=");
        
          
        element(by.css(".button-primary")).click()    
            .then(function(){
                var EC = protractor.ExpectedConditions;
                var toastMessage = $('.toast-message');
                browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
                    .then(function(){
                        expect(toastMessage.getText()).toBe("User created successfully");

      });
    });
          
      });
      
    it(' Test Forgot password and Login', function() {
        browser.get('http://localhost:5000/');
        //Click on the Forgot password Link
        element(by.id('forgotPassword')).click();
        // Fill in the fields
          
        element(by.id("fpass-email")).sendKeys("root@localhost");
     
        element(by.id("fpass-button")).click()       
            .then(function(){
                var EC = protractor.ExpectedConditions;
                var toastMessage = $('.toast-message');
                browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
                    .then(function(){
                        expect(toastMessage.getText()).toBe("Password reset email has been sent successfully");

                                    });
                         });

        
         //Test LogIn                 
        element(by.id('logIn')).click();
        // Fill in the fields  
       element(by.id("login-email")).clear();
       element(by.id("login-email")).sendKeys("root@localhost");
        element(by.id("login-password")).clear();
        element(by.id('login-password')).sendKeys("Str0ng P@$$w)*&^+=");
        
      
        element(by.id("login-button")).click()
           .then(function() { 
           
              
                
                        expect(browser.getTitle()).toEqual('Home | Flask-Scaffold');

                });                 
                            
          });
      
});
    
//Roles CRUD Tests

// spec.js
describe('Roles/Users CRUD tests ', function() {
  // Page Object https://angular.github.io/protractor/#/page-objects
    var Role = function() {
                   var nameInput = element(by.id("name"));
                   this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };
                   this.setName = function(name) {
                                        nameInput.clear();
                                        nameInput.sendKeys(name);
                                      };
                    this.toast = function(message){
                                        $('.form-button .button-primary').click()  // css selectors http://angular.github.io/protractor/#/api?view=build$  
                                            .then(function() {     
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');                                      
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) //wait until toast is displayed
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });                                                    
                                    }                    
                    };
    
    
    var User = function() {
        
        var name = element(by.id('name'));
        var email = element(by.id("email"));
        var password =  element(by.id('password'));
     
        this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };
        this.setName = function(nameText) { name.clear(); name.sendKeys(nameText); };
        this.setEmail = function(emailText) { email.clear(); email.sendKeys(emailText); };
        this.setPassword = function(passwordText) { password.clear(); password.sendKeys(passwordText); };
        // radio button
        this.setActive = function(activeText) {  element(by.css("input[type='radio'][value={0}".format({activeText}))).click(); };
            
        // drop down 
        this.setRole = function() {  element(by.cssContainingText('option', 'admin')).click(); };
        
        
        this.toast = function(message){
                                        $('.form-button .button-primary').click()  // css selectors http://angular.github.io/protractor/#/api?view=build$  
                                            .then(function() {     
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');                                      
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) //wait until toast is displayed
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });                                                    
                                    }                    
                    };
    
    
    
    
    it('Should add a new Role', function() {
        var role = new Role();
        //Get Roles URL
        role.get();
        
        // Goto the new menu
        element(by.id('roles_menu')).click();
        element(by.id('roles_new')).click();
        
        // Fill in the fields
        role.setName("support");
        
        // Expectations
        role.toast("Role saved successfully");
        
        });  
    
    it('Should  edit a Role', function() {

        var role = new Role();
        
        // Goto the edit menu
        element(by.id('roles_list')).click();
        element(by.css('.ag-row-level-0')).click();
        element(by.id('editButton')).click();
        
        // Fill in the fields
        role.setName("admin");
        
        // Expectations
        role.toast("Update was a success");
     
    });
       
 
    
    it('Should add a new User', function() {
        
        var user = new User();
        //Get Users URL
        user.get();
        
        // Goto the new menu
        element(by.id('users_menu')).click();
        element(by.id('users_new')).click();
        
        // Fill in the fields
        
        user.setName("Leo G");
        user.setEmail("leo@localhost");
        user.setPassword("Styur757*&^5");
        element(by.css("input[type='radio'][value='0'")).click();
        user.setRole();
        
            
        // Expectations
        user.toast("User saved successfully");
        
        });             
        
    
    it('Should  edit a User', function() {
        
        
        var user = new User();
        
        // Goto the edit menu
        element(by.id('users_list')).click();
        element(by.css('.ag-row-level-0')).click();
        element(by.id('editButton')).click();
        
        // Fill in the fields
        user.setName("Al G");
        user.setEmail("al@localhost");
        user.setPassword("Styur757)(**&^5");
        element(by.css("input[type='radio'][value='1'")).click();
        user.setRole();
        
        // Expectations
        user.toast("Update was a success");     
        

      });
  
    
    it('Should  delete a User', function() {
        browser.get('http://localhost:5000/');
        element(by.id('users_menu')).click();
        element(by.id('users_list')).click();
        element(by.css('.ag-row-level-0')).click();
        element(by.id('deleteButton')).click()
                
        .then(function(){

            var EC = protractor.ExpectedConditions;
            var toastMessage = $('.toast-message');

             browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
                .then(function(){

                    expect(toastMessage.getText()).toBe("User deleted successfully")

          });
      
      });
    });
    
    
     it('Should  delete a Role', function() {
        role = new Role();
        element(by.id('roles_menu')).click();
        element(by.id('roles_list')).click();
        element(by.css('.ag-row-level-0')).click();
        element(by.id('deleteButton')).click()            
            .then(function(){
                var EC = protractor.ExpectedConditions;
                var toastMessage = $('.toast-message');
                 browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
                    .then(function(){

                        expect(toastMessage.getText()).toBe("Role deleted successfully")

              });
          
                          });
        });
      
});

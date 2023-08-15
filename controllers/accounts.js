import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },
  

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
   
    if ((user) && (user.password === request.body.password)) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },


  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
  
  async viewUser(request, response){
    const userEmail = await request.cookies.station;
    const user = await userStore.getUserByEmail(userEmail);
    const viewData = {
      title: "Login to the Service",
      user:user,
      userEmail: userEmail,
    };
    response.render("user-view", viewData);
    
  },
  
  async editUser(request, response){
    const userEmail = await request.cookies.station;
    const user = await userStore.getUserByEmail(userEmail);
    const viewData = {
      title: "Login to the Service",
      user:user,
      userEmail: userEmail,
    };
    response.render("edit-user", viewData);
    
  },
  
  async updateUser(request, response){
    const userEmail = await request.cookies.station;
    const user = await userStore.getUserByEmail(userEmail);
   const updatedUser = {
     firstName: request.body.firstName,
     lastName: request.body.lastName,
     email: request.body.email,
     password: request.body.password,
    };
    console.log(`Updating User ${user._id}`);
   
    await userStore.updateUser(user, updatedUser);
    response.redirect("/user");
  },
  
};



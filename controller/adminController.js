module.exports = {

  dashboard: async (req, res) => {
    try {
      res.render("dashboard/dashboard")
    } catch (error) {
      console.log(error)
    }
  },

  signup_page: async (req, res) => {
    try {
        res.render('users/signup.ejs')
    } catch (error) {
        console.log(error);
    }
},

login:async(req,res)=>{
  try {
    res.render("users/login.ejs")
  } catch (error) {
    console.log(error);
  }
},

changePassword:async(req,res)=>{
  try {
    res.render("users/changePassword")
  } catch (error) {
    console.log(error);
  }
}

}